"use client";
import { htmlTags } from "@/utils/syntax";
import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
import "monaco-editor/esm/vs/basic-languages/html/html.contribution";
import "monaco-editor/esm/vs/language/html/monaco.contribution";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";

// Define Monaco environment for web workers
self.MonacoEnvironment = {
  getWorker: function (_moduleId, label) {
    if (label === "javascript") {
      return new Worker(
        new URL(
          "monaco-editor/esm/vs/language/typescript/ts.worker.js",
          import.meta.url
        )
      );
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new Worker(
        new URL(
          "monaco-editor/esm/vs/language/css/css.worker.js",
          import.meta.url
        )
      );
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new Worker(
        new URL(
          "monaco-editor/esm/vs/language/html/html.worker.js",
          import.meta.url
        )
      );
    }
    return new Worker(
      new URL("monaco-editor/esm/vs/editor/editor.worker.js", import.meta.url)
    );
  },
};

interface MonacoEditorProps {
  codeformate: boolean;
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: "vs-dark" | "vs" | "hc-black";
  height?: string;
  width?: string;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
  onMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value,
  codeformate = false,
  onChange,
  language = "javascript",
  theme = "vs-dark",
  height = "500px",
  width = "100%",
  options = {},
  onMount,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  // Update editor options if changed
  useEffect(() => {
    if (monacoInstance.current) {
      monacoInstance.current.updateOptions(options);
    }
  }, [options]);

  // Initialize Monaco Editor
  useEffect(() => {
    if (!editorRef.current) return;

    monacoInstance.current = monaco.editor.create(editorRef.current, {
      value,
      language,
      theme,
      automaticLayout: true,
      ...options,
    });

    monacoInstance.current.onDidChangeModelContent(() => {
      const updatedValue = monacoInstance.current?.getValue() || "";
      onChange(updatedValue);
    });

    if (language === "html") {
      registerHTMLCompletionProvider();
    }

    if (onMount && monacoInstance.current) {
      onMount(monacoInstance.current);
    }

    // Layout editor after resizing
    const resizeObserver = new ResizeObserver(() => {
      monacoInstance.current?.layout();
    });
    resizeObserver.observe(editorRef.current);

    // Clean up on component unmount
    return () => {
      if (monacoInstance.current) {
        monacoInstance.current.dispose();
        monacoInstance.current = null;
      }
      resizeObserver.disconnect(); // Clean up the resize observer
    };
  }, [language, theme, value, options, onMount]);

  // Format code on codeformate prop change
  useEffect(() => {
    const formatCode = () => {
      if (monacoInstance.current) {
        monacoInstance.current.getAction("editor.action.formatDocument")?.run();
      }
    };
    if (codeformate) {
      formatCode();
    }
  }, [codeformate]);

  // HTML Autocompletion for tags
  const registerHTMLCompletionProvider = () => {
    monaco.languages.registerCompletionItemProvider("html", {
      provideCompletionItems: (model, position) => {
        const wordInfo = model.getWordAtPosition(position);
        const range = wordInfo
          ? new monaco.Range(
              position.lineNumber,
              wordInfo.startColumn,
              position.lineNumber,
              wordInfo.endColumn
            )
          : new monaco.Range(
              position.lineNumber,
              position.column,
              position.lineNumber,
              position.column
            );

        const suggestions = htmlTags.map((tag) => ({
          label: `<${tag}>`,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: `<${tag}>$0</${tag}>`,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: `Insert an <${tag}> element`,
          range,
        }));

        return { suggestions };
      },
    });
  };

  return <div ref={editorRef} style={{ height, width }}></div>;
};

export default MonacoEditor;

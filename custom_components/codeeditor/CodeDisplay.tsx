"use client";
import React, { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

interface CodeSol {
  codetype: string;
  code: string;
}

interface CodeDisplayProps {
  codesolution: CodeSol | undefined;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ codesolution }) => {
  const [formattedCode, setFormattedCode] = useState("");

  useEffect(() => {
    if (codesolution?.code && codesolution?.codetype) {
      const language = Prism.languages[codesolution.codetype];
      if (language) {
        const highlightedCode = Prism.highlight(
          codesolution.code,
          language,
          codesolution.codetype
        );
        setFormattedCode(highlightedCode);
      } else {
        console.warn(`Unsupported language: ${codesolution.codetype}`);
        setFormattedCode(codesolution.code); // Fallback to raw code
      }
    }
  }, [codesolution]);

  return (
    <div className="code-container w-full  pl-3 overflow-auto">
      <pre>
        <code
          className={`language-${codesolution?.codetype}`}
          dangerouslySetInnerHTML={{ __html: formattedCode }}
        />
      </pre>
    </div>
  );
};

export default CodeDisplay;

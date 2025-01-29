interface file{
 html : string
 css:string,
 js:string
}

const generatePreview = ({html,css,js}:file) : string => {
    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Live Preview</title>
          <style>${css}</style>
        </head>
        <body>
          ${html.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1] || ""}
          <script>${js}</script>
        </body>
      </html>
    `;
    return fullHTML;
  };

  export default generatePreview


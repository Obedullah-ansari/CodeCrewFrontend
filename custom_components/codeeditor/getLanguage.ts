
const   getLanguage = (fileType: string|undefined): string => {
    switch (fileType) {
      case "html":
        return "html";
      case "css":
        return "css";
      case "js":
        return "javascript";
      default:
        return "plaintext";
    }
  };
  
  export default  getLanguage
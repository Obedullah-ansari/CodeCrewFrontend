
const   getLanguage = (fileType: string): string => {
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
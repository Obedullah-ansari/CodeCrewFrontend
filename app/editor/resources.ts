interface UserCodeFuncType {
    URL: string |"";
  }
  
  async function resources({
    URL,
  }: UserCodeFuncType): Promise<Array<string> | undefined> {
  
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data &&  Array.isArray(data.imageArray)) {
          return data.imageArray
        }
      } else {
        console.log(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log("Error fetching resources data:", error);
    }
    return undefined; 
  }
  
  export default resources;
  
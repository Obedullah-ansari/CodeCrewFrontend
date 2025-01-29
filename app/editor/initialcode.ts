interface UserCodeFuncType {
    URL: string |"";
    token : string|null
  }
  
  async function initialCode({
    URL,token
  }: UserCodeFuncType): Promise<Array<{ code: string; codetype: string }> | undefined> {
  
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
    
       return data.specificTask
      } else {
        console.log(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log("Error fetching initial data:", error);
    }
    return undefined; 
  }
  
  export default initialCode;
  
interface UserCodeFuncType {
    URL: string | "";
    token: string | null;
    code: Array<{
      code: string;
      codetype: string;
    }>;
  }
  
  
  async function postusercode({
    URL,
    token,
    code,
  }: UserCodeFuncType): Promise<string |undefined> {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }), // Add the code array in the request body
      });
  
      if (response.ok) {
        const data = await response.json();
        if(data)
            return "success"
        else
        return undefined
        
      } else {
        console.log(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log("Error posting user code:", error);
    }
    return undefined; 
  }
  
  export default postusercode;
  
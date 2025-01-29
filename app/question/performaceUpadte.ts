interface UserCodeFuncType {
    URL: string |"";
    token : string|null
  }
  
  async function performaUpadte({
    URL,token
  }: UserCodeFuncType): Promise<Array<{taskId :string ,complete: string; performance: number }> | undefined> {
  
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
         return data.taskArry.task

      } else {
        console.log(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log("Error fetching initial data:", error);
    }
    return undefined; 
  }
  
  export default performaUpadte;
  
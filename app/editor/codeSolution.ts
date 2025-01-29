

async function codeSolution(URL :string):Promise<{demoimage :string ,code :[{
    codetype : string,
    code : string
  }]} |undefined > {
    try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (response.ok) {
          const data = await response.json();
         return data.specificTask
        } else {
          console.log(`Failed to fetch codeSoluiton information`);
        }
      } catch (error) {
        console.log("Error fetching initial data:", error);
      }
      return undefined; 
}

export default  codeSolution
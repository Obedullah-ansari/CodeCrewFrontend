interface Task {
    taskId: string;
    complete: string;
    performance: number;
    _id: string;
  }
  
  interface MultipleTask {
    problemid: string;
    task: Task[];
    _id: string;
  }
  
  interface Progress {
    languagename: string;
    languageprogress: number;
    _id: string;
  }
  
  interface PerformanceData {
    userimage: string;
    _id: string;
    userid: string;
    badges: string[];
    totalprojectdone: number;
    easy: number;
    medium: number;
    hard: number;
    multipletask: MultipleTask[];
    Progress: Progress[];
    useremail: string;
    username: string;
    currentlyworking: string;
    credits : number;
    nextbadgecredit:number;
  }
  

interface userPerfomanceFuncType {
    URL: string |"";
    token : string|null
  }
  
  async function userPerformaceData({
    URL,token
  }: userPerfomanceFuncType): Promise<PerformanceData|undefined> {
  
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
    
      return data.performanceData
      } else {
        console.log(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log("Error fetching userPerformace data:", error);
    }
    return undefined; 
  }
  
  export default userPerformaceData;
  
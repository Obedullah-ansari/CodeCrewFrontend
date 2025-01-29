interface UserCodeFuncType {
  URL: string |"";
  token: string |null;
}

async function usercode({
  URL,
  token,
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
      if (data && data.specificTask && Array.isArray(data.specificTask.code)) {
        return data.specificTask.code; 
      }
    } else {
      console.log(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log("Error fetching initial data:", error);
  }
  return undefined; 
}

export default usercode;

interface UserCodeFuncType {
  URL: string | "";
  token: string | null;
  userCode: Array<{ codetype: string; code: string }> | undefined;
}

async function initialCodePost({
  URL,
  token,
  userCode
}: UserCodeFuncType): Promise<
  Array<{ code: string; codetype: string }> | undefined
> {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify( userCode )
    });

    if (response.ok) {
      const data = await response.json();

      return data.specificTask;
    } else {
      console.log(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log("Error fetching initial data:", error);
  }
  return undefined;
}

export default initialCodePost;

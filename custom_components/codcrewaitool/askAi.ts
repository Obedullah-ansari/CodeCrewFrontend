interface ApiResponse {
  message: string ;
}

const askAi = async (prompt: string|undefined): Promise<string|undefined> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/gemeni/askai`;
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.response
      
    }
  } catch (error) {
    console.log("Error:", error);
    return "Failed to get a response from Gemini AI.";
  }

};

export default askAi;

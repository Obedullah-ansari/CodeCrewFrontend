export default async function loginfun(formdata: object) {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${URL}api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });

    const data = await response.json();

    if (response.ok) {
      return data; 
    } else {
      throw new Error(data?.message || "Something went wrong");
    }
  } catch (error) {
    console.log("Error during login:", error);
    throw error;
  }
}

export default async function userImageDelete(): Promise<string | null> {
    const URL = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem("token");
    
    try {
        const response = await fetch(
            `${URL}api/v1/images/deleteuser`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

      if (response.ok) {
        return null
      } else {
        const errorMessage = await response.text();
        console.log("Error Message:", errorMessage);
        throw new Error(errorMessage || "Image upload failed");
      }
    } catch (error) {
      console.log("Upload error:", error);
      return null;
    }
  }
  
export default async function userImageUpload(file: File): Promise<string | null> {
    const URL = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem("token");
    try {
      if (!file) {
        console.error("No file provided for upload");
        return null;
      }
  
      const formData = new FormData();
      formData.append("image", file);
  
      const response = await fetch(`${URL}api/v1/images/userimageuploads`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
          },
        body: formData,
      });
     
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        return data.imageUrl
        
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Image upload failed");
      }
    } catch (error) {
      console.log("Upload error:", error);
      return null;
    }
  }
  
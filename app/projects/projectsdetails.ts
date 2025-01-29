async function projectsdetails(URL: string) {
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data) {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}

export default projectsdetails;

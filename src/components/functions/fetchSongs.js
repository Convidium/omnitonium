const fetchData = async (queryType, value) => {
    try {
        const response = await fetch(`http://localhost:5000/api/data?queryType=${queryType}&value=${value}`);

        if (!response.ok) {
            const errorText = await response.text(); // Get error details
            console.error("Fetch error:", response.status, errorText);
            return null; // Return null instead of breaking
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Ensure we see the response
        return data;
    } catch (error) {
        console.error("Fetch failed:", error);
        return null;
    }
};

export default fetchData;
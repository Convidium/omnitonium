import generateID from "./generateID.js";

async function uploadTrack([audiofile, songName, writer, composer, info, albumID], callback ) {
    const trackID = generateID("t");

    const formData = new FormData();
    formData.append("albumID", albumID);
    formData.append("generatedID", trackID);
    formData.append("songName", songName);
    formData.append("track", audiofile);
    formData.append("writer", writer);
    formData.append("composer", composer);
    formData.append("info", info);

    try {
        const response = await fetch("http://localhost:5000/api/upload", {
            method: "POST",
            body: formData,
        })
        const result = await response.json();

        if (response.ok) {
            console.log("Uploaded file path:", result.path);
            callback("add-song-success", { messageType: "success", songName });
        } else {
            console.error("Upload failed:", result.error);
            callback("add-song-failed", { messageType: "error-fetch", songName });
        }
    } catch (error) {
        console.error("Error during upload:", error);
        callback("add-song-failed", { messageType: "error-data", songName });
    }
}

export default uploadTrack;
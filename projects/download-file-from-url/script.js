document.addEventListener("DOMContentLoaded", () => {
    const urlInput = document.getElementById("text");
    const downloadBtn = document.querySelector("button");

    downloadBtn.addEventListener("click", async () => {
        const url = urlInput.value.trim();
        if (!url) {
            alert("Please enter a valid URL.");
            return;
        }

        try {
            const response = await fetch(url, { mode: 'cors' });
            if (!response.ok) throw new Error("Network response was not ok");

            const file = await response.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = `download-${new Date().getTime()}`; // File extension can be dynamically handled based on the response
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href); // Release memory
        } catch (error) {
            if (error.message.includes('Network response was not ok')) {
                alert("Failed to download the file! Network response was not ok.");
            } else if (error.message.includes('Failed to fetch')) {
                alert("Failed to download the file! Possible CORS issue or network problem.");
            } else {
                alert("Failed to download the file! " + error.message);
            }
        }
    });
});

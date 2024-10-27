document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("input");
    const qrImage = document.querySelector(".qr-code img");
    const generateBtn = document.getElementById("generate");
    const downloadBtn = document.getElementById("download");
    const container = document.querySelector(".container");

    generateBtn.addEventListener("click", () => {
        let qrValue = input.value.trim();
        if (qrValue) {
            generateBtn.innerText = "Generating QR Code...";
            const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
            qrImage.src = qrCode;
            qrImage.onload = () => {
                container.classList.add("active");
                generateBtn.innerText = "Generate QR Code";
            };
        } else {
            alert("Please enter a valid text or URL.");
        }
    });

    downloadBtn.addEventListener("click", async () => {
        if (qrImage.src) {
            const response = await fetch(qrImage.src);
            const blob = await response.blob();
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = "qrcode.jpg";
            downloadLink.click();
        } else {
            alert("Generate a QR code first.");
        }
    });
});

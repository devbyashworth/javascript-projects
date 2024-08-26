const uploadArea = document.querySelector("#uploadArea");
const dropZone = document.querySelector("#dropZone");
const loadingText = document.querySelector("#loadingText");
const fileInput = document.querySelector("#fileInput");
const fileDetails = document.querySelector("#fileDetails");
const uploadedFile = document.querySelector("#uploadedFile");
const uploadedFileInfo = document.querySelector("#uploadedFileInfo");
const uploadedFileName = document.querySelector(".uploaded-file-name");
const uploadedFileCounter = document.querySelector(".uploaded-file-counter");
const previewImage = document.querySelector("#previewImage"); // Preview Image Element
const previewFile = document.querySelector("#previewFile"); // Preview File Container

dropZone.addEventListener("dragover", (evt) => {
    evt.preventDefault();
    dropZone.classList.add("drop-zone-over");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drop-zone-over");
});

dropZone.addEventListener("drop", (evt) => {
    evt.preventDefault();
    dropZone.classList.remove("drop-zone-over");
    const file = evt.dataTransfer.files[0];
    uploadFile(file);
});

dropZone.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", (evt) => {
    const file = evt.target.files[0];
    uploadFile(file);
});

const fileValidate = (fileSize) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (fileSize <= maxSize) {
        return true;
    }
    alert("File size exceeds 10MB. Please select a file less than 10MB.");
    return false;
};

const uploadFile = (file) => {
    const fileReader = new FileReader();
    const fileSize = file.size;

    if (fileValidate(fileSize)) {
        dropZone.classList.add("drop-zone-Uploaded");
        loadingText.style.display = "block";
        uploadedFile.classList.remove("uploaded-file-open");
        uploadedFileInfo.classList.remove("uploaded-file-info--active");

        fileReader.addEventListener("load", function () {
            setTimeout(() => {
                uploadArea.classList.add("upload-area-open");
                loadingText.style.display = "none";
                fileDetails.classList.add("file-details-open");
                uploadedFile.classList.add("uploaded-file-open");
                uploadedFileInfo.classList.add("uploaded-file-info--active");
                uploadedFileName.innerHTML = file.name;

                if (file.type.startsWith("image/")) {
                    previewImage.src = fileReader.result;
                    previewImage.style.display = "block";
                    previewFile.style.display = "block";
                } else {
                    previewImage.style.display = "none";
                    previewFile.style.display = "block";
                    previewFile.innerHTML = `<span class="drop-zone-preview-text">${file.name}</span>`;
                }

                progressMove();
            }, 500);
        });

        fileReader.readAsDataURL(file);
    }
};

const progressMove = () => {
    let counter = 0;
    setTimeout(() => {
        let counterIncrease = setInterval(() => {
            if (counter === 100) {
                clearInterval(counterIncrease);
            } else {
                counter += 10;
                uploadedFileCounter.innerHTML = `${counter}%`;
            }
        }, 100);
    }, 600);
};

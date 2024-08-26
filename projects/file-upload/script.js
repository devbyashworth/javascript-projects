const inputFiles = document.querySelectorAll(".dropzone-area input[type='file']");
const inputElement = inputFiles[0];
const dropzoneElement = inputElement.closest(".dropzone-area");

inputElement.addEventListener("change", (evt) => {
    if (inputElement.files.length) {
        updateDropZoneFileList(dropzoneElement, inputElement.files[0]);
    }
});

dropzoneElement.addEventListener("dragover", (evt) => {
    evt.preventDefault();
    dropzoneElement.classList.add("dropzone--over");
});

["dragleave", "dragend"].forEach((type) => {
    dropzoneElement.addEventListener(type, (evt) => {
        dropzoneElement.classList.remove("dropzone--over");
    });
});

dropzoneElement.addEventListener("drop", (evt) => {
    evt.preventDefault();
    if (evt.dataTransfer.files.length) {
        inputElement.files = evt.dataTransfer.files;
        updateDropZoneFileList(dropzoneElement, evt.dataTransfer.files[0]);
    }
    dropzoneElement.classList.remove("dropzone--over");
});

const updateDropZoneFileList = (dropzoneElement, file) => {
    let dropzoneFileMessage = dropzoneElement.querySelector(".file-info");
    dropzoneFileMessage.innerHTML = `${file.name}, ${file.size} bytes`;
};

document.querySelector(".dropzone-container").addEventListener("reset", () => {
    let dropzoneFileMessage = dropzoneElement.querySelector(".file-info");
    dropzoneFileMessage.innerHTML = "No Files Selected";
});

document.querySelector(".dropzone-container").addEventListener("submit", (evt) => {
    evt.preventDefault();
    const myField = document.getElementById("upload-file");
    console.log(myField.files[0]);
});

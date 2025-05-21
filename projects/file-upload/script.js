const inputElement = document.querySelector(".dropzone-area input[type='file']");
const dropzoneElement = inputElement.closest(".dropzone-area");

// File select
inputElement.addEventListener("change", () => {
  if (inputElement.files.length) {
    updateDropZoneFileList(dropzoneElement, inputElement.files[0]);
  }
});

// Drag enter
dropzoneElement.addEventListener("dragover", (evt) => {
  evt.preventDefault();
  dropzoneElement.classList.add("dropzone--over");
});

// Drag leave
["dragleave", "dragend"].forEach((type) => {
  dropzoneElement.addEventListener(type, () => {
    dropzoneElement.classList.remove("dropzone--over");
  });
});

// Drop
dropzoneElement.addEventListener("drop", (evt) => {
  evt.preventDefault();
  if (evt.dataTransfer.files.length) {
    inputElement.files = evt.dataTransfer.files;
    updateDropZoneFileList(dropzoneElement, evt.dataTransfer.files[0]);
  }
  dropzoneElement.classList.remove("dropzone--over");
});

// Update UI with selected file
const updateDropZoneFileList = (dropzone, file) => {
  const fileInfo = dropzone.querySelector(".file-info");
  fileInfo.textContent = `${file.name}, ${file.size} bytes`;
};

// Reset button
document.querySelector(".dropzone-container").addEventListener("reset", () => {
  const fileInfo = dropzoneElement.querySelector(".file-info");
  fileInfo.textContent = "No Files Selected";
});

// Form submit
document.querySelector(".dropzone-container").addEventListener("submit", (evt) => {
  evt.preventDefault();
  const file = inputElement.files[0];
  if (file) {
    console.log("Uploading file:", file);
    // Add upload logic here
  } else {
    alert("Please select a file to upload.");
  }
});

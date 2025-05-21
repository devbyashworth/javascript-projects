function _(el) {
    return document.getElementById(el);
  }
  
  function uploadFile() {
    const fileInput = _("uploadedFile");
    const file = fileInput.files[0];
  
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
  
    const formdata = new FormData();
    formdata.append("uploadedFile", file);
  
    const xhr = new XMLHttpRequest();
  
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        _("progressBar").value = Math.round(percent);
        _("status").textContent = `${Math.round(percent)}% uploaded... please wait`;
        _("totalUploaded").textContent = `Uploaded ${event.loaded} bytes of ${event.total}`;
      }
    });
  
    xhr.addEventListener("load", (event) => {
      _("status").textContent = event.target.responseText;
      _("progressBar").value = 0;
    });
  
    xhr.addEventListener("error", () => {
      _("status").textContent = "Upload Failed";
    });
  
    xhr.addEventListener("abort", () => {
      _("status").textContent = "Upload Aborted";
    });
  
    xhr.open("POST", "file_upload_parser.php", true);
    xhr.send(formdata);
  }
  
  // Attach listener instead of inline HTML
  document.addEventListener("DOMContentLoaded", () => {
    _("uploadedFile").addEventListener("change", uploadFile);
  });
  
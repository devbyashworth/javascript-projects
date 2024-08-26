function _(el) {
    return document.getElementById(el);
}

function uploadFile() {
    var file = _("uploadedFile").files[0];
    if (file) {
        var formdata = new FormData();
        formdata.append("uploadedFile", file);

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", function(event) {
            _("totalUploaded").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
            var percent = (event.loaded / event.total) * 100;
            _("progressBar").value = Math.round(percent);
            _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
        }, false);

        xhr.addEventListener("load", function(event) {
            _("status").innerHTML = event.target.responseText;
            _("progressBar").value = 0;
        }, false);

        xhr.addEventListener("error", function(event) {
            _("status").innerHTML = "Upload Failed";
        }, false);

        xhr.addEventListener("abort", function(event) {
            _("status").innerHTML = "Upload Aborted";
        }, false);

        xhr.open("POST", "file_upload_parser.php", true);
        xhr.send(formdata);
    } else {
        alert("Please select a file to upload.");
    }
}

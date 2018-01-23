(function() {
  var fileInput = document.getElementById('placeImageInput');
  var hiddenFileInput = document.getElementById('hiddenFileInput');
  var fileErrorMessage = document.getElementById('fileErrorMessage');
  var spinner = document.getElementById('spinner');
  var imagePreview = document.getElementById('imagePreview');

  fileInput.onchange = function() {
    var fileInputFiles = fileInput.files;
    var file = fileInputFiles[0];
    imagePreview.src && (imagePreview.src = '');
    getSignedRequest(file);
    spinner.classList.toggle('dn');
    imagePreview.classList.add('dn');
  };

  function getSignedRequest(file) {
    file &&
      axios
        .get('/sign-s3?file-name=' + file.name + '&file-type=' + file.type)
        .then(function(res) {
          uploadFile(file, res.data.signedRequest, res.data.url);
        })
        .catch(function(err) {
          fileErrorMessage.textContent = 'Could not upload file';
        });
  }

  function uploadFile(file, signedRequest, url) {
    axios
      .put(signedRequest, file)
      .then(function(res) {
        spinner.classList.toggle('dn');
        imagePreview.classList.remove('dn');
        imagePreview.src = url;
        hiddenFileInput.value = url;
      })
      .catch(function(err) {
        fileErrorMessage.textContent = 'Could not upload file';
      });
  }
})();

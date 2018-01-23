(function() {
  var fileInput = document.getElementById('eventFileInput');
  var fileErrorMessage = document.getElementById('fileErrorMessage');
  var hiddenFileInput = document.getElementById('hiddenFileInput');
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
          console.log('getSignedRequest', err);
          fileErrorMessage.textContent = 'Could not upload file';
        });
  }

  function uploadFile(file, signedRequest, url) {
    axios
      .put(signedRequest, file)
      .then(function(res) {
        console.log(url);
        spinner.classList.toggle('dn');
        imagePreview.classList.remove('dn');
        imagePreview.src = url;
        hiddenFileInput.value = url;
      })
      .catch(function(err) {
        console.log(err);
        fileErrorMessage.textContent = 'Could not upload file';
      });
  }
})();

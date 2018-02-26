(function() {
  var fileInput =
    document.getElementById('eventFileInput') ||
    document.getElementById('placeImageInput');
  var hiddenFileInput = document.getElementById('hiddenFileInput');
  var fileErrorMessage = document.getElementById('fileErrorMessage');
  var spinner = document.getElementById('spinner');
  var imagePreview = document.getElementById('imagePreview');
  var formSubmitButton = document.getElementById('formSubmitButton');

  fileInput.onchange = function() {
    var fileInputFiles = fileInput.files;
    var file = fileInputFiles[0];
    // Dom changes
    imagePreview.src = imagePreview.src && '';
    spinner.classList.toggle('dn');
    imagePreview.classList.add('dn');
    formSubmitButton.disabled = true;

    getSignedRequest(file)
      .then(function(res) {
        imagePreview.src = res.data.url;
        hiddenFileInput.value = res.data.url;
        return uploadFile(res.data.signedRequest, file);
      })
      .then(function() {
        formSubmitButton.disabled = false;
        spinner.classList.toggle('dn');
        imagePreview.classList.remove('dn');
      })
      .catch(function(err) {
        console.log(err);
        imagePreview.src = '';
        hiddenFileInput.value = '';
        fileErrorMessage.textContent = 'Could not upload file';
      });

    function getSignedRequest(file) {
      return axios.get(
        '/sign-s3?file-name=' + file.name + '&file-type=' + file.type
      );
    }

    function uploadFile(signedRequest, file) {
      return axios.put(signedRequest, file);
    }
  };
})();

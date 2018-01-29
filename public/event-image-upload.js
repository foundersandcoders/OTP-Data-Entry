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
    spinner.classList.toggle('dn');
    imagePreview.classList.add('dn');
    getSignedRequest(file)
      .then(function(res) {
        imagePreview.src = res.data.url;
        hiddenFileInput.value = res.data.url;
        return uploadFile(res.data.signedRequest, file);
      })
      .then(function() {
        spinner.classList.toggle('dn');
        imagePreview.classList.remove('dn');
      })
      .catch(function(err) {
        imagePreview.src = '';
        hiddenFileInput.value = '';
        fileErrorMessage.textContent = 'Could not upload file';
      });

    function getSignedRequest(file) {
      return axios.get(
        '/sign-s3?file-name=' + file.name + '&file-type=' + file.type,
      );
    }

    function uploadFile(signedRequest, file) {
      return axios.put(signedRequest, file);
    }
  };
})();

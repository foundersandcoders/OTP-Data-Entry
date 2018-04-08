(function() {
  var verifyButton = document.getElementById('verify-button');
  var errorContainer = document.getElementById('error-container');
  var lang = window.location.pathname.split('/')[1];
  var resourceType = window.location.pathname.split('/')[2];
  var resourceId = window.location.pathname.split('/')[3];

  var url = document.currentScript.getAttribute('url');

  verifyButton.addEventListener('click', function() {
    axios
      .get(url + '/' + resourceId)
      .then(function(res) {
        var verifiedResource = res.data;
        verifiedResource.verified = true;
        verifiedResource._method = 'put';

        if (verifiedResource.hasOwnProperty('en')) {
          verifiedResource.name_en = verifiedResource.en.name;
          verifiedResource.description_en = verifiedResource.en.description;
          verifiedResource.address_en = verifiedResource.en.address;
          verifiedResource.openingHours_en = verifiedResource.en.openingHours;
        }

        if (verifiedResource.hasOwnProperty('ar')) {
          verifiedResource.name_ar = verifiedResource.ar.name;
          verifiedResource.description_ar = verifiedResource.ar.description;
          verifiedResource.address_ar = verifiedResource.ar.address;
          verifiedResource.openingHours_ar = verifiedResource.ar.openingHours;
        }

        axios
          .post(
            '/' + lang + '/edit-' + resourceType + '/' + resourceId,
            verifiedResource,
          )
          .then(function(res) {
            window.location.href = res.data.redirectUrl;
          })
          .catch(function(err) {
            return (errorContainer.textContent = 'Unauthorized');
          });
      })
      .catch(function(err) {
        return (errorContainer.textContent = 'An error has occurd');
      });
  });
})();

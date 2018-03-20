var verifyButton = document.getElementById('verify-button');
var errorContainer = document.getElementById('error-container');
var lang = window.location.pathname.split('/')[1];
var resourceType = window.location.pathname.split('/')[2];
var id = window.location.pathname.split('/')[3];

var url = 'http://localhost:3000/api/v1/' + resourceType;
verifyButton.addEventListener('click', function() {
  axios
    .get(url + 's/' + id)
    .then(function(res) {
      var verifiedResource = Object.assign({}, res.data, {
        verified: true,
        _method: 'put',
      });

      if (verifiedResource.hasOwnProperty('en')) {
        verifiedResource = Object.assign({}, verifiedResource, {
          name_en: verifiedResource.en.name,
          description_en: verifiedResource.en.description,
          address_en: verifiedResource.en.address,
          openingHours_en: verifiedResource.en.openingHours,
        });
      }

      if (verifiedResource.hasOwnProperty('ar')) {
        verifiedResource = Object.assign({}, verifiedResource, {
          name_ar: verifiedResource.ar.name,
          description_ar: verifiedResource.ar.description,
          address_ar: verifiedResource.ar.address,
          openingHours_ar: verifiedResource.ar.openingHours,
        });
      }

      axios
        .post('/' + lang + '/edit-' + resourceType + '/' + id, verifiedResource)
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

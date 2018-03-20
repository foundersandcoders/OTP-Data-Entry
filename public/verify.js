const verifyButton = document.getElementById('verify-button');
const errorContainer = document.getElementById('error-container');
const lang = window.location.pathname.split('/')[1];
const resourceType = window.location.pathname.split('/')[2];
const id = window.location.pathname.split('/')[3];

const url = `http://localhost:3000/api/v1/${resourceType}`;
verifyButton.addEventListener('click', function() {
  axios
    .get(`${url}s/${id}`)
    .then(res => {
      console.log(res.data);
      let verifiedResource = Object.assign({}, res.data, {
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
        .post(`/${lang}/edit-place/${id}`, verifiedResource)
        .then(res => (window.location.href = res.data.redirectUrl))
        .catch(err => (errorContainer.textContent = 'Unauthorized'));
    })
    .catch(err => (errorContainer.textContent = 'An error has occurd'));
});

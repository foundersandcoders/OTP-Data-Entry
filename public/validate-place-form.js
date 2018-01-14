var AddPlaceForm = document.getElementById('AddPlaceForm');
var EditPlaceForm = document.getElementById('EditPlaceForm');
var errorBox = document.getElementById('PlaceErrorBox');

var englishChars = /[a-zA-Z0-9]/;
var arabicChars = /[ا-ي0-9]/;

function NotValid(message) {
  errorBox.innerText = message;
  window.scrollTo(0, 0);
}

function Validate(event) {
  event.preventDefault();

  var elements = event.target.elements;

  var data = {
    name_en: elements.name_en.value,
    name_ar: elements.name_ar.value,
    address_en: elements.address_en.value,
    address_ar: elements.address_ar.value,
    categories: elements.categories,
    accessibility: elements.accessibility,
    openingHours_en: elements.openingHours_en.value,
    openingHours_ar: elements.openingHours_ar.value,
    website: elements.website.value,
    phone: elements.phone.value,
    email: elements.email.value,
    imageUrl: elements.imageUrl.value,
  };

  // Check if place name input were filled
  if (!data.name_en && !data.name_ar) {
    return NotValid('*Please input a name');
  } else {
    errorBox.innerText = '';
  }

  // Validate what language was used for each input
  if (data.name_en && !englishChars.test(data.name_en)) {
    return NotValid(
      '*Only use english characters for english location/place name',
    );
  } else {
    errorBox.innerText = '';
  }

  if (data.name_ar && !arabicChars.test(data.name_ar)) {
    return NotValid(
      '*Only use arabic characters for arabic location/place name',
    );
  } else {
    errorBox.innerText = '';
  }

  // Check if address was filled
  if (!data.address_en && !data.address_ar) {
    return NotValid('*You need to add the address for the location/place');
  } else {
    errorBox.innerText = '';
  }

  // Validate the address's language
  if (data.address_en && !englishChars.test(data.address_en)) {
    return NotValid('*Use only english characters for the english address');
  } else {
    errorBox.innerText = '';
  }

  if (data.address_ar && !arabicChars.test(data.address_ar)) {
    return NotValid('*Use only arabic characters for the arabic address');
  } else {
    errorBox.innerText = '';
  }

  // Check if a category was selected
  var categorySelectedCheck = false;
  var checkedCategories = [];
  data.categories.forEach(function(categoryElement) {
    if (categoryElement.checked) {
      checkedCategories.push(categoryElement.value);
      categorySelectedCheck = true;
    }
  });

  // Handle if a category wasn't selected
  if (!categorySelectedCheck) {
    return NotValid('*Select an event category');
  } else {
    data.categories = checkedCategories;
    errorBox.innerText = '';
  }

  // Add the selected accessibility options to the request body
  var checkedAccessibility = [];
  data.accessibility.forEach(function(accessibility) {
    if (accessibility.checked) {
      checkedAccessibility.push(accessibility.value);
    }
  });

  data.accessibility = checkedAccessibility;

  AddPlaceForm &&
    (data._method = 'post') &&
    axios.post(AddPlaceForm.action, data).then(function(res) {
      window.location = res.data.redirectUrl;
    });

  EditPlaceForm &&
    (data._method = 'put') &&
    axios.post(EditPlaceForm.action, data).then(function(res) {
      window.location = res.data.redirectUrl;
    });
}

AddPlaceForm && AddPlaceForm.addEventListener('submit', Validate);

EditPlaceForm && EditPlaceForm.addEventListener('submit', Validate);

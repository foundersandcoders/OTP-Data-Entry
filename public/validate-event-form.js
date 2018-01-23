(function() {
  var AddEventForm = document.getElementById('AddEventForm');
  var EditEventForm = document.getElementById('EditEventForm');
  var errorBox = document.getElementById('EventErrorBox');

  var englishChars = /[a-zA-Z0-9]/;
  var arabicChars = /[ا-ي0-9]/;

  function notValid(message) {
    errorBox.innerText = message;
    window.scrollTo(0, 0);
  }

  function validateAndSubmit(event) {
    event.preventDefault();
    var elements = event.target.elements;

    var data = {
      name_en: elements.name_en.value,
      name_ar: elements.name_ar.value,
      description_en: elements.description_en.value,
      description_ar: elements.description_ar.value,
      eventPlace: elements.eventPlace.value,
      imageUrl: elements.imageUrl.value,
      cost: elements.cost.value,
    };

    // set time in the data object
    data.startTime = new Date(
      new Date(
        new Date(elements.startTime.value).setMinutes(
          elements.startMinutes.value,
        ),
      ).setHours(elements.startHour.value),
    ).toISOString();

    data.endTime = new Date(
      new Date(
        new Date(elements.endTime.value).setMinutes(elements.endMinutes.value),
      ).setHours(elements.endHour.value),
    ).toISOString();

    // Check if event name input were filled
    if (!data.name_ar && !data.name_en) {
      return notValid('*Please input a name');
    } else {
      errorBox.innetText = '';
    }

    // Validate what language was used for each name input

    if (data.name_en && !englishChars.test(data.name_en)) {
      return notValid('*Only use english characters for english event name');
    } else {
      errorBox.innerText = '';
    }

    if (data.name_ar && !arabicChars.test(data.name_ar)) {
      return notValid('*Only use arabic characters for arabic event name');
    } else {
      errorBox.innerText = '';
    }

    // Check if event description input were filled
    if (!data.description_en && !data.description_ar) {
      return notValid('*Please write a description about the event');
    } else {
      errorBox.innetText = '';
    }

    // Validate what language was used for each description input
    if (data.description_en && !englishChars.test(data.description_en)) {
      return notValid(
        '*Only use english characters for english event description',
      );
    } else {
      errorBox.innerText = '';
    }

    if (data.description_ar && !arabicChars.test(data.description_ar)) {
      return notValid(
        '*Only use arabic characters for arabic event description',
      );
    }

    // Check if the user has selected a place
    if (!data.eventPlace) {
      return notValid('*Please select a location/place');
    } else {
      errorBox.innerText = '';
    }

    // Check if a category was selected
    var categorySelectedCheck = false;
    var checkedCategories = [];
    elements.categories.forEach(function(categoryElement) {
      if (categoryElement.checked) {
        checkedCategories.push(categoryElement.value);
        categorySelectedCheck = true;
      }
    });

    // Handle if a category wasn't selected
    if (!categorySelectedCheck) {
      return notValid('*Select an event category');
    } else {
      data.categories = checkedCategories;
      errorBox.innerText = '';
    }

    // Add the selected accessibility options to the request body
    var checkedAccessibility = [];
    elements.accessibility.forEach(function(accessibility) {
      if (accessibility.checked) {
        checkedAccessibility.push(accessibility.value);
      }
    });

    data.accessibility = checkedAccessibility;

    AddEventForm &&
      (data._method = 'post') &&
      axios
        .post(AddEventForm.action, data)
        .then(function(res) {
          window.location = res.data.redirectUrl;
        })
        .catch(function(err) {
          return notValid(`${err.response.data}`);
        });

    EditEventForm &&
      (data._method = 'put') &&
      axios
        .post(EditEventForm.action, data)
        .then(function(res) {
          window.location = res.data.redirectUrl;
        })
        .catch(function(err) {
          return notValid(`${err.response.data}`);
        });
  }
  AddEventForm && AddEventForm.addEventListener('submit', validateAndSubmit);

  EditEventForm && EditEventForm.addEventListener('submit', validateAndSubmit);
})();

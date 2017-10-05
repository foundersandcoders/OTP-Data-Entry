const checkedDropDown = (id, idCheck) => {
  if (!id) {
    return null;
  }
  if (id === idCheck) {
    return 'selected';
  } else {
    return null;
  }
};

module.exports = checkedDropDown;

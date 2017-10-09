const checkedDropDown = (id, idCheck) => {
  return (id !== idCheck) ? null : 'selected';
};

module.exports = checkedDropDown;

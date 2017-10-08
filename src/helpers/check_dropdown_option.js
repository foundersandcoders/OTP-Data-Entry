const checkedDropDown = (id, idCheck) => {
  const value = (id !== idCheck) ? null : 'selected';
  console.log(value);
  return value;
};

module.exports = checkedDropDown;

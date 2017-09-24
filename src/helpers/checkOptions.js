const checkOptions = (options, value) => {
  if (options.includes(value)) {
    return 'checked';
  } else {
    return null;
  }
};

module.exports = checkOptions;

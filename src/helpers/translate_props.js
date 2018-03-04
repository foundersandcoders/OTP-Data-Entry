module.exports = (categories, defaultCategories, lang) => {
  const result = [];
  defaultCategories.forEach(category => {
    if (categories.includes(category.en)) {
      result.push(category[lang]);
    }
  });

  return result;
};

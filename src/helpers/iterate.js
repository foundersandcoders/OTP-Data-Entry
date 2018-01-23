module.exports = (times, block) => {
  let accum = '';
  let i = -1;

  while (i++ < times) {
    accum += block.fn(i);
  }

  return accum;
};

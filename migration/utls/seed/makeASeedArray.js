module.exports = function makeASeedArray(columnsWithFunctions, count) {
  let resutl = [];
  for (let i = 1; i <= count; i++) {
    let temp = {};
    Object.keys(columnsWithFunctions).forEach((key) => {
      temp[key] = columnsWithFunctions[key]();
    });
    temp.id = i;
    resutl.push(temp);
  }
  return resutl;
};

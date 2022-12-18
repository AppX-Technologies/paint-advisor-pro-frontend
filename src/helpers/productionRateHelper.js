export const productionRateDataRowFormatter = (data) => {
  const result = {};
  if (data) {
    const types = Array.from(new Set(data.map((x) => x.appliesTo)));
    types.forEach((key) => {
      data.forEach((d) => {
        if (!result[key]) {
          result[key] = [];
        }
        if (d.appliesTo === key) {
          result[key].push({ ...d });
        }
      });
    });
  }
  return result;
};

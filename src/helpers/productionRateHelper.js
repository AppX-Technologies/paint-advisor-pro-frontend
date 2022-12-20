const sections = [
  {
    type: 'Wall',
    subTypes: ['Smooth', 'Orange Peel', 'Knock Down']
  },
  {
    type: 'Window',
    subTypes: ['Single Hung', 'Double Hung', 'Sliding']
  },
  {
    type: 'Ceiling',
    subTypes: ['Smooth', 'Orange Peel', 'Knock Down', 'Popcorn']
  },
  {
    type: 'baseboardTrim',
    subTypes: ['Default']
  },
  {
    type: 'Door',
    subTypes: ['Default']
  },
  {
    type: 'windowTrim',
    subTypes: ['Default']
  },
  {
    type: 'doorJamb',
    subTypes: ['Default']
  },
  {
    type: 'crownMolding',
    subTypes: ['Default']
  },
  {
    type: 'Closet',
    subTypes: ['Default']
  }
];
export const filterProductionRates = (productionRate = []) => {
  const allProductionRateObject = {};
  sections.forEach((section) => {
    const filteredProductionType = productionRate.filter(
      ({ appliesTo }) => appliesTo === section.type
    );
    allProductionRateObject[section.type] = [];
    section?.subTypes?.forEach((subType) => {
      const filteredBySubtype = filteredProductionType.filter(
        ({ appliesToType }) => appliesToType === subType
      );

      allProductionRateObject[section.type] = [
        ...allProductionRateObject[section.type],
        {
          id: {
            Beginner:
              filteredBySubtype.find(({ proficiency }) => proficiency === 'Beginner')?._id ?? 'N/A',
            Intermediate:
              filteredBySubtype.find(({ proficiency }) => proficiency === 'Intermediate')?._id ??
              'N/A',
            Proficient:
              filteredBySubtype.find(({ proficiency }) => proficiency === 'Proficient')?._id ??
              'N/A'
          },
          appliesTo:
            filteredBySubtype.find(({ proficiency }) => proficiency === 'Beginner')?.appliesTo ??
            'N/A',
          bidType:
            filteredBySubtype.find(({ proficiency }) => proficiency === 'Beginner')?.bidType ??
            'N/A',
          appliesToType:
            filteredBySubtype.find(({ proficiency }) => proficiency === 'Beginner')
              ?.appliesToType ?? 'N/A',
          beginner:
            filteredBySubtype.find(({ proficiency }) => proficiency === 'Beginner')
              ?.productionRate ?? 'N/A',
          proficient:
            filteredBySubtype.find(({ proficiency }) => proficiency === 'Proficient')
              ?.productionRate ?? 'N/A',
          intermediate:
            filteredBySubtype.find(({ proficiency }) => proficiency === 'Intermediate')
              ?.productionRate ?? 'N/A'
        }
      ];
    });
  });
  return allProductionRateObject;
};

export  function avgCalculator(section, productionRateList=[]) {
  const types = productionRateList[section];
  const totalTypes = productionRateList[section].length;
  const beginnerAvg =
    types
      .map((type) => type.beginner)
      .reduce((a, b) => {
        return b !== 'N/A' && a + b;
      }, 0) / totalTypes;
  const intermediateAvg =
    types
      .map((type) => type.intermediate)
      .reduce((a, b) => {
        return b !== 'N/A' && a + b;
      }, 0) / totalTypes;
  const proficientAvg =
    types
      .map((type) => type.proficient)
      .reduce((a, b) => {
        return b !== 'N/A' && a + b;
      }, 0) / totalTypes;
  return {
    beginnerAvg: beginnerAvg.toFixed(1),
    intermediateAvg: intermediateAvg.toFixed(1),
    proficientAvg: proficientAvg.toFixed(1)
  };
}
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

export const proffiencyTableTableFields = [
  {
    name: 'beginner',
    label: 'Beginner'
  },
  {
    name: 'intermediate',
    label: 'Intermediate'
  },
  {
    name: 'expert',
    label: 'Expert'
  }
];

function objMakerOfId(filteredBySubtype) {
  const array = proffiencyTableTableFields.map((proff) => {
    return {
      [proff.label]:
        filteredBySubtype.find(({ proficiency }) => proficiency === proff.label)?._id ?? 'N/A'
    };
  });
  let result = {};
  array.forEach((x) => {
    result = { ...result, ...x };
  });
  return result;
}

function objMakerOfProficiencyLavel(filteredBySubtype) {
  const array = proffiencyTableTableFields.map((proff) => {
    return {
      [proff.name]:
        filteredBySubtype.find(({ proficiency }) => proficiency === proff.label)?.productionRate ||
        0
    };
  });
  let result = {};
  array.forEach((x) => {
    result = { ...result, ...x };
  });
  return result;
}

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
          id: objMakerOfId(filteredBySubtype),
          appliesTo: filteredBySubtype[0]?.appliesTo,
          bidType: filteredBySubtype[0]?.bidType,
          appliesToType: filteredBySubtype[0]?.appliesToType ?? subType,
          ...objMakerOfProficiencyLavel(filteredBySubtype)
        }
      ];
    });
  });
  return allProductionRateObject;
};

export function avgCalculator(section, productionRateList = []) {
  const types = productionRateList[section];
  const totalTypes = productionRateList[section].length;
  const array = proffiencyTableTableFields.map((proff) => {
    return {
      [proff.name]: (
        types
          .map((type) => type[proff.name])
          .reduce((a, b) => {
            return b !== undefined && a + b;
          }, 0) / totalTypes
      ).toFixed(1)
    };
  });

  let result = {};
  array.forEach((x) => {
    result = { ...result, ...x };
  });
  return result;
}

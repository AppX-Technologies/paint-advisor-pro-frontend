export const companyColumns = () => {
  return [
    {
      name: 'name',
      label: 'Name',
      width: '15%'
    },
    {
      name: 'email',
      label: 'Email',
      width: '20%'
    },
    {
      name: 'address',
      label: 'Address',
      width: '20%'
    },
    {
      name: 'phone',
      label: 'Phone',
      width: '20%'
    },
    {
      name: 'status',
      label: 'Status',
      width: '20%'
    }
  ];
};
export const userColumn = () => {
  return [
    {
      name: 'name',
      label: 'Name',
      width: '15%'
    },
    {
      name: 'email',
      label: 'Email',
      width: '20%'
    },
    {
      name: 'phone',
      label: 'Phone',
      width: '25%'
    },

    {
      name: 'status',
      label: 'Status',
      width: '25%'
    }
  ];
};
export const companyUserColumns = () => {
  return [
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'email',
      label: 'Email'
    },
    {
      name: 'phone',
      label: 'Phone'
    },
    {
      name: 'role',
      label: 'Role'
    },
    {
      name: 'proficiency',
      label: 'Proficiency'
    },

    {
      name: 'organization',
      label: 'Company'
    },
    {
      name: 'status',
      label: 'Status'
    }
  ];
};

export const processColumn = () => {
  return [
    {
      name: 'stage',
      label: 'Stage',
      width: '20%'
    },
    {
      name: 'description',
      label: 'Process Description',
      width: '50%'
    }
  ];
};
export const paintColumn = () => {
  return [
    {
      name: 'description',
      label: 'Paint Description',
      width: '20%'
    },
    {
      name: 'unit',
      label: 'Unit',
      width: '10%'
    },
    {
      name: 'unitPrice',
      label: 'Price Per Unit',
      width: '10%'
    },
    {
      name: 'appliesTo',
      label: 'Applies To',
      width: '30%'
    },
    {
      name: 'areaCoveredPerUnitForFirstCoat',
      label: 'First Coat (Area)',
      width: '15%'
    },
    {
      name: 'arearCoveredPerUnitForRemainingCoats',
      label: 'Remaining Coats (Area)',
      width: '15%'
    }
  ];
};

export const materialColumn = () => {
  return [
    {
      name: 'description',
      label: 'Material Description',
      width: '40%'
    },

    {
      name: 'unitPrice',
      label: 'Price Per Unit',
      width: '40%'
    }
  ];
};

export const equipmentColumn = () => {
  return [
    {
      name: 'description',
      label: 'Equipment Description',
      width: '40%'
    },
    {
      name: 'unitPrice',
      label: 'Unit Price',
      width: '40%'
    }
  ];
};

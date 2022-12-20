export const menuItems = [
  {
    name: 'Max-Limit',
    value: selectOption,
    changeValue: setSelectOption,
    options: [
      { name: '10', value: 10 },
      { name: '20', value: 20 },
      { name: '50', value: 50 },
      { name: '100', value: 100 },
      { name: 'All', value: 'All' }
    ]
  },
  {
    name: 'Sort By',
    value: sortOption,
    changeValue: setSortOption,
    options: [
      {
        name: 'Created At',
        value: 'createdAt'
      },
      {
        name: 'Updated At',
        value: 'updatedAt'
      },
      {
        name: 'Project Start Date',
        value: 'projectStartDate'
      },
      {
        name: 'Schedule Date',
        value: 'scheduledAt'
      }
    ]
  }
];

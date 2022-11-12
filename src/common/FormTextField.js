const booleanOption = ['Yes', 'No'];
export const AddNewClientTextField = [
  {
    name: 'customerName',
    id: 'customer-name',
    label: 'Customer Name',
    dataType: 'text'
  },
  {
    name: 'address',
    id: 'Address',
    label: 'Address',
    dataType: 'text',

  },
  {
    name: 'city',
    id: 'City',
    label: 'City',
    dataType: 'text',
    resizeable: true
  },
  {
    name: 'state',
    id: 'State',
    label: 'State',
    dataType: 'text',
    resizeable: true
  },
  {
    name: 'zipCode',
    id: 'zip-code',
    label: 'Zip Code',
    resizeable: true,
    dataType: 'text'
  },
  {
    name: 'contactMethod',
    id: 'prefered-contact-method',
    label: 'Prefered Contact Method',
    dataType: 'dropDown',
    option: ['Phone Call', 'Text Message', 'Email']
  },
  {
    name: 'email',
    id: 'email',
    label: 'Email Address',
    dataType: 'text'
  },
  {
    name: 'contactNumber',
    id: 'contact-number',
    label: 'Contact Number',
    dataType: 'text'
  },
  
  {
    name: 'propertyType',
    id: 'property-type',
    label: 'Property Type',
    dataType: 'dropDown',
    option: ['Home', 'Business']
  },
  
];



export const InteriorManByManFormFields = [
  {
    label: 'What will be Start date/End Date?',
    name: 'startEndDate',
    dataType: 'dateTime',
    option: ['Interior', 'Exterior']
  },
  {
    label: 'Will the customer be providing paint/materials for this job?',
    name: 'customerProvidingPaintMaterial',
    dataType: 'dropDown',
    option: booleanOption,
    moreQuestions: [
      {
        label: 'What quality of paint will be used on this job?',
        name: 'paintQuality',
        dataType: 'dropDown',
        option: ['Low', 'Medium', 'High']
      },
      {
        label: 'What brands of paint and sheen will be used?',
        name: 'paintBrand',
        dataType: 'text'
      }
    ]
  },
  
  {
    label: 'Will you offer any Discount?',
    name: 'discount',
    dataType: 'dropDown',
    option: booleanOption
  }
];
export const ExteriorManByManFormFields = [
  {
    label: 'What will be Start date/End Date?',
    name: 'startEndDate',
    dataType: 'text'
  },
  {
    label: 'Will the customer be providing paint/materials for this job?',
    name: 'customerProvidingPaintMaterial',
    dataType: 'dropDown',
    option: booleanOption,
    moreQuestions: [
      {
        label: 'What quality of paint will be used on this job?',
        name: 'paintQuality',
        dataType: 'dropDown',
        option: ['Low', 'Medium', 'High']
      },
      {
        label: 'What brands of paint and sheen will be used?',
        name: 'paintBrand',
        dataType: 'text'
      }
    ]
  },
  
  {
    label: 'How much Coating in the walls?',
    name: 'wallCoating',
    dataType: 'dropDown',
    option: ['1 Coat', '2 Coat']
  },

  {
    label: 'Are you painting any trim?',
    name: 'paintTrim',
    dataType: 'dropDown',
    option: booleanOption
  },

  {
    label: 'Will you offer any Discount?',
    name: 'discount',
    dataType: 'dropDown',
    option: booleanOption
  }
];

export const RoomInfofields = [
  {
    label: 'Room Name',
    name: 'roomName',
    dataType: 'text'
  },

  {
    label: 'Paint Walls?',
    name: 'paintWall',
    dataType: 'dropDown',
    option: booleanOption
  },
  {
    label: 'Paint Baseboard trim? ',
    name: 'baseboardTrim',
    dataType: 'dropDown',
    option: booleanOption
  },
  {
    label: 'Paint Ceiling?',
    name: 'paintCeiling',
    dataType: 'dropDown',
    option: booleanOption
  },
  {
    label: 'Paint Window? ',
    name: 'paintWindow',
    dataType: 'dropDown',
    option: booleanOption
  },
  {
    label: 'Paint Window trim?',
    name: 'paintWindowTrim',
    dataType: 'dropDown',
    option: booleanOption
  },
  {
    label: 'Paint Door Jambs? ',
    name: 'paintDoorjambs',
    dataType: 'dropDown',
    option: booleanOption
  },
  {
    label: 'Paint Doors?',
    name: 'paintDoor',
    dataType: 'dropDown',
    option: booleanOption
  },
  {
    label: 'Paint Crown Modeling?',
    name: 'paintCrownModeling',
    dataType: 'dropDown',
    option: booleanOption
  },{
    label: 'Closet?',
    name: 'paintCloset',
    dataType: 'dropDown',
    option:booleanOption
  },
];
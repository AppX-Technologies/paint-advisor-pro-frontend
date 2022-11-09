const booleanOption = ['Yes', 'No'];
export const AddNewClientTextField = [
  {
    name: 'projectName',
    id: 'project-name',
    label: 'Project Name',

    dataType: 'text'
  },
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
    name: 'targetStartDate',
    id: 'target-start-date',
    label: 'Target Start Date',
    dataType: 'date'
  },
  {
    name: 'targetEndDate',
    id: 'target-end-date',
    label: 'Target End Date',
    dataType: 'date'
  },
  {
    name: 'propertyType',
    id: 'property-type',
    label: 'Property Type',
    dataType: 'dropDown',
    option: ['Home', 'Business']
  },
  {
    name: 'providingPaint',
    id: 'providing-paint',
    label: 'Will Customer be providing paint?',
    dataType: 'dropDown',
    option: booleanOption
  },
  {
    name: 'dateTime',
    id: 'dateTime',
    label: 'Date/Time for Estimate Appintment',
    dataType: 'dateTime'
  }
];

export const estimateFields = [
  {
    label: 'What will be Start date/End Date?',
    name: 'startEndDate',
    dataType: 'text',
    option: ['Interior', 'Exterior']
  },
  {
    label: 'Will the customer be providing paint/materials for this job?',
    name: 'customerProvidingPaintMaterial',
    dataType: 'dropDown',
    option: booleanOption
  },
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
  },
  {
    label: 'What is the name of the Room1?',
    name: 'roomName',
    dataType: 'text'
  },
  {
    label: 'What is the length of room?',
    name: 'roomLength',
    dataType: 'text'
  },
  {
    label: 'What is the width of room?',
    name: 'roomWidth',
    dataType: 'text'
  },
  {
    label: 'What is the average height of the room',
    name: 'roomHeight',
    dataType: 'text'
  },
  {
    label: 'How much Coating in the walls?',
    name: 'wallCoating',
    dataType: 'dropDown',
    option: ['1 Coat', '2 Coat']
  },
  {
    label: 'How much Coating in the ceiling?',
    name: 'ceilingCoat',
    dataType: 'dropDown',
    option: ['1 Coat', '2 Coat']
  },
  {
    label: 'Are you painting any trim in the room',
    name: 'paintTrim',
    dataType: 'dropDown',
    option: booleanOption
  },
  {
    label: 'How many doors are in the room?',
    name: 'doorNumber',
    dataType: 'text'
  },
  {
    label: 'Are you painting the doors? ',
    name: 'paintDoor',
    dataType: 'dropDown',
    option: booleanOption
  },
  {
    label: '  How many windows are in the room?',
    name: 'numberOfWindows',
    dataType: 'text'
  },
  {
    label: 'Are you painting the windows? ',
    name: 'paintWindow',
    dataType: 'dropDown',
    option:booleanOption
  },{
    label:"Will you offer any Discount?",
    name:'discount',
    dataType:'dropDown',
    option:booleanOption
  }
];
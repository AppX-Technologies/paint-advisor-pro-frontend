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
    option: ['Yes', 'No']
  },
  {
    name: 'dateTime',
    id: 'dateTime',
    label: 'Date/Time for Estimate Appintment',
    dataType: 'dateTime'
  }
];

export const estimateFields =[
  {
    label:"Bid Type",
    dataType:"dropDown",
    option:["Interior","Exterior"]
  },
  {
    label:"Sub Type",
    dataType:"dropDown",
    option:["Room By Room","Man"]
  }
]
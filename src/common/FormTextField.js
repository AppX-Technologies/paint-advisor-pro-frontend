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
    resizeable: true
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
    name: 'dateTime',
    id: 'dateTime',
    label: 'Estimate Appintment',
    dataType: 'dateTime'
  }
];

export const estimateFields = [
  {
    label: 'Bid Type',
    dataType: 'dropDown',
    option: ['Interior', 'Exterior']
  },
  {
    label: 'Sub Type',
    dataType: 'dropDown',
    option: ['Room By Room', 'Man']
  }
];

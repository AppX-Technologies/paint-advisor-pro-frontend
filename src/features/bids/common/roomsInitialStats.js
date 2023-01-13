export const estimationFormInitialInfo = {
  startDate: '',
  endDate: '',
  type: '',
  subType: '',
  isMaterialProvidedByCustomer: ''
};

// export const initialNonPaintableStats = {
//   description: '',
//   area: null
// };

export const initialRoomState = {
  roomName: '',
  walls: [],
  ceilings: [],
  windows: [],
  doors: [],
  baseboardTrims: [],
  windowTrims: [],
  doorJambs: [],
  crownMoldings: [],
  closets: [],
  nonPaintableAreas: [{ description: 'Current Total', area: 0 }]
};

export const initilWallInfo = {
  _id: '',
  name: '',
  prepHour: null,
  height: null,
  length: null,
  wallType: '',
  coats: null,
  nonPaintableArea: 0
};

export const initialDoorInfo = {
  _id: '',
  name: '',
  style: '',
  wallInfo: '',
  quantity: null,
  length: null,
  height: null,
  coats: null,
  paint: false
};

export const initialWindowInfo = {
  _id: '',
  name: '',
  style: '',
  height: null,
  length: null,
  prepHour: null,
  coats: null,
  wallInfo: '',
  paint: false
};

export const initialBaseBoardTrimInfo = {
  _id: '',
  name: '',
  prepHour: null,
  linearFeet: '',
  height: null,
  length: null,
  coats: null,
  prducts: []
};

export const initialWindowTrimInfo = {
  _id: '',
  prepHour: null,
  name: '',
  style: '',
  height: null,
  length: null,
  coats: null,
  quantity: null,
  prducts: []
};

export const initialDoorjambsInfo = {
  _id: '',
  name: '',
  prepHour: null,
  linearFeet: '',
  width: null,
  coats: null,
  prducts: [],
  paint: false
};

export const initialCrownMoldingInfo = {
  _id: '',
  name: '',
  prepHour: null,
  linearFeet: '',
  width: null,
  coats: null,
  prducts: [],
  paint: false
};

export const initialClosetInfo = {
  _id: '',
  name: '',
  prepHour: null,
  length: '',
  width: null,
  averageHeight: null,
  coats: null,
  prducts: [],
  paint: false
};

export const initialCeilingInfo = {
  _id: '',
  name: '',
  length: null,
  width: null,
  type: '',
  coats: null,
  product: [],
  paint: false
};

export const initialStateForClientAdditon = {
  name: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  preferredContactMethod: '',
  email: '',
  contactNumber: '',
  propertyType: ''
};

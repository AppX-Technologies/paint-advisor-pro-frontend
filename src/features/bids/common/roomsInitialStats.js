export const estimationFormInitialInfo = {
  startDate: '',
  endDate: '',
  type: '',
  subType: '',
  isMaterialProvidedByCustomer: ''
};

export const initialNonPaintableStats = {
  _id: '',
  description: '',
  area: null
};

export const initialRoomState = {
  roomName: '',
  walls: [],
  ceilings: [],
  windows: [],
  doors: [],
  baseboardTrims: [],
  windowTrims: [],
  doorjambs: [],
  crownMoldings: [],
  closets: [],
  nonPaintableAreas: [{ description: 'Current Total', area: null, isTotal: true }]
};

export const initilWallInfo = {
  _id: '',
  name: '',
  prepHour: null,
  height: null,
  length: null,
  wallType: '',
  coats: null
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
  coats: null,
  wallInfo: '',
  paint: false
};

export const initialBaseBoardTrimInfo = {
  _id: '',
  name: '',
  prepHour: '',
  linearFeet: '',
  height: null,
  length: null,
  coats: null,

  prducts: []
};

export const initialWindowTrimInfo = {
  _id: '',
  prepHour: '',
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
  prepHour: '',
  linearFeet: '',
  width: null,
  coats: null,
  prducts: []
};

export const initialCrownMoldingInfo = {
  _id: '',
  name: '',
  prepHour: '',
  linearFeet: '',
  width: null,
  coats: null,
  prducts: []
};

export const initialClosetInfo = {
  _id: '',
  name: '',
  prepHour: '',
  length: '',
  width: null,
  averageHeight: null,
  coats: null,
  prducts: []
};

export const initialCeilingInfo = {
  _id: '',
  name: '',
  length: '',
  width: '',
  type: '',
  coats: '',
  product: []
};

export const initialState = {
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

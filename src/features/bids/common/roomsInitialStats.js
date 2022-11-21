export const estimationFormInitialInfo = {
  startDate: '',
  endDate: '',
  bidType: '',
  subType: ''
};

export const initialNonPaintableStats = {
  _id: '',
  description: '',
  area: 0
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
  nonPaintableAreas: [{ description: 'Current Total', area: 0, isTotal: true }]
};

export const initilWallInfo = {
  _id: '',
  name: '',
  prepHour: 0,
  height: 0,
  length: 0,
  wallType: '',
  coats: 0
};

export const initialDoorInfo = {
  _id: '',
  name: '',
  style: '',
  quantity: 0,
  length: 0,
  height: 0,
  coats: 0,
  paint: false
};

export const initialWindowInfo = {
  _id: '',
  name: '',
  style: '',
  height: 0,
  length: 0,
  coats: 0,
  wallInfo: '',
  paint: false
};

export const initialBaseBoardTrimInfo = {
  _id: '',
  name: '',
  prepHour: '',
  linearFeet: '',
  height: 0,
  length: 0,
  coats: 0,
  prducts: []
};

export const initialWindowTrimInfo = {
  _id: '',
  prepHour: '',
  name: '',
  style: '',
  height: 0,
  length: 0,
  coats: 0,
  quantity: 0,
  prducts: []
};

export const initialDoorjambsInfo = {
  _id: '',
  name: '',
  prepHour: '',
  linearFeet: '',
  width: 0,
  coats: 0,
  prducts: []
};

export const initialCrownMoldingInfo = {
  _id: '',
  name: '',
  prepHour: '',
  linearFeet: '',
  width: 0,
  coats: 0,
  prducts: []
};

export const initialClosetInfo = {
  _id: '',
  name: '',
  prepHour: '',
  length: '',
  width: 0,
  averageHeight: 0,
  coats: 0,
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
  customerName: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  contactMethod: '',
  email: '',
  contactNumber: '',
  propertyType: ''
};

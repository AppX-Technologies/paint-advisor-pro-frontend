import { BID_TYPES, STATUS_VALUES } from '../helpers/contants';

export const bidStageFilter = [
  {
    label: 'Bids Types',
    values: BID_TYPES,
    name: 'bidTypes'
  },
  {
    label: 'Status',
    values: STATUS_VALUES,
    name: 'status'
  }
];

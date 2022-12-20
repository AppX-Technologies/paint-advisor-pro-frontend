import { BIDS_STAGES, BID_TYPES } from '../helpers/contants';

export const bidStageFilter = [
  {
    label: 'Bids Types',
    values: BID_TYPES,
    name: 'bidTypes'
  },
  {
    label: 'Status',
    values: BIDS_STAGES,
    name: 'status'
  }
];

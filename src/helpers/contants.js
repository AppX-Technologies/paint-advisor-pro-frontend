// General Constants
export const APP_NAME = 'Paint Advisor Pro';

// Roles and auth
export const ROLE_SYSTEM_ADMIN = 'Admin';
export const ROLE_ORG_ADMIN = 'Org Admin';
export const ROLE_ESTIMATOR = 'Estimator';
export const ROLE_PAINTER = 'Painter';

export const SYSTEM_ROLES = [ROLE_SYSTEM_ADMIN];
export const COMPANY_ROLES = [ROLE_ORG_ADMIN, ROLE_ESTIMATOR, ROLE_PAINTER];
export const ALL_ROLES = [...SYSTEM_ROLES, ...COMPANY_ROLES];

// Bid statuses
// TODO: Fill up statuses here and use from here instead of hard coded strings.
export const NEW_CLIENT_STATUS = 'New Client';
export const OLD_CLIENT_STATUS = 'Old Client';
export const ALL_STATUS = [NEW_CLIENT_STATUS, OLD_CLIENT_STATUS];

// Process stages
export const PROCESS_STAGE_PREPARATION = 'Preparation';
export const PROCESS_STAGE_PAINTING = 'Painting';
export const PROCESS_STAGE_CLEANUP = 'Cleanup';
export const ALL_PROCESS_STAGES = [
  PROCESS_STAGE_PREPARATION,
  PROCESS_STAGE_PAINTING,
  PROCESS_STAGE_CLEANUP
];

export const STAGE_1 = 'new client';
export const STAGE_2 = 'estimate in progress';
export const STAGE_3 = 'in review';
export const STAGE_4 = 'contract Pending';
export const STAGE_5 = 'contract sent';
export const STAGE_6 = 'contract rejected';
export const STAGE_7 = 'job scheduled';
export const STAGE_8 = 'job in progress';
export const STAGE_9 = 'invoicing';
export const STAGE_10 = 'complete';

export const BIDS_STAGES = [
  STAGE_1,
  STAGE_2,
  STAGE_3,
  STAGE_4,
  STAGE_5,
  STAGE_6,
  STAGE_7,
  STAGE_8,
  STAGE_9,
  STAGE_10
];

export const NONPAINTABLEAREAFIELD = 'nonPaintableAreas';

export const WALL_OPTIONS = ['North', 'South', 'East', 'West'];

export const WALL_TYPES = ['Smooth', 'Orange Peel', 'Knockdown'];

export const CEILING_TYPES = [...WALL_TYPES, 'Popcorn'];

export const ROOM_TYPES = [
  'Entrance Hall',
  'Kitchen Room',
  'Family Room',
  'Dining Room',
  'Living Room',
  'Master Bedroom',
  'Bathroom',
  'Laundry Room'
];

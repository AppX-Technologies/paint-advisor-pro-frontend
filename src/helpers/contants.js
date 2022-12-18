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

export const STATUS_NEW_CLIENT = 'New Client';
export const STATUS_ESTIMATE_IN_PROGRESS = 'Estimate In Progress';
export const STATUS_IN_REVIEW = 'In Review';
export const STATUS_CONTRACT_PENDING = 'Contract Pending';
export const STATUS_CONTRACT_SENT = 'Contract Sent';
export const STATUS_CONTRACT_REJECTED = 'Contract rejected';
export const STATUS_JOB_SCHEDULED = 'Job Scheduled';
export const STATUS_JOB_IN_PROGRESS = 'Job In Progress';
export const STATUS_INVOICING = 'Invoicing';
export const STATUS_COMPLETE = 'Complete';
export const STATUS_CANCELLED = 'Cancelled';

export const BIDS_STAGES = [
  STATUS_NEW_CLIENT,
  STATUS_ESTIMATE_IN_PROGRESS,
  STATUS_IN_REVIEW,
  STATUS_CONTRACT_PENDING,
  STATUS_CONTRACT_SENT,
  STATUS_CONTRACT_REJECTED,
  STATUS_JOB_SCHEDULED,
  STATUS_JOB_IN_PROGRESS,
  STATUS_INVOICING,
  STATUS_COMPLETE,
  STATUS_CANCELLED
];

export const NONPAINTABLEAREAFIELD = 'nonPaintableAreas';

export const WALL_OPTIONS = ['North', 'South', 'East', 'West'];

export const WALL_TYPES = ['Smooth', 'Orange Peel', 'Knockdown'];

export const CEILING_TYPES = [...WALL_TYPES, 'Popcorn'];

export const productionTableHeaderFields = [
  {
    type: 'Smooth',
    category: 'wallType',
    bgColor: '#e5e6e1'
  },
  {
    type: 'Orange Peel',
    category: 'wallType',
    bgColor: '#e5e6e1'
  },
  {
    type: 'Knockdown',
    category: 'wallType',
    bgColor: '#e5e6e1'
  },
  {
    type: 'Popcorn',
    category: 'ceilingType',
    bgColor: '#d0d1cd'
  }
];

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

export const BID_TYPES = ['Interior', 'Exterior'];

export const STATUS_VALUES = ['New Client'];

export const MATERIALS_DROPDOWN_VALUES = ['Walls', 'Doors', 'Windows', 'Trims'];

export const CURRENT_TOTAL_DESCRIPTION = 'Current Total';

export const TEST_MATERIALS_VALUES_TO_SELECT = [
  {
    name: 'walls',
    values: [
      'Wall Material 1',
      'Wall Material 2',
      'Wall Material 3',
      'Wall Material 4',
      'Wall Material 5',
      'Wall Material 6'
    ]
  },
  {
    name: 'windows',
    values: [
      'Window Material 1',
      'Window Material 2',
      'Window Material 3',
      'Window Material 4',
      'Window Material 5',
      'Window Material 6'
    ]
  },
  {
    name: 'doors',
    values: [
      'Door Material 1',
      'Door Material 2',
      'Door Material 3',
      'Door Material 4',
      'Door Material 5',
      'Door Material 6'
    ]
  },
  {
    name: 'ceilings',
    values: [
      'Ceiling Material 1',
      'Ceiling Material 2',
      'Ceiling Material 3',
      'Ceiling Material 4',
      'Ceiling Material 5',
      'Ceiling Material 6'
    ]
  },
  {
    name: 'baseboardTrims',
    values: [
      'Baseboard Trims Material 1',
      'Baseboard Trims Material 2',
      'Baseboard Trims Material 3',
      'Baseboard Trims Material 4',
      'Baseboard Trims Material 5',
      'Baseboard Trims Material 6'
    ]
  },
  {
    name: 'windowTrims',
    values: [
      'Window Trims Material 1',
      'Window Trims Material 2',
      'Window Trims Material 3',
      'Window Trims Material 4',
      'Window Trims Material 5',
      'Window Trims Material 6'
    ]
  },
  {
    name: 'crownMoldings',
    values: [
      'Crown Molding Material 1',
      'Crown Molding Material 2',
      'Crown Molding Material 3',
      'Crown Molding Material 4',
      'Crown Molding Material 5',
      'Crown Molding Material 6'
    ]
  },
  {
    name: 'closets',
    values: [
      'Closets Material 1',
      'Closets Material 2',
      'Closets Material 3',
      'Closets Material 4',
      'Closets Material 5',
      'Closets Material 6'
    ]
  },
  {
    name: 'doorjambs',
    values: [
      'Door Jambs Material 1',
      'Door Jambs Material 2',
      'Door Jambs Material 3',
      'Door Jambs Material 4',
      'Door Jambs Material 5',
      'Door Jambs Material 6'
    ]
  }
];

// export const ROOM_RELATED_INFO = [
//   {
//     name: 'Walls',
//     mainItems: [
//       {
//         name: 'Room 1',
//         values: [
//           { name: 'Wall 1', assigned: '' },
//           { name: 'Wall 2', assigned: '' }
//         ]
//       },
//       {
//         name: 'Room 2',
//         values: [
//           { name: 'Wall 1', assigned: '' },
//           { name: 'Wall 2', assigned: '' },
//           { name: 'Wall 3', assigned: '' },
//           { name: 'Wall 4', assigned: '' }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Doors',
//     mainItems: [
//       {
//         name: 'Room 1',
//         values: [
//           { name: 'Door 1', assigned: '' },
//           { name: 'Door 2', assigned: '' }
//         ]
//       },
//       {
//         name: 'Room 2',
//         values: [
//           { name: 'Door 1', assigned: '' },
//           { name: 'Door 2', assigned: '' },
//           { name: 'Door 3', assigned: '' },
//           { name: 'Door 4', assigned: '' }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Windows',
//     mainItems: [
//       {
//         name: 'Room 1',
//         values: [
//           { name: 'Window 1', assigned: '' },
//           { name: 'Window 2', assigned: '' }
//         ]
//       },
//       {
//         name: 'Room 2',
//         values: [
//           { name: 'Window 1', assigned: '' },
//           { name: 'Window 2', assigned: '' },
//           { name: 'Window 3', assigned: '' },
//           { name: 'Window 4', assigned: '' }
//         ]
//       },
//       {
//         name: 'Room 4',
//         values: [
//           { name: 'Window 1', assigned: '' },
//           { name: 'Window 2', assigned: '' },
//           { name: 'Window 3', assigned: '' },
//           { name: 'Window 4', assigned: '' },
//           { name: 'Window 5', assigned: '' },
//           { name: 'Window 6', assigned: '' }
//         ]
//       }
//     ]
//   }
// ];

export const POPULAR_UNITS_OF_MEASUREMENT = [
  'Kilogram',
  'Litre',
  'Metre',
  'Pound',
  'Feet',
  'Quarts',
  'Inches',
  'Ounces',
  'Gallons'
];

export const FIELDS_WHERE_MATERIALS_ARE_APPLIES = [
  { label: 'doors' },
  { label: 'walls' },
  { label: 'windows' },
  { label: 'ceilings' },
  { label: 'doorJambs' },
  { label: 'crownMoldings' },
  { label: 'closets' }
];
export const companyProductionRate = [
  {
    bidType: 'Interior',
    appliesTo: 'Wall',
    appliesToType: 'Smooth',
    beginner: 10,
    intermediate: 20,
    proficient: 30
  },
  {
    bidType: 'Interior',
    appliesTo: 'Wall',
    appliesToType: 'Knock Down',
    beginner: 10,
    intermediate: 20,
    proficient: 30
  },
  {
    bidType: 'Interior',
    appliesTo: 'Ceiling',
    appliesToType: 'Smooth',
    beginner: 10,
    intermediate: 20,
    proficient: 30
  },
  {
    bidType: 'Interior',
    appliesTo: 'Ceiling',
    appliesToType: 'Popcorn',
    beginner: 10,
    intermediate: 20,
    proficient: 30
  },
  {
    bidType: 'Interior',
    appliesTo: 'Window',
    appliesToType: 'Double Hung',
    beginner: 10,
    intermediate: 20,
    proficient: 30
  },
  {
    bidType: 'Interior',
    appliesTo: 'Window',
    appliesToType: 'Sliding',
    beginner: 10,
    intermediate: 20,
    proficient: 30
  },
  {
    bidType: 'Interior',
    appliesTo: 'Window',
    appliesToType: 'Casement',
    beginner: 10,
    intermediate: 20,
    proficient: 30
  },
  {
    bidType: 'Interior',
    appliesTo: 'Wall',
    appliesToType: 'Orange Peel',
    beginner: 66,
    intermediate: 155,
    proficient: 352
  },
  {
    bidType: 'Interior',
    appliesTo: 'Window',
    appliesToType: 'Single Hung',
    beginner: 10,
    intermediate: 204,
    proficient: 352
  },
  {
    bidType: 'Interior',
    appliesTo: 'Ceiling',
    appliesToType: 'Knock Down',
    beginner: 180,
    intermediate: 340,
    proficient: 450
  },
  {
    bidType: 'Interior',
    appliesTo: 'Ceiling',
    appliesToType: 'Orange Peel',
    beginner: 145,
    intermediate: 245,
    proficient: 333
  },
  {
    bidType: 'Interior',
    appliesTo: 'Door',
    appliesToType: ' ',
    beginner: 145,
    intermediate: 245,
    proficient: 333
  },
  {
    bidType: 'Interior',
    appliesTo: 'Baseboard Trim',
    appliesToType: ' ',
    beginner: 145,
    intermediate: 245,
    proficient: 333
  },
  {
    bidType: 'Interior',
    appliesTo: 'Window Trim',
    appliesToType: ' ',
    beginner: 145,
    intermediate: 245,
    proficient: 333
  },
  {
    bidType: 'Interior',
    appliesTo: 'Door Jamb',
    appliesToType: ' ',
    beginner: 145,
    intermediate: 245,
    proficient: 333
  },

  {
    bidType: 'Interior',
    appliesTo: 'Crown Molding',
    appliesToType: ' ',
    beginner: 145,
    intermediate: 245,
    proficient: 333
  },
  {
    bidType: 'Interior',
    appliesTo: 'Closet',
    appliesToType: ' ',
    beginner: 145,
    intermediate: 245,
    proficient: 333
  },
  {
    bidType: 'Exterior',
    appliesTo: 'Wall',
    appliesToType: 'Vinyl Siding ',
    beginner: 145,
    intermediate: 245,
    proficient: 333
  },
  {
    bidType: 'Exterior',
    appliesTo: 'Wall',
    appliesToType: 'Clapboard Siding  Siding ',
    beginner: 145,
    intermediate: 245,
    proficient: 333
  },
  {
    bidType: 'Exterior',
    appliesTo: 'Wall',
    appliesToType: 'Stucco',
    beginner: 145,
    intermediate: 245,
    proficient: 333
  }
];


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
    proficiency: 'Beginner',
    productionRate: 20
  },
  {
    bidType: 'Interior',
    appliesTo: 'Wall',
    appliesToType: 'Smooth',
    proficiency: 'Intermediate',
    productionRate: 20
  },
  {
    bidType: 'Interior',
    appliesTo: 'Wall',
    appliesToType: 'Smooth',
    proficiency: 'Proficient',
    productionRate: 20
  },
  {
    bidType: 'Interior',
    appliesTo: 'Wall',
    appliesToType: 'Orange Peel',
    proficiency: 'Beginner',
    productionRate: 20
  },
  {
    bidType: 'Interior',
    appliesTo: 'Wall',
    appliesToType: 'Orange Peel',
    proficiency: 'Intermediate',
    productionRate: 20
  },
  {
    bidType: 'Interior',
    appliesTo: 'Wall',
    appliesToType: 'Orange Peel',
    proficiency: 'Proficient',
    productionRate: 20
  },
  {
    bidType: 'Interior',
    appliesTo: 'Window',
    appliesToType: 'Knock Down',
    proficiency: 'Beginner',
    productionRate: 20
  },
  {
    bidType: 'Interior',
    appliesTo: 'Window',
    appliesToType: 'Knock Down',
    proficiency: 'Intermediate',
    productionRate: 20
  },
  {
    bidType: 'Interior',
    appliesTo: 'Window',
    appliesToType: 'Knock Down',
    proficiency: 'Proficient',
    productionRate: 20
  }
];

const sections = [
  {
    type: 'Wall',
    subTypes: ['Smooth', 'Orange Peel']
  },
  {
    type: 'Window',
    subTypes: ['Knock Down']
  }
];
export const filterProductionRates = (productionRate = []) => {
  const allProductionRateObject = {};

  sections.forEach((section) => {
    const filteredProductionType = productionRate.filter(
      ({ appliesTo }) => appliesTo === section.type
    );
    allProductionRateObject[section.type] = [];

    // If a section contains sub-sections
    section?.subTypes?.forEach((subType) => {
      const filteredBySubtype = filteredProductionType.filter(
        ({ appliesToType }) => appliesToType === subType
      );
      allProductionRateObject[section.type] = [
        ...allProductionRateObject[section.type],
        {
          id: {
            Beginner:
              filteredBySubtype.find(({ proficiency }) => proficiency === 'Beginner')?._id ?? 'N/A',
            Intermediate:
              filteredBySubtype.find(({ proficiency }) => proficiency === 'Intermediate')?._id ??
              'N/A',
            Proficient:
              filteredBySubtype.find(({ proficiency }) => proficiency === 'Proficient')?._id ??
              'N/A'
          },
          appliesTo:
            filteredBySubtype.find(({ proficiency }) => proficiency === 'Beginner')?.appliesTo ??
            'N/A',
          bidType:
            filteredBySubtype.find(({ proficiency }) => proficiency === 'Beginner')?.bidType ??
            'N/A',
          appliesToType:
            filteredBySubtype.find(({ proficiency }) => proficiency === 'Beginner')
              ?.appliesToType ?? 'N/A',
          beginner:
            filteredBySubtype.find(({ proficiency }) => proficiency === 'Beginner')
              ?.productionRate ?? 'N/A',
          intermediate:
            filteredBySubtype.find(({ proficiency }) => proficiency === 'Intermediate')
              ?.productionRate ?? 'N/A',
          proficient:
            filteredProductionType.find(({ proficiency }) => proficiency === 'Proficient')
              ?.productionRate ?? 'N/A'
        }
      ];
    });
  });

  return allProductionRateObject;
};

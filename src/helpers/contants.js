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
// Status
export const NEW_CLIENT_STATUS = 'New Client';
export const OLD_CLIENT_STATUS = 'Old Client';

export const ALL_STATUS = [NEW_CLIENT_STATUS, OLD_CLIENT_STATUS];
export const PROCESS_STAGE_PREPARATION = 'Preparation';
export const PROCESS_STAGE_PAINTING = 'Painting';
export const PROCESS_STAGE_CLEANUP = 'Cleanup';
export const ALL_PROCESS_STAGES=[PROCESS_STAGE_PREPARATION,PROCESS_STAGE_PAINTING,PROCESS_STAGE_CLEANUP];
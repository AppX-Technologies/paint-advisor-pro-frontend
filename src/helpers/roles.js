import { SYSTEM_ROLES, COMPANY_ROLES } from './contants';

export const isSystemUser = (user) => {
  return SYSTEM_ROLES.includes(user?.role);
};

export const isCompanyUser = (user) => {
  return COMPANY_ROLES.includes(user?.role);
};

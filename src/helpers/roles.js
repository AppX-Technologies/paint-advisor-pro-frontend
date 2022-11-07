import { SYSTEM_ROLES, COMPANY_ROLES, ROLE_ORG_ADMIN } from './contants';

export const isSystemUser = (user) => {
  return SYSTEM_ROLES.includes(user?.role);
};

export const isCompanyUser = (user) => {
  return COMPANY_ROLES.includes(user?.role);
};

export const isCompanyAdmin = (user) => {
  return user?.role === ROLE_ORG_ADMIN;
};

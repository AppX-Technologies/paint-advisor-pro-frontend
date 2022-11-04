/*eslint-disable*/
import React from 'react';
import BasicTabs from '../../common/BasicTabs';
import { dashboardTabLists } from '../../common/Constants';
import Companies from './Companies';
import Users from './Users';

export default function index() {
  return <BasicTabs tabList={dashboardTabLists} categoryLists={[<Companies />, <Users />]} />;
}

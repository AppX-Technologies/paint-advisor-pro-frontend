import React from 'react'
import MUIDataTable from "mui-datatables";

const columns = [
  {
   name: "name",
   label: "Name",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "email",
   label: "Email",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "city",
   label: "City",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "state",
   label: "State",
   options: {
    filter: true,
    sort: false,
   }
  },
 ];
 
//  dummy data
 const data = [
  { name: "Joe James", email: "thor1@gmail.com", city: "Yonkers", state: "NY" },
  { name: "John Walsh", email: "thor2@gmail.com", city: "Hartford", state: "CT" },
  { name: "Bob Herm", email: "thor3@gmail.com", city: "Tampa", state: "FL" },
  { name: "James Houston", email: "thor4@gmail.com", city: "Dallas", state: "TX" },
 ];
 
 const options = {
   filterType: 'textField',
   print:false
 };
const Users = () => {
  return (
    <MUIDataTable
    title={"Users List"}
    data={data}
    columns={columns}
    options={options}
  />
  )
}

export default Users
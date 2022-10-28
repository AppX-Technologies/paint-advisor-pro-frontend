import { Button } from "@mui/material";

export const companyColumns = [
  {
    name: "",
    label: "",
    options: {
      display: false,
    },
  },
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "email",
    label: "Email",
    options: {
      filter: true,
    },
  },
  {
    name: "address",
    label: "Address",
    options: {
      filter: true,
    },
  },
  {
    name: "phone",
    label: "Phone",
    options: {
      filter: true,
    },
  },
  {
    name: "active",
    label: "Status",
    options: {
      filter: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            style={{
              fontSize: "12px",
              textTransform: "none",
              fontWeight: 700,
              background: "#1565c0",
              color: "#fafafa",
              padding: "4px 8px",
              textTransform: "capitalize",
            }}
          >
            {value ? "Active" : "Inactive"}
          </Button>
        );
      },
    },
  },
];

export const usersColumns = [
  {
    name: "",
    label: "",
    options: {
      display: false,
    },
  },
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "email",
    label: "Email",
    options: {
      filter: true,
    },
  },
  {
    name: "phone",
    label: "Phone",
    options: {
      filter: true,
    },
  },

  {
    name: "active",
    label: "Status",
    options: {
      filter: true,

      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            style={{
              fontSize: "12px",
              textTransform: "none",
              fontWeight: 700,
              background: "#1565c0",
              color: "#fafafa",
              padding: "4px 8px",
              textTransform: "capitalize",
            }}
          >
            {value ? "Active" : "Inactive"}
          </Button>
        );
      },
    },
  },
];
export const companyUserColumns = [
  {
    name: "",
    label: "",
    options: {
      display: false,
    },
  },
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "email",
    label: "Email",
    options: {
      filter: true,
    },
  },
  {
    name: "phone",
    label: "Phone",
    options: {
      filter: true,
    },
  },
  {
    name: "role",
    label: "Role",
    options: {
      filter: true,
    },
  },
  {
    name: "company",
    label: "Company",
    options: {
      filter: true,
    },
  },
  {
    name: "active",
    label: "Status",
    options: {
      filter: true,

      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            style={{
              fontSize: "12px",
              textTransform: "none",
              fontWeight: 700,
              background: "#1565c0",
              color: "#fafafa",
              padding: "4px 8px",
              textTransform: "capitalize",
            }}
          >
            {value ? "Active" : "Inactive"}
          </Button>
        );
      },
    },
  },
];

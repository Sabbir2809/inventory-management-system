import CreateBrand from "../pages/brand/CreateBrand";
import Dashboard from "../pages/dashboard/Dashboard";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "Brands",
    children: [
      {
        name: "Create Brand",
        path: "create-brand",
        element: <CreateBrand />,
      },
    ],
  },
];

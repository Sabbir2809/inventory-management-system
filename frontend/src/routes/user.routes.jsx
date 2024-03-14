import ProfileDetails from "../pages/auth/ProfileDetails";
import CreateBrand from "../pages/brand/CreateBrand";
import Dashboard from "../pages/dashboard/Dashboard";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile-details",
    element: <ProfileDetails />,
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

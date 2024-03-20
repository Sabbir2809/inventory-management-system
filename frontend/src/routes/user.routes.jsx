import ProfileDetails from "../pages/auth/ProfileDetails";
import Dashboard from "../pages/dashboard/Dashboard";
import CreateProduct from "../pages/product/CreateProduct";
import ProductList from "../pages/product/ProductList";
import BrandList from "../pages/product/brand/BrandList";
import CreateBrand from "../pages/product/brand/CreateBrand";
import CategoryList from "../pages/product/category/CategoryList";
import CreateCategory from "../pages/product/category/CreateCategory";

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
    name: "Products",
    children: [
      {
        name: "Create Brand",
        path: "create-brand",
        element: <CreateBrand />,
      },
      {
        name: "Brand List",
        path: "brands",
        element: <BrandList />,
      },
      {
        name: "Create Category",
        path: "create-category",
        element: <CreateCategory />,
      },
      {
        name: "Category List",
        path: "categories",
        element: <CategoryList />,
      },
      {
        name: "Create Product",
        path: "create-product",
        element: <CreateProduct />,
      },
      {
        name: "Product List",
        path: "products",
        element: <ProductList />,
      },
    ],
  },
];

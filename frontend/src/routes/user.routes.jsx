import ProfileDetails from "../pages/auth/ProfileDetails";
import CreateCustomer from "../pages/customer/CreateCustomer";
import CustomerList from "../pages/customer/CustomerList";
import Dashboard from "../pages/dashboard/Dashboard";
import CreateExpense from "../pages/expense/CreateExpense";
import CreateExpenseType from "../pages/expense/CreateExpenseType";
import ExpenseList from "../pages/expense/ExpenseList";
import CreateProduct from "../pages/product/CreateProduct";
import ProductList from "../pages/product/ProductList";
import BrandList from "../pages/product/brand/BrandList";
import CreateBrand from "../pages/product/brand/CreateBrand";
import CategoryList from "../pages/product/category/CategoryList";
import CreateCategory from "../pages/product/category/CreateCategory";
import CreateSupplier from "../pages/supplier/CreateSupplier";
import SupplierList from "../pages/supplier/SupplierList";

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
    name: "Customer",
    children: [
      {
        name: "Create Customer",
        path: "create-customer",
        element: <CreateCustomer />,
      },
      {
        name: "Customer List",
        path: "customers",
        element: <CustomerList />,
      },
    ],
  },
  {
    name: "Supplier",
    children: [
      {
        name: "Create Supplier",
        path: "create-supplier",
        element: <CreateSupplier />,
      },
      {
        name: "Supplier List",
        path: "suppliers",
        element: <SupplierList />,
      },
    ],
  },
  {
    name: "Expense",
    children: [
      {
        name: "Create Expense Type",
        path: "create-type",
        element: <CreateExpenseType />,
      },
      {
        name: "Create Expense",
        path: "create-expense",
        element: <CreateExpense />,
      },
      {
        name: "Expense List",
        path: "expenses",
        element: <ExpenseList />,
      },
    ],
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

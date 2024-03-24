import { AiOutlineBank, AiOutlineUser } from "react-icons/ai";
import { FaListOl } from "react-icons/fa";
// import { AiOutlineBank, AiOutlineUser, AiOutlineUnorderedList } from "react-icons/ai";
import { BsBox } from "react-icons/bs";
// import { BsBox, BsPeople, BsGraphUp, BsCircle, BsBagPlus, BsBagX, BsCartPlus } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import { TbReportAnalytics, TbReportSearch, TbTruckDelivery } from "react-icons/tb";
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
import ExpenseReport from "../pages/report/ExpenseReport";
import PurchaseReport from "../pages/report/PurchaseReport";
import ReturnReport from "../pages/report/ReturnReport";
import SellReport from "../pages/report/SellReport";
import CreateSupplier from "../pages/supplier/CreateSupplier";
import SupplierList from "../pages/supplier/SupplierList";

export const userPaths = [
  {
    icon: <RiDashboardLine />,
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile-details",
    element: <ProfileDetails />,
  },
  {
    icon: <AiOutlineUser />,
    name: "Customer",
    children: [
      {
        icon: <IoCreateOutline />,
        name: "New Customer",
        path: "create-customer",
        element: <CreateCustomer />,
      },
      {
        icon: <FaListOl />,
        name: "Customer List",
        path: "customers",
        element: <CustomerList />,
      },
    ],
  },
  {
    icon: <TbTruckDelivery />,
    name: "Supplier",
    children: [
      {
        icon: <IoCreateOutline />,
        name: "New Supplier",
        path: "create-supplier",
        element: <CreateSupplier />,
      },
      {
        icon: <FaListOl />,
        name: "Supplier List",
        path: "suppliers",
        element: <SupplierList />,
      },
    ],
  },
  {
    icon: <AiOutlineBank />,
    name: "Expense",
    children: [
      {
        icon: <IoCreateOutline />,
        name: "New Expense-Type",
        path: "create-type",
        element: <CreateExpenseType />,
      },
      {
        icon: <IoCreateOutline />,
        name: "New Expense",
        path: "create-expense",
        element: <CreateExpense />,
      },
      {
        icon: <FaListOl />,
        name: "Expense List",
        path: "expenses",
        element: <ExpenseList />,
      },
    ],
  },
  {
    icon: <BsBox />,
    name: "Products",
    children: [
      {
        icon: <IoCreateOutline />,
        name: "New Brand",
        path: "create-brand",
        element: <CreateBrand />,
      },
      {
        icon: <FaListOl />,
        name: "Brand List",
        path: "brands",
        element: <BrandList />,
      },
      {
        icon: <IoCreateOutline />,
        name: "New Category",
        path: "create-category",
        element: <CreateCategory />,
      },
      {
        icon: <FaListOl />,
        name: "Category List",
        path: "categories",
        element: <CategoryList />,
      },
      {
        icon: <IoCreateOutline />,
        name: "New Product",
        path: "create-product",
        element: <CreateProduct />,
      },
      {
        icon: <FaListOl />,
        name: "Product List",
        path: "products",
        element: <ProductList />,
      },
    ],
  },
  {
    icon: <TbReportSearch />,
    name: "Report",
    children: [
      {
        icon: <TbReportAnalytics />,
        name: "Expense Report",
        path: "expense-report",
        element: <ExpenseReport />,
      },
      {
        icon: <TbReportAnalytics />,
        name: "Sell Report",
        path: "sell-report",
        element: <SellReport />,
      },
      {
        icon: <TbReportAnalytics />,
        name: "Purchase Report",
        path: "purchase-report",
        element: <PurchaseReport />,
      },
      {
        icon: <TbReportAnalytics />,
        name: "Return Report",
        path: "return-report",
        element: <ReturnReport />,
      },
    ],
  },
];

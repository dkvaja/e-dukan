import { Navigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import Products from "../pages/Products";

export const getRoutes = (userRole) => {
  switch (userRole) {
    case "0":
      return [
        { index: true, element: <Products /> },
        { path: "*", element: <Navigate to="/404" /> },
      ];
    case "1":
      return [
        { index: true, element: <Products /> },
        { path: "/addProduct", element: <AddProduct /> },
        { path: "*", element: <Navigate to="/404" /> },
      ];
    default:
      return;
  }
};

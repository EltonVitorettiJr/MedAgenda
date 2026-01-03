import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ToastContainer, type ToastContainerProps } from "react-toastify";
import { AuthProvider } from "../context/AuthContext";
import UserLayout from "../layouts/UserLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
  const toastConfig: ToastContainerProps = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "colored",
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />}></Route>

          <Route element={<PrivateRoutes />}>
            <Route element={<UserLayout />}>
              <Route
                path="/"
                element={<Navigate to="/agenda" replace />}
              ></Route>
              <Route path="/agenda" element={<Dashboard></Dashboard>}></Route>
              <Route path="*" element={<h2>Página não encontrada.</h2>}></Route>
            </Route>
          </Route>
        </Routes>
        <ToastContainer {...toastConfig} />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;

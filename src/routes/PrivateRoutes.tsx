import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = () => {
  const { authState, loading } = useAuth();

  loading && (
    <div className="h-screen flex items-center justify-center">
      Carregando...
    </div>
  );

  if (!authState.user.id) return <Navigate to="/login" replace></Navigate>;

  return <Outlet />;
};

export default PrivateRoutes;

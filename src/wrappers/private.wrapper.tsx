import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "~/features/auth/auth.store";

const PrivateWrapper = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateWrapper;

import { Navigate } from "react-router-dom";
import { getToken } from "@/lib/api";

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  if (!getToken()) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

export default RequireAdmin;

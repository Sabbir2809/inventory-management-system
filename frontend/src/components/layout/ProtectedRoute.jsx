import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const ProtectedRoute = ({ children }) => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    verifyToken(token);
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};
export default ProtectedRoute;

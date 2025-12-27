import { Navigate } from "react-router";

function PrivateRoute({ children }) {
  const isLoading = false;
  const isError = false;
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;

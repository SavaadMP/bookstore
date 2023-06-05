import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    // * Remove User From Storage
    localStorage.removeItem("user");

    // * dispatch logout function
    dispatch({
      type: "LOGOUT_USER",
    });

    // * navigate to login page
    navigate("/login");
  };

  return { logout };
};

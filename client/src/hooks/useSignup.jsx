import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const Signup = async (username, email, password) => {
    const response = await fetch("http://localhost:2200/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // * Save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //   * Update the auth context
      dispatch({
        type: "LOGIN_USER",
        payload: json,
      });

      setIsLoading(false);
      setError(null);
      navigate("/");
    }
  };

  return { Signup, isLoading, error };
};

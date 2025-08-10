/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); //New state to track loading

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.AUTH.GET_PROFILE);
        setUser(response.data.user);
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token); //Save Token
    setLoading(false);
  };

  const addMoneyToWalletye = (amount) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;

      const updatedUser = {
        ...prevUser,
        wallet: {
          ...prevUser.wallet,
          balance: (prevUser.wallet.balance || 0) + amount,
        },
      };

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // You might want to update token or other things here if needed

      return updatedUser;
    });
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{ user, loading, updateUser, addMoneyToWalletye, clearUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

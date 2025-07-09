import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useContext, useCallback } from "react";
import toast from "react-hot-toast";

const UserContext = React.createContext();

// set axios to include credentials with every request
axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:4000";

  const router = useRouter();

  const pathname = usePathname();

  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // register user
  const registerUser = async (e) => {
    e.preventDefault();
    if (
      !userState.email.includes("@") ||
      !userState.password ||
      userState.password.length < 6
    ) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }

    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
      toast.success(res.data.message);

      // clear the form
      setUserState({
        name: "",
        email: "",
        password: "",
      });

      // const verificationToken = res.data.verificationToken;
      // if (verificationToken) {
      //   router.push(`/verify-email/${verificationToken}`);
      // }
    } catch (error) {
      console.log("Error registering user", error);
      toast.error(error.response.data.message);
    }
  };

  // login the user
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/login`,
        {
          email: userState.email,
          password: userState.password,
        },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success(res.data.message);

      // clear the form
      setUserState({
        email: "",
        password: "",
      });

      // refresh the user details
      await getUser(); // fetch before redirecting

      // push user to the dashboard page
      router.push("/");
    } catch (error) {
      console.log("Error logging in user", error);
      toast.error(error.response.data.message);
    }
  };

  // get user Looged in Status
  const userLoginStatus = useCallback(async () => {
    let loggedIn = false;
    try {
      const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
        withCredentials: true, // send cookies to the server
      });

      // coerce the string to boolean
      loggedIn = !!res.data;
      setLoading(false);

      if (!loggedIn) {
        router.push("/login");
      }
    } catch (error) {
      console.log("Error getting user login status", error);
    }

    return loggedIn;
  }, [serverUrl, router]);

  // logout user
  const logoutUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/logout`, {
        withCredentials: true, // send cookies to the server
      });

      toast.success(res.data.message);

      if (
        pathname === "/favourites" ||
        pathname === "/mysnippets" ||
        pathname === "/profile"
      ) {
        router.push("/login");
      }
    } catch (error) {
      console.log("Error logging out user", error);
      toast.error(error.response.data.message);
    }
  };

  // get user details
  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/user`, {
        withCredentials: true, // send cookies to the server
      });

      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      setLoading(false);
    } catch (error) {
      console.log("Error getting user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  //get user by it's id
  const getUserById = async (id) => {
    setLoading(true);
    try {
      const user = await axios.get(`${serverUrl}/api/v1/user/${id}`, {
        withCredentials: true,
      });
      setLoading(false);
      return user.data;
    } catch (error) {
      console.log("error in fetching the user by id", error);
      toast.error(error.response.data.message);
    }
  };

  // get user activity
  const getUserActivity = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/user/${id}/activity`, {
        withCredentials: true,
      });
      setLoading(false);
      return res.data;
    } catch (error) {
      console.log("Error fetching user activity", error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Failed to fetch activity");
      return [];
    }
  };

  // update user details
  const updateUser = async (e, data) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(
        `${serverUrl}/api/v1/update-profile`,
        data,
        {
          withCredentials: true, // send cookies to the server
        }
      );

      // update the user state
      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      toast.success(res.data.message);

      setLoading(false);
    } catch (error) {
      console.log("Error updating user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  // email verification
  const emailVerification = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/verify-email`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );
      setLoading(false);
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error sending email verification", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  // verify user/email
  const verifyUser = async (token) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/verify-user/${token}`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success(res.data.message);

      // refresh the user details
      getUser();

      setLoading(false);
      // redirect to home page
      router.push("/");
    } catch (error) {
      console.log("Error verifying user", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // forgot password email
  const forgotPasswordEmail = async (email) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/forgot-password`,
        {
          email,
        },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success(res.data.message);
      setLoading(false);
    } catch (error) {
      console.log("Error sending forgot password email", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // reset password
  const resetPassword = async (token, password) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/reset-password/${token}`,
        {
          password,
        },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success(res.data.message);
      setLoading(false);
      // redirect to login page
      router.push("/login");
    } catch (error) {
      console.log("Error resetting password", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // change password
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);

    try {
      await axios.patch(
        `${serverUrl}/api/v1/change-password`,
        { currentPassword, newPassword },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("Password changed successfully");
      setLoading(false);
    } catch (error) {
      console.log("Error changing password", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // admin routes
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${serverUrl}/api/v1/admin/users`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );

      setAllUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error getting all users", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // dynamic form handler
  const handlerUserInput = (name) => (e) => {
    const value = e.target.value;

    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // delete user
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `${serverUrl}/api/v1/admin/users/${id}`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("User deleted successfully");
      setLoading(false);
      // refresh the users list
      getAllUsers();
    } catch (error) {
      console.log("Error deleting user", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loginStatusGetUser = async () => {
      const isLoggedIn = await userLoginStatus();

      if (isLoggedIn) {
        await getUser();
      }
    };

    loginStatusGetUser();
  }, [userLoginStatus]);

  useEffect(() => {
    if (user.role === "admin") {
      getAllUsers();
    }
  }, [user.role]);

  return (
    <UserContext.Provider
      value={{
        registerUser,
        userState,
        handlerUserInput,
        loginUser,
        logoutUser,
        userLoginStatus,
        user,
        getUserById,
        updateUser,
        emailVerification,
        verifyUser,
        forgotPasswordEmail,
        resetPassword,
        changePassword,
        allUsers,
        deleteUser,
        getUserActivity,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

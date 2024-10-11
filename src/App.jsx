import { useDispatch, useSelector } from "react-redux";
import { Footer, Header } from "./components";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./app/authSlice";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { themeChange } from "theme-change";

function App() {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.authStatus);

  useEffect(() => {
    themeChange(false);
  }, []);

  useEffect(() => {
    if (authStatus) {
      authService
        .getCurrentUser()
        .then((userData) => {
          if (userData) dispatch(login(userData));
          else dispatch(logout());
        })
        .finally(() => setLoading(false));
    }
  }, [dispatch, authStatus]);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main className="bg-base-200 p-4 min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  ) : (
    <div className="flex justify-center content-center h-screen">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
}

export default App;

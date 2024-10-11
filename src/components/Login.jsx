import { useForm } from "react-hook-form";
import { Input, Button } from ".";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../appwrite/auth";
import { login as authLogin } from "../app/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTheme = localStorage.getItem("theme") ?? "light";
  const toastTheme =
    currentTheme == "light" ||
    currentTheme == "cupcake" ||
    currentTheme == "aqua" ||
    currentTheme == "cyberpunk" ||
    currentTheme == "wireframe"
      ? "light"
      : "dark";
  const notifyOnSuccess = (user) =>
    toast.success(`Welcome! back ${user}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: `${toastTheme}`,
    });
  const notifyOnError = () =>
    toast.error("Something went wrong!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: `${toastTheme}`,
    });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = async (data) => {
    setError("");
    try {
      setLoading(true);
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        // better way?
        document.getElementById("login").close();
        setLoading(false);
        navigate("/");
        notifyOnSuccess(userData.name);
      }
    } catch (error) {
      setLoading(false);
      notifyOnError();
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleLink = () => {
    setValue("email", "demo@demo.com");
    setValue("password", "demouser123");
  };

  return (
    <div className="w-full">
      <h2 className="text-center text-2xl font-bold leading-tight">
        Sign in to your account
      </h2>
      <p className="text-center mt-4">
        <a className="link" onClick={handleLink}>
          Visit as Demo user
        </a>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(login)} className="mt-4">
        <div className="space-y-5">
          <Input
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />
          <Button type="submit" className="btn btn-lg w-full">
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;

import { useState } from "react";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { login } from "../app/authSlice";
import { Button, Input } from ".";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
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

  const create = async (data) => {
    setError("");
    setLoading(true);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        // better way?
        document.getElementById("signup").close();
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

  return (
    <>
      <h2 className="text-center text-2xl font-bold leading-tight">
        Sign up to create account
      </h2>
      <p className="text-center mt-2">
        <a
          className="link"
          onClick={() => {
            document.getElementById("signup").close();
            document.getElementById("login").showModal();
          }}
        >
          For demo purpose, login as Demo user
        </a>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(create)} className="mt-4">
        <div className="space-y-5">
          <Input
            type="name"
            placeholder="Enter your name"
            {...register("name", {
              required: true,
            })}
          />
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
              "Create Account"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}

export default Signup;


import React, { useState } from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { motion, AnimatePresence } from "framer-motion";
import auth from "@/app/auth/authfun";
import loginfun from "@/app/auth/loginfun";
import forgetfun from "@/app/auth/forgetpassword";
import { useDispatch } from "react-redux";

const variants = {
  hidden: { opacity: 0, x: "-100%", transition: { duration: 0.3 } },
  visible: { opacity: 1, x: "0%", transition: { duration: 0.3 } },
  exit: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
};

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmed: string;
}

export function BackgroundLinesDemo() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState<"login" | "signup" | "forget">("signup");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    passwordConfirmed: "",
  });

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); 
  };
  const handleUserSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); 

    try {
      const data = await loginfun(formData); 
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.data.newUser._id);
        dispatch({ type: "auth", payload: data.token });
        dispatch({ type: "user", payload: data.data.newUser._id });
        window.location.href = "/";
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); 
      } else {
        setError("Something went wrong during sign up");
      }
    }
  };

  const handleUserLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); 

    try {
      const logindata = { email: formData.email, password: formData.password };
      const data = await loginfun(logindata); 

      if (data) {
        dispatch({ type: "auth", payload: data.token });
        dispatch({ type: "user", payload: data.userId });
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        window.location.href = "/"; 
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); 
      } else {
        setError("Something went wrong during login");
      }
    }
  };

  const handleUserForgetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const message = await forgetfun(formData.email);
      if (message) setMessage(message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); 
      } else {
        setError("Something went wrong during login");
      }
    }
  };

  return (
    <BackgroundLines className="flex items-center gap-12 justify-start w-full flex-col px-4">
      <div className="glowingtext lg:text-[3rem] mt-2 sm:text-3xl p-2">
        Join Now for Exclusive Benefits
      </div>

      <div className="bg-gray-800 bg-opacity-[0.5] z-30 h-[70vh] rounded-lg overflow-hidden flex flex-col relative justify-center items-center max-sm:w-[95%] sm:w-[45%] md:w-[40%] lg:w-[30%]">
        <button
          className="w-[30rem] rounded-lg flex justify-center items-center gap-[2%] h-[4rem] p-3"
          onClick={() => setToggle(toggle === "signup" ? "login" : "signup")}
        >
          <motion.p whileTap={{ scale: 1.2 }}>
            {toggle === "signup" ? "Already have an account?" : "Create a new account"}
          </motion.p>
        </button>

        <AnimatePresence mode="wait">
          {toggle === "login" && (
            <motion.form
              key="login"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleUserLogin}
              className="h-[100%] w-[100%] flex flex-col justify-center items-center gap-4"
            >
              {error && <span className="text-red-500">{error}</span>}
              <div className="bg-gradient-animated w-[75%] rounded-lg p-1">
                <input
                  className="p-4 text-lg w-[100%] bg-gray-800 rounded-lg"
                  placeholder="Email"
                  type="email"
                  name="email"
                  onChange={handleDataChange}
                />
              </div>
              <div className="bg-gradient-animated w-[75%] rounded-lg p-1">
                <input
                  className="p-4 text-lg w-[100%] bg-gray-800 rounded-lg"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleDataChange}
                />
              </div>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-gray-50 cursor-pointer"
                onClick={() => setToggle("forget")}
              >
                Forget password?
              </motion.span>
              <button className="z-20 rounded-2xl p-3 bg-purple-600">Sign in</button>
            </motion.form>
          )}

          {toggle === "signup" && (
            <motion.form
              key="signup"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleUserSignUp}
              className="h-[100%] w-[100%] flex flex-col justify-center items-center gap-4"
            >
              {error && <span className="text-red-500">{error}</span>}
              <div className="bg-gradient-animated w-[75%] rounded-lg p-1">
                <input
                  className="p-4 text-lg w-[100%] bg-gray-800 rounded-lg"
                  placeholder="User name"
                  name="name"
                  onChange={handleDataChange}
                />
              </div>
              <div className="bg-gradient-animated w-[75%] rounded-lg p-1">
                <input
                  className="p-4 text-lg w-[100%] bg-gray-800 rounded-lg"
                  placeholder="Email"
                  type="email"
                  name="email"
                  onChange={handleDataChange}
                />
              </div>
              <div className="bg-gradient-animated w-[75%] rounded-lg p-1">
                <input
                  className="p-4 text-lg w-[100%] bg-gray-800 rounded-lg"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleDataChange}
                />
              </div>
              <div className="bg-gradient-animated w-[75%] rounded-lg p-1">
                <input
                  className="p-4 text-lg w-[100%] bg-gray-800 rounded-lg"
                  placeholder="Confirm password"
                  type="password"
                  name="passwordConfirmed"
                  onChange={handleDataChange}
                />
              </div>
              <button className="z-20 rounded-2xl p-3 bg-purple-600">Sign up</button>
            </motion.form>
          )}

          {toggle === "forget" && (
            <motion.form
              key="forget"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleUserForgetPassword}
              className="h-[100%] w-[100%] flex flex-col justify-center items-center gap-4"
            >
              {error && <span className="text-red-500">{error}</span>}
              {message && <span className="text-green-500">{message}</span>}
              <div className="bg-gradient-animated w-[75%] rounded-lg p-1">
                <input
                  className="p-4 text-lg w-[100%] bg-gray-800 rounded-lg"
                  placeholder="Email"
                  type="email"
                  name="email"
                  onChange={handleDataChange}
                />
              </div>
              <button className="z-20 rounded-2xl p-3 bg-purple-600">Reset Password</button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </BackgroundLines>
  );
}

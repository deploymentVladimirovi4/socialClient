import React, { useState } from "react";
import "./register.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister } from "../../redux/slices/AuthSlice";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

type ValueType = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: ValueType) => {
    console.log(values);
    const data = await dispatch(fetchRegister(values));
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      navigate("/", { replace: true });
    } else {
      console.log("Somthng goes wrong");
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h2 className="registerLogo">Socialism</h2>
          <span className="registerDescription">
            Connect with friends and the world around you on Socialism
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <input
              placeholder="Username"
              className="registerInput"
              type="text"
              {...register("username", { required: "Enter your name" })}
            />
            <input
              placeholder="Email"
              className="registerInput"
              {...register("email", { required: "Укажите почту" })}
            />
            <input
              placeholder="Password"
              className="registerInput"
              type="password"
              {...register("password", { required: "Enter your password" })}
            />
            <button className="registerButton" onClick={handleSubmit(onSubmit)}>
              Sign Up
            </button>
            <button className="registerButton">
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "black" }}
              >
                Log into Account
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import "./login.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/AuthSlice";
import { useForm } from "react-hook-form";
import { AppDispatch } from "../../redux/store";
import { UserDataType } from "../../redux/slices/AuthSlice";

type ValueType = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: ValueType) => {
    const data = await dispatch(fetchAuth(values));

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      navigate("/", { replace: true });
    } else {
      window.alert("you shall not pass!");
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h2 className="loginLogo">Socialism</h2>
          <span className="loginDescription">
            Connect with friends and the world around you on Socialism
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              placeholder="Email"
              className="loginInput"
              {...register("email", { required: "enter your email" })}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              {...register("password", { required: "Enter your password" })}
            />
            <button className="loginButton" onClick={handleSubmit(onSubmit)}>
              Log In
            </button>
            <span className="loginCreate">Don't have an account?</span>
            <button className="loginRegisterButton">
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                Create a New Account
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

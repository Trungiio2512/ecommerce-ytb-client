import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import path from "../../until/path";
import FormInput from "../../components/FormInput";
// import * as apiUser from "../../apis/user";
import * as userActions from "../../app/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { setUserMsg } from "../../app/slices/user";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, loading, userInfo, token, error, msg } = useSelector((state) => state.user);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },

    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.email && values.password) {
      dispatch(userActions.login(values));
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isLoggedIn) {
      Swal.fire("Login Success", msg, "success").then(() => {
        dispatch(setUserMsg());

        navigate(`/${path.HOME}`);
      });
    } else if (error && !isLoggedIn) {
      Swal.fire("Login Fail", msg, "error").then(() => {
        dispatch(setUserMsg());
      });
    }
  }, [dispatch, error, isLoggedIn, navigate, userInfo]);
  return (
    <div className="bg-yellow-100 flex i h-screen ">
      <div className="w-full lg:w-2/5 md:w-3/5 m-auto lg:bg-white  lg:border border-gray-300 rounded-lg ">
        <div className="flex items-center px-10 py-4 md:h-screen-75">
          <form onSubmit={handleSubmit} className="w-full space-y-8 relative">
            <div className="absolute top-0 left-0">
              <Link
                to={`/`}
                className="capitalize text-lg text-gray-700 hover:text-main transition-all"
              >
                trang chủ
              </Link>
            </div>
            <div className="flex items-center justify-center text-center space-x-3 mb-20">
              <span className="text-3xl font-semibold text-gray-700">Login</span>
              <span className="text-base text-gray-800 ">Form</span>
            </div>
            {inputs.map((input) => (
              <FormInput
                classNameLabel={
                  "w-full absolute top-0 left-0 lg:w-4/5 mx-auto text-sm text-gray-800 tracking-wide animate-slide-top"
                }
                key={input.id}
                {...input}
                name={input.name}
                value={values[input.name]}
                onChange={onChange}
                className="bg-yellow-200 text-lg placeholder:text-sm lg:bg-white border lg:border-2 border-gray-400 rounded-[12px] lg:border-gray-300 w-full p-3 outline-none focus:border-gray-400 active:border-gray-400"
              />
            ))}
            <div className="w-full lg:w-4/5 mx-auto flex items-center justify-between">
              <Link
                to={`/${path.FORGOT_PASS}`}
                className="text-gray-800 tracking-wide inline-block border-b border-gray-300"
              >
                Forgot Password
              </Link>
              <Link
                to={`/${path.REGISTER}`}
                className="text-gray-800 tracking-wide inline-block border-b border-gray-300"
              >
                You dont have account
              </Link>
            </div>
            <button className="outline-none w-full active:bg-red-400 active:text-white hover:bg-red-100 hover:text-gray-400 text-lg py-2 px-4 rounded-2xl border border-gray-400 transition-all duration-500">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
Login.propTypes = {};

export default Login;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormInput } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { forgotPass, resetPass } from "../../apis/user";
import Swal from "sweetalert2";
import path from "../../until/path";

const ForgotPassword = (props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
  });
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      // errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "code",
      type: "text",
      placeholder: "Enter your code",
      // errorMessage: "It should be a valid email address!",
      label: "Code",
      required: true,
    },
    {
      id: 2,

      name: "password",
      type: "password",
      placeholder: "Password",
      // errorMessage: "It should be a valid email address!",
      label: "Password",
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      // errorMessage: "It should be a valid email address!",
      label: "Confirm Password",
      required: true,
    },
  ];
  const handleOnchange = (e) => {
    setValues(() => ({ ...values, [e.target.name]: e.target.value }));
  };
  const handleGetCode = async (e) => {
    e.preventDefault();
    if (values.email === "") {
      Swal.fire("Oppp.", "You must provide email address", "error").then(() => {
        return;
      });
    } else {
      const rs = await forgotPass({ email: values.email });
      console.log(rs);
      if (rs.sucess) {
        Swal.fire("Done", rs.msg, "success");
      } else {
        Swal.fire("Opps....!", rs.msg, "error");
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const rs = await resetPass(values.code, { password: values.password });
    if (rs.sucess) {
      Swal.fire("Done", rs.msg, "success").then(() => {
        navigate(`/${path.HOME}`);
      });
    } else {
      Swal.fire("Opps....!", rs.msg, "error");
    }
  };
  return (
    <div className="w-full min-h-screen">
      <section className="bg-gray-50 dark:bg-gray-900 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 w-full h-full">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Home
          </Link>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form className="mt-4 space-y-5 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
              {inputs.map((input) => {
                return (
                  <FormInput
                    label={input?.label}
                    classNameLabel={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}
                    className={
                      "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    }
                    {...input}
                    key={input.id}
                    values={values[input.name]}
                    onChange={handleOnchange}
                  />
                );
              })}
              <button className="text-sm text-white hover:text-main" onClick={handleGetCode}>
                Get Code
              </button>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-blue-800"
              >
                Reset passwod
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

ForgotPassword.propTypes = {};

export default ForgotPassword;

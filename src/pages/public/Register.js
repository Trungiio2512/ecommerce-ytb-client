import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import path from "../../until/path";
import FormInput from "../../components/FormInput";
import * as apiUser from "../../apis/user";
import { setUser } from "../../app/slices/user";
// import {} from '../../app/slices/user'

const Regiter = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: "",
    mobile: "",
    firstName: "",
    lastName: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
    mobile: "",
    firstName: "",
    lastName: "",
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
    {
      id: 5,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      // errorMessage:
      //   "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "First Name",
      required: true,
    },
    {
      id: 6,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      // errorMessage:
      //   "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Last Name",
      required: true,
    },
    {
      id: 7,
      name: "mobile",
      type: "text",
      placeholder: "Mobile",
      // errorMessage:
      //   "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Mobile",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email) {
      setErrorMessages({ ...errorMessages, email: "Vui lòng nhập địa chỉ email" });
    }
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.email.match(validRegex)) {
      setErrorMessages({ ...errorMessages, email: "Email không hợp lệ" });
    }
    if (!values.firstName) {
      setErrorMessages({ ...errorMessages, firstName: "Vui lòng nhập họ tên" });
    }
    if (!values.lastName) {
      setErrorMessages({ ...errorMessages, lastName: "Vui lòng nhập họ tên" });
    }
    if (!values.mobile) {
      setErrorMessages({ ...errorMessages, mobile: "Vui lòng nhập số điện thoại" });
    }
    if (
      values.email &&
      values.password &&
      values.mobile &&
      values.firstName &&
      values.lastName 
      ) {
      console.log(1)
      const rs = await apiUser.register(values);
      if (rs?.sucess) {
        Swal.fire("Register Success", rs?.msg, "success").then(() => {
          navigate(`/${path.LOGIN}`);
        });
      } else {
        Swal.fire("Register Fail", rs?.msg, "error");
      }
    }
    console.log(values)
    console.log(errorMessages)
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-yellow-100 flex items-center justify-center h-full">
      <div className="w-full lg:w-2/5 md:w-3/5 lg:bg-white lg:h-screen-75 lg:border border-gray-300 rounded-lg">
        <div className="flex items-center lg:h-full px-10 pt-16 lg:pt-0">
          <form onSubmit={handleSubmit} className="w-full space-y-8 relative">
            <div className="absolute top-0 left-0">
              <Link to={`/`} className="capitalize text-lg text-gray-700 hover:text-main transition-all">
                trang chủ
              </Link>
            </div>
            <div className="flex items-center justify-center text-center space-x-3 mb-20">
              <span className="text-3xl font-semibold text-gray-700">Regiter</span>
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
                errorMessage={errorMessages[input.name]}
                className="bg-yellow-200 text-lg placeholder:text-sm lg:bg-white border lg:border-2 border-gray-400 rounded-[12px] lg:border-gray-300 w-full p-3 outline-none focus:border-gray-400 active:border-gray-400"
              />
            ))}
            <div className="w-full lg:w-4/5 mx-auto flex items-center justify-between">
              <label className="text-gray-800 tracking-wide flex items-center space-x-2 select-none">
                <input type="checkbox" name="" id="" />
                <span className="block text-gray-800 tracking-wide">Remember me</span>
              </label>
              <Link to={`/${path.LOGIN}`} className="text-gray-800 tracking-wide inline-block border-b border-gray-300">
                You have account
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
Regiter.propTypes = {};

export default Regiter;

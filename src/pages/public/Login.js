import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import path from "../../until/path";
import FormInput from "../../components/FormInput";
import * as apiUser from "../../apis/user";
import { useDispatch } from "react-redux";
import { setUser } from "../../app/slices/user";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    const rs = await apiUser.login(values);
    // console.log(rs);
    if (rs?.sucess) {
      Swal.fire("Login Success", rs?.msg, "success")
        .then(() => {
          dispatch(setUser({ token: rs?.token, data: rs.data }));
        })
        .then(() => {
          navigate(`/${path.HOME}`);
        });
    } else {
      Swal.fire("Login Fail", rs?.msg, "error");
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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
// return (
//   <div className="bg-yellow-100 flex items-center justify-center lg:h-screen">
//     <div className="login-container container w-full lg:w-2/5 lg:bg-white h-screen lg:h-screen-75 lg:border border-gray-300 rounded-lg flex flex-wrap lg:flex-nowrap flex-col lg:flex-row justify-between group">
//       {/* <Link to={`${path.HOME}`} className="text-lg capitalize text-gray-500  font-medium text-l">Trở về trang chủ</Link> */}
//       <div className="w-full">
//         <div className="flex items-center lg:h-full px-10 pt-16 lg:pt-0">
//           <div className="w-full space-y-5">

//             {/* <!-- form caption --> */}

//             <div className="form-element">
//               <label className="space-y-2 w-full lg:w-4/5 mx-auto">
//                 <span className="block text-lg text-gray-800 tracking-wide">Email</span>
//                 <span className="block">
//                   <input
//                     type="text"
//                     className="bg-yellow-100 lg:bg-white border lg:border-2 border-gray-400 lg:border-gray-200 w-full p-3 focus:outline-none active:outline-none focus:border-gray-400 active:border-gray-400"
//                   />
//                 </span>
//               </label>
//             </div>
//             {/* <!-- form element --> */}

//             <div className="form-element">
//               <label className="space-y-2 w-full lg:w-4/5 mx-auto">
//                 <span className="block text-lg text-gray-800 tracking-wide">Password</span>
//                 <span className="block">
//                   <input
//                     type="password"
//                     className="bg-yellow-100 lg:bg-white border lg:border-2 border-gray-400 lg:border-gray-200 w-full p-3 focus:outline-none active:outline-none focus:border-gray-400 active:border-gray-400"
//                   />
//                 </span>
//               </label>
//             </div>
//             {/* <!-- form element --> */}

//             {/* <!-- form element --> */}

//             <div className="form-element">
//               <span className="w-full lg:w-4/5 mx-auto ">
//                 <input
//                   type="submit"
//                   className="cursor-pointer border-2 border-yellow-200 w-full p-3 bg-yellow-200 focus:outline-none active:outline-none focus:bg-theme-yellow active:bg-theme-yellow hover:bg-theme-yellow transition-all"
//                 />
//               </span>
//             </div>
//             {/* <!-- form element --> */}
//           </div>
//         </div>
//         {/* <!-- form wrapper --> */}
//       </div>
//       {/* <!-- Login Form End--> */}
//     </div>
//   </div>
// );
// };

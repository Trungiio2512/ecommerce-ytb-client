import React, { useState } from "react";
import PropTypes from "prop-types";
import icons from "../../until/icon";
import { FormInput } from "../../components";
const { ImLocation2, MdEmail, AiFillPhone } = icons;

const Contact = (props) => {
  const [values, setvalues] = useState({
    fisrtName: "",
    lastName: "",
    email: "",
    msg: "",
  });

  //   const inputs = [
  //     { id: 1, name: "fisrtName", placeholder: "Họ", require: true },
  //     { id: 2, name: "lastName", placeholder: "Tên", require: true },
  //     { id: 3, name: "email", type: "email", placeholder: "Email", require: true },
  //     { id: 4, name: "msg", placeholder: "Tin nhắn", require: true },
  //   ];
  return (
    <div className="flex justify-center my-10">
      <div className="space-y-5">
        <h2 className="text-xl uppercase font-semibold text-third text-center">Liên hệ với chúng tôi</h2>
        <div className="w-full space-y-5">
          {" "}
          <div className="flex sm:flex-row max-sm:flex-col max-sm:items-start items-center gap-5">
            <div className="flex items-center gap-3">
              <span className="p-3 rounded-full bg-main text-white">
                <ImLocation2 size={20} />
              </span>
              <span className="text-sm text-third font-medium">Kiến Thuỵ - Hải Phòng</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="p-3 rounded-full bg-main text-white">
                <ImLocation2 size={20} />
              </span>
              <span className="text-sm text-third font-medium">Email: snakecaplia@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="p-3 rounded-full bg-main text-white">
                <ImLocation2 size={20} />
              </span>
              <span className="text-sm text-third font-medium">+84: 0122322311</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex max-sm:flex-col flex-row w-full gap-5">
              <div className="w-full flex flex-col gap-2">
                <label className="text-sm text-gray-700">Họ đệm</label>
                <input
                  className="flex-1 outline-none border border-gray-400 rounded-lg px-5 py-2  text-third focus:border-blue-300"
                  value={values?.fisrtName}
                  name="fisrtName"
                  onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="text-sm text-gray-700">Tên</label>
                <input
                  className="flex-1 outline-none border border-gray-400 rounded-lg px-5 py-2  text-third focus:border-blue-300"
                  value={values?.lastName}
                  name="lastName"
                  onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-sm text-gray-700">Email</label>
              <input
                className="flex-1 outline-none border border-gray-400 rounded-lg px-5 py-2  text-third focus:border-blue-300"
                value={values?.email}
                name="email"
                onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
              />
            </div>
            <div className="w-full  gap-2">
              <label className="text-sm text-gray-700">Tin nhắn</label>
              <textarea
                className="outline-none border border-gray-400 rounded-lg px-5 py-2 h-[150px] text-third focus:border-blue-300 w-full"
                value={values?.msg}
                name="msg"
                onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
              />
            </div>
            <button className="float-right max-w-[150px] w-full px-5 py-1 bg-main text-white rounded-lg active:brightness-125">
              Gửi
            </button>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

Contact.propTypes = {};

export default Contact;

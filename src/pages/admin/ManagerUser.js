import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllUser, upUser } from "../../apis/admin";
import { FormInput } from "../../components";
import { deleteUser } from "../../apis/admin";
import { toastMsg } from "../../until/toast";
import { useSelector } from "react-redux";

const ManagerUser = (props) => {
  const { userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const rs = await getAllUser();
      if (rs.sucess) {
        setUsers(rs.data);
        setLoading(false);
      }
    };
    fetchApi();
  }, [loading]);
  // console.log(users);
  const hanldeDeleteUser = async (id) => {
    if (userInfo._id !== id) {
      const rs = await deleteUser(id);
      if (rs?.sucess) {
        toastMsg(rs?.msg, "success");
        setLoading(true);
      } else {
        toastMsg(rs?.msg, "error");
      }
    } else {
      toastMsg("Cannot delete admin account", "warning");
    }
  };
  const hanldeBlockUser = async (id, hasBlock) => {
    if (userInfo._id !== id) {
      const rs = await upUser(id, { isBLocked: !hasBlock });
      if (rs?.sucess) {
        toastMsg(rs?.msg, "success");
        setLoading(true);
      } else {
        toastMsg(rs?.msg, "error");
      }
    } else {
      toastMsg("Cannot block admin account", "warning");
    }
  };
  return (
    <div className="w-full p-5">
      <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center mb-5">
        <h2 className="text-xl text-third font-medium sm:mb-0 mb-3">Manager User</h2>
        <FormInput
          className="outline-none border border-gray-300 px-5 py-2 hover:border-blue-300 "
          placeholder="Search..."
        />
      </div>

      <div className="relative hidden xl:block shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Blocked
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user) => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    key={user?._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user?.email}
                    </th>{" "}
                    <td className="px-6 py-4">{`${user?.firstName} ${user?.lastName}`}</td>
                    <td className="px-6 py-4">{user?.mobile}</td>
                    <td className="px-6 py-4">{user?.role}</td>
                    <td className="px-6 py-4">
                      {" "}
                      <button
                        className={`px-3 py-1 rounded-md text-white ${
                          user?.isBLocked ? "bg-red-400" : "bg-green-400"
                        }`}
                      >
                        {user?.isBLocked ? "Blocked" : "Active"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-3 py-1 bg-white text-third rounded-md active:bg-red-300"
                          onClick={() => hanldeDeleteUser(user?._id)}
                        >
                          Delete
                        </button>
                        <button
                          className={`${
                            !user?.isBLocked ? "bg-red-400" : "bg-green-400"
                          } px-3 py-1   rounded-md text-white`}
                          onClick={() => hanldeBlockUser(user?._id, user?.isBLocked)}
                        >
                          {!user?.isBLocked ? "Block" : "Active"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="block xl:hidden">
        <div className="grid-layout">
          <div className="row">
            {users.length > 0 &&
              users.map((user) => {
                return (
                  <div className="col l-6 s-6 c-12 mb-5" key={user?._id}>
                    <div
                      className="w-full text-white border-b p-5 dark:bg-gray-900 dark:border-gray-700"
                      key={user?._id}
                    >
                      <h3 className=" font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Email: {user?.email}
                      </h3>{" "}
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="">Name: {`${user?.firstName} ${user?.lastName}`}</span>
                        <span className="">Phone: {user?.mobile}</span>
                        <span className="">Role: {user?.role}</span>{" "}
                      </div>
                      <p className="flex items-center gap-2 mt-4">
                        <span>Status: </span>
                        <button
                          className={`px-3 py-1 rounded-md text-white ${
                            user?.isBLocked ? "bg-red-400" : "bg-green-400"
                          }`}
                        >
                          {user?.isBLocked ? "Blocked" : "Active"}
                        </button>
                      </p>
                      <div className="flex flex-col w-full sm:flex-row sm:items-center gap-2 mt-5">
                        <button
                          className="px-3 w-full py-1 bg-white text-third rounded-md active:bg-red-300"
                          onClick={() => hanldeDeleteUser(user?._id)}
                        >
                          Delete
                        </button>
                        <button
                          className={`${
                            !user?.isBLocked ? "bg-red-400" : "bg-green-400"
                          } px-3 py-1 w-full  rounded-md text-white`}
                          onClick={() => hanldeBlockUser(user?._id, user?.isBLocked)}
                        >
                          {!user?.isBLocked ? "Block" : "Active"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

ManagerUser.propTypes = {};

export default memo(ManagerUser);

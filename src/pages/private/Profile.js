import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FormInput } from "../../components";
import * as apiUsers from "../../apis/user";
const Profile = (props) => {
  const { isLoggedIn, token } = useSelector((state) => state.user);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchApi = async () => {
      const rs = await apiUsers.getInfo();
      if (rs?.sucess) {
        setLoading(false);
        setProfile(rs?.data);
      }
    };
    isLoggedIn && token && fetchApi();
  }, [isLoggedIn, token]);
  return (
    isLoggedIn &&
    token && (
      <div>
        <div className="mb-5">
          <h2 className="text-xl text-third">My Profile</h2>
          <p className="text-base text-gray-500">
            Manage profile information for account security{" "}
          </p>
        </div>
        <div className="flex md:flex-row flex-col-reverse gap-10 items-start">
          <div className="space-y-5 flex-1 w-full">
            {Object.entries(profile).map((ele, index) => {
              // if (ele < Object.entries(profile).length - 1) {
              return (
                index > 1 && (
                  <FormInput
                    label={ele[0]}
                    classNameLabel={"shrink-0 text-base text-third capitalize w-[100px] text-left"}
                    key={index}
                    className={
                      "outline-none bg-gray-200 text-third text-base px-5 py-2 w-full border border-gray-300 focus:border-blue-300 transition-all lg:max-w-[500px]"
                    }
                    value={ele[1]}
                    onChange={(e) => setProfile((prev) => ({ ...prev, [ele[0]]: e.target.value }))}
                  />
                )
              );
              // }
            })}
          </div>{" "}
          <div className="flex flex-col items-center gap-4 shrink-0">
            <figure className="w-[200px] shrink-0 h-[200px] border border-gray-300 p-5">
              <img
                src={
                  profile?.avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9jO1ey8-tvqc5C5dHVNX2D4aAkoKipwjqg&usqp=CAU"
                }
                alt=""
              />
            </figure>
            <button className="w-full border border-green-300 text-sm text-third capitalize px-5 py-2 active:bg-blue-200">
              choose image
            </button>
          </div>
        </div>
        <button className=" text-third uppercase italic text-center py-2 mt-8 border border-blue-500 bg-blue-200 active:border-rose-500 active:bg-rose-200 active:text-rose-400 w-full md:w-[160px]">
          Update profile
        </button>
      </div>
    )
  );
};

Profile.propTypes = {};

export default Profile;

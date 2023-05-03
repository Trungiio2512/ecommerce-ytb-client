import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import path from "../../until/path";
import Swal from "sweetalert2";

const VerifyEmail = (props) => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registers failed",
        footer: '<a href="">Why do I have this issue?</a>',
      }).then(() => {
        navigate(`/${path.LOGIN}`);
      });
    } else if (status === "sucess") {
      Swal.fire({
        icon: "success",
        title: "Oops...",
        text: "Successfully registered",
        // footer: '<a href="">Why do I have this issue?</a>',
      }).then(() => {
        navigate(`/${path.LOGIN}`);
      });
    }
  }, [status]);
  return <div className="w-screen h-screen">oppp</div>;
};

VerifyEmail.propTypes = {};

export default VerifyEmail;

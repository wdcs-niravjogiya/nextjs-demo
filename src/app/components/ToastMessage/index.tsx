import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { FormEvent, useEffect, useState } from "react";

interface ToastProps {
  className?: string;
}
const ToastMessage = () => {
  const notifySuccess = () => toast.success("API call successfull!");
  const notifyError = () => toast.error("API call failed!");
  return <ToastContainer />;
};

export default ToastMessage;

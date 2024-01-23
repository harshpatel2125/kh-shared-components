import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to show toast messages
export const showToast = (message: string) => {
  toast(message);
};

// Component for the ToastContainer
export const ToastifyContainer: React.FC = () => {
  return (
    <ToastContainer />
  );
};

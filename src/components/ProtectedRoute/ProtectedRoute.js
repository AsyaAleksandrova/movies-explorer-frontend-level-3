import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ ...props }) => {

  if (props.loggedIn) {
    return props.children
  } else {
    return (<Navigate to={'/'} />)
  }
};

export default ProtectedRoute; 
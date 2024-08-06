import React from "react";

const ErrorText = ({ show, text }: { show: boolean; text: string }) => {
  return <p className="text-sm text-red-500">{show && text}</p>;
};

export default ErrorText;

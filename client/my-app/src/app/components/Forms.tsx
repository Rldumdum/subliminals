import React, { useState } from "react";
import AuthForm from "./AuthForm";
import SignUpForm from "./SignUpForm";

const Forms = ({setIsAuth}: any) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const modalOpen = () => {
    setIsOpen(true);
  };
  const modalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <AuthForm modalOpen={modalOpen} modalClose={modalClose} setIsAuth={setIsAuth}/>
      <SignUpForm modalIsOpen={modalIsOpen} modalClose={modalClose} setIsAuth={setIsAuth}/>
    </>
  );
};

export default Forms;

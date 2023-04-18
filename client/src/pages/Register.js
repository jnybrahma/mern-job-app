import { useState, useEffect } from "react";
import { Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";

const initialState ={
  name: '',
  email: '',
  password: '',
  isMember: true

}

const Register = () => {
  return (
    <h1>
      Register
    </h1>
  )
}

export default Register

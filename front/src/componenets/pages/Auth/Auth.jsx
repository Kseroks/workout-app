import React, {useState} from 'react';
import Layout from "../../common/Layout/Layout";
import bgImage from "../../../images/auth-bg.png"
import Alert from "../../ui/Alert/Alert";
import Loader from "../../ui/Loader/Loader";
import Field from "../../ui/Field/Field";
import Button from "../../ui/Button/Button";
import styles from "./Auth.module.scss"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import {useMutation} from "react-query";
import {api} from "../../../api/api";

const Auth = () => {
  const {setIsAuth} = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [type, setType] = useState("Auth")
  const navigate = useNavigate()

  const successLogin = (token) => {
    setIsAuth(true)
    localStorage.setItem("token", token)
    setPassword("")
    setEmail("")
    navigate("/")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (type === "Auth") {
      auth()
    } else {
      register()
    }
  }

  const {
    mutate: register,
    isLoading,
    error,
  } = useMutation("Registration", () =>
    api({
      url: "/users",
      type: "POST",
      body: {email, password},
      auth: false
    }), {
    onSuccess(data) {
      successLogin(data.token)

    }
  })

  const {
    mutate: auth,
    isLoadingAuth,
    errorAuth,
  } = useMutation("Auth", () => api({
    url: "/users/login",
    type: "POST",
    body: {email, password},
    auth: false
  }), {
    onSuccess(data) {
      successLogin(data.token)

    }
  })
  return (
    <>
      <Layout bgImage={bgImage} heading={"Auth or Registration"}/>
      <div className={styles.wrapper}>
        {error && <Alert type={"error"} text={error}/>}
        {errorAuth && <Alert type={"error"} text={errorAuth}/>}
        {(isLoadingAuth || isLoading) && <Loader/>}
        <form onSubmit={handleSubmit}>
          <Field placeholder={"Enter Name"}
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
          />
          <Field placeholder={"Enter Password"}
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.wrapperBtn}>
            <Button text={"Sing in"} callBack={() => setType("Auth")}/>
            <Button text={"Sing up"} callBack={() => setType("Reg")}/>
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;

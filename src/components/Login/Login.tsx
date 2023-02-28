import { useState, useEffect, useRef } from "react";
import { useCreateLoginMutation } from "@/redux/services/users";
import validator from "validator";
import SignupInput from '@bhaskarj123/input-github';
import SignupButton from "@bhaskarj123/button-github";
import styles from '@/components/Login/Login.module.css';

const Login = () => {

  const isInitialMountEmail = useRef(0);
  const isInitialMountPassword = useRef(0);
  const isInitialMountLogin = useRef(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setValidEmail] = useState(true);
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const [isUserValid, setUserValid] = useState(true);
  const [createLogin, createLoginResult] = useCreateLoginMutation();

  const validateEmailData = (): void => {
    let emailValidFlag = validator.isEmail(email) ? true : false;

    setValidEmail(emailValidFlag);
  };

  const validatePasswordData = (): void => {
    if (password === "") {
      setPasswordEmpty(true);
    } else {
      setPasswordEmpty(false);
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }): void => {
    event.preventDefault();
    if (email !== "" && password !== "") {
      createLogin({ email: email, password: password });
    } else {
      validateEmailData();
      validatePasswordData();
    }
  };

  useEffect(() => {
    if(localStorage.getItem("UserData") !== null){
      window.open('/dashboard','_self');
    }
  },[]);

  useEffect(() => {
    if (isInitialMountEmail.current === 2) {
      validateEmailData();
    } else {
      isInitialMountEmail.current += 1;
    }
  }, [email]);

  useEffect(() => {
    if (isInitialMountLogin.current === 2) {
      
      if (createLoginResult.isSuccess === true) {

        localStorage.setItem("UserData",JSON.stringify(createLoginResult.data.response));
        window.open('/dashboard',"_self");

      } else if (createLoginResult.isError === true) {
        setUserValid(false);
      }
    } else {
      isInitialMountLogin.current += 1;
    }
  }, [createLoginResult]);

  useEffect(() => {
    if (isInitialMountPassword.current === 2) {
      validatePasswordData();
    } else {
      isInitialMountPassword.current += 1;
    }
  }, [password]);

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupImageContainer}>
        <img
          src="https://www.medianama.com/wp-content/uploads/2022/06/ales-nesetril-ex_p4AaBxbs-unsplash.jpg"
          alt="logo"
        />
      </div>
      <div className={styles.signupDetailsContainer}>
        <h1>CARD91</h1>
        <div className={styles.signupFormContainer}>
          <h3>LOGIN</h3>
          {!isUserValid && (
            <small className={styles.errorMessage}>Email or password incorrect</small>
          )}
          <form className={styles.loginForm}>
            <div className="form-floating mb-4">
              <SignupInput
                type="email"
                value={email}
                setInputValue={(event: {
                  target: { value: React.SetStateAction<string> };
                }) => {
                  setEmail(event.target.value);
                }}
              />
              {isValidEmail && (
                <label htmlFor="floatingInput">Email address</label>
              )}
              {!isValidEmail && (
                <label htmlFor="floatingInput" className={styles.errorMessage}>
                  Enter valid email address
                </label>
              )}
            </div>
            <div className="form-floating mb-5">
              <SignupInput
                type="password"
                value={password}
                setInputValue={(event: {
                  target: { value: React.SetStateAction<string> };
                }) => {
                  setPassword(event.target.value);
                }}
              />
              {!isPasswordEmpty && (
                <label htmlFor="floatingPassword">Password</label>
              )}
              {isPasswordEmpty && (
                <label htmlFor="floatingPassword" className={styles.errorMessage}>
                  Password cannot be empty
                </label>
              )}
            </div>
            <SignupButton handleSubmit={handleSubmit} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

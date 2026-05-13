import { useReducer } from "react";
import Logo from "./Logo";
import Header from "./Header";
import FormGroup from "./FormGroup";
import SubmitButton from "./SubmitButton";
import { SaveAccounts } from "../tools/tools";

const initinal = {
  id: crypto.randomUUID(),
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  password2: "",
  isAgreed: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "firstName":
      return { ...state, firstName: action.payload };
    case "lastName":
      return { ...state, lastName: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "password2":
      return { ...state, password2: action.payload };
    case "isAgreed":
      return { ...state, isAgreed: action.payload };
    default:
      throw new Error("Action Unknow");
  }
}

function Register({ dispatch, children }) {
  const [state, dispatchAccount] = useReducer(reducer, initinal);

  return (
    <div className="auth-form-side">
      <div className="auth-form-box">
        <Logo />
        <Header
          title={"✨ Create New Account ✨"}
          description={"Start New Journey with your smart home"}
          className={"auth-header"}
        />
        <AuthForm
          dispatch={dispatch}
          account={state}
          setAccount={dispatchAccount}
          children={children}
        />
      </div>
    </div>
  );
}

function AuthForm({ dispatch, account, setAccount, children }) {
  const { firstName, lastName, email, password, password2, isAgreed } = account;

  // function showError(message) {
  //   setAccount({ type: "error", payload: message });
  //   timeRef.current = setTimeout(() => {
  //     setAccount({ type: "restError", payload: "" });
  //     timeRef.current = null;
  //   }, 4500);
  // }

  function onHandleSubmit(e) {
    e.preventDefault();

    if (password !== password2)
      return dispatch({ type: "notification", payload: 201 });
    if (!isAgreed)
      return dispatch({
        type: "notification",
        payload: 202,
      });

    const newAccount = {
      account : {firstName,lastName,email,password,isAgreed},
      isActive: true,
      rooms: [],
      tempRooms: [],
      notification: false,
      statusKey: null,
    };

    SaveAccounts(newAccount);
    dispatch({ type: "createAccount", payload: newAccount });
    dispatch({ type: "notification", payload: 299 });
  }

  return (
    <form onSubmit={onHandleSubmit}>
      <FormRow>
        <FormGroup
          placeholder={"Muhammad"}
          value={firstName}
          setValue={(e) =>
            setAccount({ type: "firstName", payload: e.target.value })
          }
        >
          First Name
        </FormGroup>
        <FormGroup
          placeholder={"Abo Al-Hasan"}
          value={lastName}
          setValue={(e) =>
            setAccount({ type: "lastName", payload: e.target.value })
          }
        >
          Last Name
        </FormGroup>
      </FormRow>
      <FormGroup
        type="email"
        placeholder={"muhammad@gmail.com"}
        value={email}
        setValue={(e) => setAccount({ type: "email", payload: e.target.value })}
      >
        Email
      </FormGroup>
      <FormGroup
        type="password"
        placeholder={"*******************"}
        value={password}
        setValue={(e) =>
          setAccount({ type: "password", payload: e.target.value })
        }
      >
        Password
      </FormGroup>
      <FormGroup
        type="password"
        placeholder={"*******************"}
        value={password2}
        setValue={(e) =>
          setAccount({ type: "password2", payload: e.target.value })
        }
      >
        Confirm Password
      </FormGroup>
      <CheckBoxRow
        value={isAgreed}
        setValue={(e) =>
          setAccount({ type: "isAgreed", payload: e.target.checked })
        }
      />
      <SubmitButton>Create Account</SubmitButton>
      {/* <LoginModal>Login</LoginModal> */}
      {children}
    </form>
  );
}

function FormRow({ children }) {
  return <div className="form-row">{children}</div>;
}

function CheckBoxRow({ value, setValue }) {
  return (
    <label className="checkbox-row">
      <input type="checkbox" checked={value} onChange={setValue}></input>
      <span className="check-mark"></span>
      <span>
        I agree to the <a className="link-inline">Terms of Service</a> and{" "}
        <a className="link-inline">Privacy Policy</a>
      </span>
    </label>
  );
}

export default Register;

import { useReducer } from "react";

import Logo from "./Logo";
import Header from "./Header";
import FormGroup from "./FormGroup";
import SubmitButton from "./SubmitButton";

import { GetAccounts } from "../tools/tools";

const initinal = {
  email: "",
  password: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    default:
      throw new Error("Action Unknown");
  }
}

function Login({ account, dispatch, children }) {
  const [state, dispatchAccount] = useReducer(reducer, initinal);

  return (
    <div className="auth-form-side">
      <div className="auth-form-box">
        <Logo />
        <Header
          title={"Welcome Back Again👋"}
          description={"Login to reach your smart home"}
          className={"auth-header"}
        />
        <AuthForm
          account={account}
          dispatch={dispatch}
          state={state}
          dispatchAccount={dispatchAccount}
        />
        {children}
      </div>
    </div>
  );
}

function AuthForm({ dispatch, state, dispatchAccount: setAccount }) {
  const { email, password } = state;

  function onHandleSubmit(e) {
    e.preventDefault();

    const accounts = GetAccounts();

    const targetAccount = accounts.find(
      (acc) => acc.account.email === email && acc.account.password === password,
    );

    console.log(targetAccount);

    if (!targetAccount) {
      return dispatch({ type: "notification", payload: 205 });
    }

    const updatedAccounts = accounts.map((acc) => ({
      ...acc,
      isActive: acc.id === targetAccount.id,
    }));

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    dispatch({
      type: "login",
      payload: { ...targetAccount, isActive: true },
    });

    dispatch({ type: "notification", payload: 298 });
  }

  return (
    <form onSubmit={onHandleSubmit}>
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

      <SubmitButton>Login</SubmitButton>
    </form>
  );
}

export default Login;

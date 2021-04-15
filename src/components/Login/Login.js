import "./Login.css";
import { useContext, useState } from "react";
import logo from "../../image/logo2.png";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  handleLoggedIn,
  handleCreateUserWithEmailAndPassword,
  handleFbSignIn,
  handleGitSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
} from "./LoginManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const icon = <FontAwesomeIcon icon={faFacebook} />;

function Login() {
  const [newUser, setNewUser] = useState(false);
  console.log(newUser);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    error: "",
    isSignIn: true,
    success: false,
    isLoggedIn: false,
    isNewUser: false,
    isSignOut: false,
    photoURL: "",
    showError: false,
  });
  console.log(user.error);
  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleBlur = (e) => {
    let isValid = true;
    if (e.target.name === "email") {
      isValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      isValid = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/.test(e.target.value);
    }
    if (e.target.name === "rePassword") {
      isValid = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/.test(e.target.value);
    }
    // if (e.target.name === "name") {
    //   isValid = true;
    // }
    if (isValid) {
      const userInfo = { ...user };
      userInfo[e.target.name] = [e.target.value];
      setUser(userInfo);
      // if (userInfo.password[0] === userInfo.rePassword[0]) {
      //   isValid = true;
      // } else {
      //   const newErrors = { ...user };
      //   newErrors.error = "your password did not match";
      //   newErrors.showError = true;
      //   setLoggedInUser(newErrors);
      // }
      // setUser(userInfo);
    }
  };
  const handleCreateUser = (e) => {
    e.preventDefault();

    if ((user.name, user.email && user.password)) {
      handleCreateUserWithEmailAndPassword(
        user.name,
        user.email[0],
        user.password[0]
      ).then((res) => {
        setUser(res);
        setLoggedInUser(res);
        setNewUser(false);
        history.replace(from);
      });
    }
  };
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };
  const facebookSignIn = () => {
    handleFbSignIn().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };
  const gitHubSignIn = () => {
    handleGitSignIn().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      setUser(res);
      setLoggedInUser(res);
    });
  };

  const handleLogin = () => {
    handleLoggedIn(user.email[0], user.password[0]).then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  return (
    <div className="App">
      {/* <h1>{user.displayName}</h1>
      <h2>{user.email}</h2>
      <img src={user.photoURL} alt="" /> */}
      <div className="login-area">
        <div className="logo">
          <img src={logo} alt="image" />
        </div>
        <form onSubmit={handleCreateUser}>
          {newUser && (
            <input
              onBlur={handleBlur}
              className="input-field"
              type="text"
              placeholder="Name"
            />
          )}
          <br />
          <input
            onBlur={handleBlur}
            className="input-field"
            type="email"
            name="email"
            id=""
            placeholder="Email"
            required
          />
          <br />
          <input
            onBlur={handleBlur}
            className="input-field"
            type="password"
            name="password"
            id=""
            placeholder="Password"
            required
          />
          <br />
          {user.success && (
            <button onClick={handleLogin} className="submit-btn" type="submit">
              Login
            </button>
          )}

          {newUser && (
            <input
              onBlur={handleBlur}
              className="input-field"
              type="password"
              name="rePassword"
              id=""
              placeholder="Confirm Password"
              required
            />
          )}
          <br />
          {user.isSignIn ? (
            newUser ? (
              <input className="submit-btn" type="submit" value="Sign Up" />
            ) : (
              <button
                onClick={handleLogin}
                className="submit-btn"
                type="submit"
              >
                Login
              </button>
            )
          ) : (
            <button onClick={signOut} className="submit-btn">
              Sign Out
            </button>
          )}

          <br />

          <br />

          {newUser ? (
            <label
              onClick={() => setNewUser(false)}
              className="label"
              htmlFor=""
            >
              you already have an account?
            </label>
          ) : user.success ? (
            <p style={{ color: "green" }}>
              User {newUser ? "Created " : "Logged In"} Successfully{" "}
            </p>
          ) : (
            <label
              onClick={() => setNewUser(true)}
              className="label"
              htmlFor=""
            >
              are you new?
            </label>
          )}
        </form>
        {loggedInUser.showError && (
          <h4 style={{ color: "red" }}>{loggedInUser.error}</h4>
        )}
        {user.isSignOut && (
          <p style={{ color: "red" }}>
            Sign Out Successful! you may leave now!!!!!!
          </p>
        )}
      </div>
      <div className="signinwithother-btn">
        <button className="google-btn" onClick={googleSignIn}>
          {" "}
          <FontAwesomeIcon icon={faGoogle} /> Sign In With Google
        </button>
        <br />
        <button className="facebook-btn" onClick={facebookSignIn}>
          {" "}
          <FontAwesomeIcon icon={faFacebook} /> Sign In With Facebook
        </button>
        <br />
        <button className="github-btn" onClick={gitHubSignIn}>
          {" "}
          <FontAwesomeIcon icon={faGithub} /> Sign In With GitHub
        </button>
      </div>
    </div>
  );
}

export default Login;

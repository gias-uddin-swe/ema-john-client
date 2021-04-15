import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
};

const setUserToken = () => {
  firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
      sessionStorage.setItem("token", idToken);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const handleGoogleSignIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      const credential = res.credential;
      const token = credential.accessToken;
      const { displayName, email, photoURL } = res.user;
      const user = {
        name: displayName,
        email: email,
        photoURL: photoURL,
        success: true,
        error: "",
      };
      setUserToken();
      return user;
    })
    .catch((error) => {
      const errorMessage = error.message;
      const userInfo = {};
      userInfo.success = false;
      userInfo.error = errorMessage;
      userInfo.showError = true;
      return userInfo;
    });
};

export const handleFbSignIn = () => {
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((res) => {
      var credential = res.credential;
      var accessToken = credential.accessToken;

      const { displayName, email, photoURL } = res.user;
      const user = {
        name: displayName,
        email: email,
        photoURL: photoURL,
        success: true,
        error: "",
      };
      setUserToken();
      return user;
    })
    .catch((error) => {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // var email = error.email;
      // var credential = error.credential;
      // console.log("github error ", errorMessage, credential, email);
      const errorMessage = error.message;
      const userInfo = {};
      userInfo.success = false;
      userInfo.error = errorMessage;
      userInfo.showError = true;
      return userInfo;
    });
};

export const handleGitSignIn = () => {
  var ghProvider = new firebase.auth.GithubAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(ghProvider)
    .then((res) => {
      const credential = res.credential;
      const token = credential.accessToken;
      const { displayName, email, photoURL } = res.user;
      const user = {
        name: displayName,
        email: email,
        photoURL: photoURL,
        success: true,
        error: "",
      };
      setUserToken();
      return user;
    })
    .catch((error) => {
      const errorMessage = error.message;
      const userInfo = {};
      userInfo.success = false;
      userInfo.error = errorMessage;
      userInfo.showError = true;
      console.log(errorMessage);
      return userInfo;
      // ...
    });
};
// sign out

export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      // const userInfo = { ...user };
      const userInfo = {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        error: "",
        success: false,
        isLoggedIn: false,
        isNewUser: false,
        isSignOut: true,
        showError: false,
      };
      return userInfo;
      // console.log(user);
    })
    .catch((error) => {
      //   const signOutError = { ...user };
      //   signOutError.error = error.message;
      //   return signOutError;
    });
};

// create user

export const handleCreateUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const userInfo = res.user;
      userInfo.isSignIn = false;
      userInfo.error = "";
      userInfo.success = true;
      //updatUserName(name);
      // userInfo.newUser = true;
      return userInfo;
      //  setNewUser(false);
    })
    .catch((error) => {
      // const errorCode = error.code;
      const signInError = {};
      // signInError.error = error.message;
      signInError.success = false;
      signInError.showError = true;
      return signInError;
      // const errorMessage =
      // console.log(errorCode, errorMessage);
    });
};

// logged in area

export const handleLoggedIn = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const userInfo = res.user;
      userInfo.error = "";
      userInfo.success = true;
      return userInfo;
    })
    .catch((error) => {
      // const errorMessage = error.message;
      const loginError = {};
      loginError.error = error.message;
      loginError.success = false;
      loginError.showError = true;
      return loginError;
    });
};

const updatUserName = (name) => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
    })
    .then(function (res) {
      console.log("name  successfully", res);
    })
    .catch(function (error) {
      console.log(error);
    });
};

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVjdCLjHJpq-h3CB8ysdzRziMmFTPlK6c",
  authDomain: "weatherapp-3e197.firebaseapp.com",
  projectId: "weatherapp-3e197",
  storageBucket: "weatherapp-3e197.appspot.com",
  messagingSenderId: "924052430672",
  appId: "1:924052430672:web:95bfb5128ae24ee95ed655",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// function for signining in with email pwd
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// register a user
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.userCredential.user;
    console.log(user);
    //   const user = res.user;
    //   await addDoc(collection(db, "users"), {
    //     uid: user.uid,
    //     name,
    //     authProvider: "local",
    //     email,
    //   });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

//logout function
const logout = () => {
  signOut(auth);
};

export {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed up
//       const user = userCredential.user;
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });

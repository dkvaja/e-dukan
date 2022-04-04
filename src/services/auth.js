import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import config from "../envConfig";
import { auth } from "../firebase/config";
import { addUser } from "./database";

export const registerUser = ({ displayName, userType, email, password }) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, {
          displayName,
        });
        await addUser({
          displayName,
          userType,
          email,
          uid: user?.uid,
        });
        if (user && user?.emailVerified === false) {
          sendEmailVerification(auth?.currentUser, {
            url: config.BASE_URL,
          })
            .then(() => {
              alert("Please check your inbox and verify your email first!");
            })
            .catch(() => {
              reject(false);
            });
        }
      })
      .catch((error) => {
        resolve(error.message);
      });
  });
};

export const logInUser = ({ email, password }) => {
  return new Promise(async (resolve) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        if (user?.emailVerified === false) {
          sendEmailVerification(auth?.currentUser, {
            url: config.BASE_URL,
          })
            .then(() => {
              alert(
                `Verification link is sent to ${email} address. Please use this link to log in`
              );
            })
            .catch((error) => {
              resolve(false);
            });
        } else {
          resolve(true);
        }
      })
      .catch((error) => {
        resolve(false);
      });
  });
};

export const logOutUser = () => {
  return new Promise((resolve) => {
    signOut(auth)
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });
};

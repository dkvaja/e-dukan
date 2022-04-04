import { query, where, collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const userFromLocal = JSON.parse(localStorage.getItem("auth"));

export const listenToMyProfile = (callback) => {
  if (auth?.currentUser?.uid || userFromLocal?.uid) {
    const listenActivityQuery = query(
      collection(db, "users"),
      where("createdBy", "==", auth?.currentUser?.uid || userFromLocal?.uid)
    );
    return onSnapshot(listenActivityQuery, (querySnapshot) => {
      const activities = [];
      querySnapshot.forEach((doc) => activities.push(doc.data()));
      callback(activities[0]);
    });
  }
};

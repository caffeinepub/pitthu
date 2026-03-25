import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzvhGGsNdMhjnexyVy1lHtJoQP4m9qy_M",
  authDomain: "piyyhu.firebaseapp.com",
  projectId: "piyyhu",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

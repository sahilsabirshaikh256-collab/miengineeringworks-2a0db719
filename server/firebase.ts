import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFLp3dCFDEil3kp-VEzPsHMNS7DuQWCr4",
  authDomain: "mibo-c358b.firebaseapp.com",
  projectId: "mibo-c358b",
  storageBucket: "mibo-c358b.firebasestorage.app",
  messagingSenderId: "47473105953",
  appId: "1:47473105953:web:05bf66bc4f90983505d760",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export default app;

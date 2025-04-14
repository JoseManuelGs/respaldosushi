import { initializeApp } from "firebase/app.js";
import { getAuth } from "firebase/auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBSG9VrMxIdb3sDd0eyKoB6LIsLuj-cURA",
  authDomain: "ryu-sushi-e0d14.firebaseapp.com",
  projectId: "ryu-sushi-e0d14",
  storageBucket: "ryu-sushi-e0d14.firebasestorage.app",
  messagingSenderId: "183891321700",
  appId: "1:183891321700:web:457d0b6e9c876fdf639071",
  measurementId: "G-N8YV2D15C2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, app };

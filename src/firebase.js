import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyALd-MW-p7B2MKYzUT9oiGOFjPuKAami3Y",
  authDomain: "ecommerce-mima.firebaseapp.com",
  projectId: "ecommerce-mima",
  storageBucket: "ecommerce-mima.firebasestorage.app",
  messagingSenderId: "139422488671",
  appId: "1:139422488671:web:0a4ce63ee38cc7f994a3ea"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

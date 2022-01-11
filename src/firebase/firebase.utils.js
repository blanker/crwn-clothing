import {initializeApp} from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const config = {
  apiKey: "AIzaSyDq-IStQS9BXz7UUw1KApkDR06Dz5e4FMU",
  authDomain: "blankererer.firebaseapp.com",
  projectId: "blankererer",
  storageBucket: "blankererer.appspot.com",
  messagingSenderId: "265437218568",
  appId: "1:265437218568:web:6ef2c30bc2ff1cd375cebd"
};

initializeApp(config);

// export const firestore = new Firestore(config);
export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);


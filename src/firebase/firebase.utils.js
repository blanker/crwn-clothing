import {initializeApp} from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
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
export const firestore = getFirestore();
export const auth = getAuth();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, 'users', userAuth.uid);

  let userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
      });
      userDoc = await getDoc(userRef);
    } catch (error) {
      console.error('error creating user.', error.message);
    }
  }

  return userDoc;
};

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);


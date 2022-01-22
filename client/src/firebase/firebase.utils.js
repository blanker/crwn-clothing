import {initializeApp} from 'firebase/app';
import { getFirestore, doc, collection, setDoc, getDoc, writeBatch } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

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

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      id: doc.id,
      routeName: encodeURI(title.toLowerCase()),
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // const userCollectionRef = collection(firestore, 'users');
  // console.log('userCollectionRef', userCollectionRef);
  // const userCollectionSnapshot = getCollection(userCollectionRef);

  const userRef = doc(firestore, 'users', userAuth.uid);
  // const userRef = doc(firestore, 'users', '123456');
  // console.log('userRef', userRef);

  let userSnapshot = await getDoc(userRef);
  // console.log('userSnapshot', userSnapshot);

  if (!userSnapshot.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
      userSnapshot = await getDoc(userRef);
    } catch (error) {
      console.error('error creating user.', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(firestore, collectionKey);

  const batch = writeBatch(firestore);
  console.log('objectToAdd', objectToAdd);

  objectToAdd.forEach(element => {
    const newDocRef = doc(collectionRef);
    console.log('newDocRef', newDocRef, element);
    // addDoc(newDocRef, 'collection', element);
    batch.set(newDocRef, element);
  });
  // Commit the batch
  return await batch.commit();
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);


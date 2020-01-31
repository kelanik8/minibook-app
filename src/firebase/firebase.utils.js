import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firbaseConfig = {
    apiKey: "AIzaSyB9hq2N1pdryczcI8WxDD7vTbucwja5bfQ",
    authDomain: "jetpack-65330.firebaseapp.com",
    databaseURL: "https://jetpack-65330.firebaseio.com",
    projectId: "jetpack-65330",
    storageBucket: "jetpack-65330.appspot.com",
    messagingSenderId: "535592499820",
    appId: "1:535592499820:web:efd38efcaf55d30cee3649"
}

firebase.initializeApp(firbaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    console.log(additionalData);

    if(!snapshot.exists) {
        const { displayName, email, photoURL } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName, 
                email,
                createdAt,
                photoURL,
                ...additionalData
            });
        } catch(e) {
            console.error('error while creating user', e);
        }
    }
    return userRef;
}

export const authUserDocument = async (userAuth) => {
    return await firestore.doc(`users/${userAuth.uid}`).get();
}

export const updateUserProfileDocument = async (user, userData) => {
    if(!user.id) return;
    const userRef = firestore.doc(`users/${user.id}`);
    const snapshot = await userRef.get();
    if(snapshot.exists) {
        try {
            await userRef.set({
                ...user,
                ...userData
            });
        } catch(e) {
            console.error('error while creating user', e);
        }
    }
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWIthGoogle = () => auth.signInWithPopup(provider)

export default firebase;
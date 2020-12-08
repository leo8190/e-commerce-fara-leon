import firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp(
  {
    apiKey: "AIzaSyCHh0c2Qclbk44Ld9qXSDl_cZvT_aYz9_A",
    authDomain: "e-commerce-fara-leon.firebaseapp.com",
    projectId: "e-commerce-fara-leon",
    storageBucket: "e-commerce-fara-leon.appspot.com",
    messagingSenderId: "663368671162",
    appId: "1:663368671162:web:325d1b465fba2e793c8783",
    measurementId: "G-XZWBL3SH0T"
  }
)

//para llamar a la BBDD
export const getFirestore = () => {
  return firebase.firestore();
}

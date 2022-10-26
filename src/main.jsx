import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  getDocs,
  doc,
  getDoc,
  getDocFromCache,
} from 'firebase/firestore';
import { collection, query, where } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCNTynWnkDWPC75XF7TQPCf8XlSVHXRy9k',
  authDomain: 'lolchamps-a2f93.firebaseapp.com',
  projectId: 'lolchamps-a2f93',
  storageBucket: 'lolchamps-a2f93.appspot.com',
  messagingSenderId: '287474855460',
  appId: '1:287474855460:web:1de76c4677f3729bc3b2b1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dbase = getFirestore(app);

const checkDB = async (champName, db = dbase) => {
  const docRef = doc(db, 'champs', champName);
  try {
    const doc = await getDoc(docRef);

    return doc.data();
  } catch (e) {
    console.log('Error getting cached document:', e);
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App checkDB={checkDB} />
  </React.StrictMode>
);

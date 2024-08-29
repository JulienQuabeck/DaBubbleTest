import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore, collection, doc, addDoc, updateDoc } from "firebase/firestore";
import { User } from '../../models/user.class';

const firebaseConfig = {
  apiKey: "AIzaSyBalnejD2crnu2sjHyM2khNvC8qCg67FOQ",
  authDomain: "dabubbletest.firebaseapp.com",
  projectId: "dabubbletest",
  storageBucket: "dabubbletest.appspot.com",
  messagingSenderId: "902656407981",
  appId: "1:902656407981:web:13aeeca884cecfb253c924"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(private firestore: Firestore) { }

  getUserRef(){
    return collection(this.firestore, 'user');
  }

  getSingleUserRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  async addUser(item: {}) {
    await addDoc(this.getUserRef(), item).catch(
      (err) => {
        console.error(err);
      }
    ).then(
      (docRef) => {
        console.log("Document written with ID: ", docRef?.id);//colID
        this.addingdocRefToUser(item, docRef?.id);
      }
    )
  }

  async addingdocRefToUser(item: any, docId: any) {
    item.id = docId;
    await updateDoc(this.getSingleUserRef("users", docId), item).catch(
      (err) => { console.log(err); }
    )
  }

  setUserObject(obj: any): User {
    return {
      id: obj.id || "",
      name: obj.name || "",
      nachname: obj.nachname || "",
      email: obj.email ||"",
      passwort: obj.passwort || "",
    }
  }

}


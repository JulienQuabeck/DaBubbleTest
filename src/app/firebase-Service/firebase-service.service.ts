import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore, collection, doc, addDoc, updateDoc, query, where, getDocs } from "firebase/firestore";
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

  private firestore: Firestore;

  constructor() {
    this.firestore = firestore;
  }

  /**
   * This function returns the UserRef from Firebase
   * @returns UserRef from Firebase
   */
  getUserRef() {
    return collection(this.firestore, 'user');

  }

  /**
   * This function returns the DocRef from Firebase
   * @param colId id of the collection
   * @param docId id of the document
   * @returns the docId / docRef
   */
  getSingleUserRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  /**
   * This function adds a new User to the Firebase
   * @param item the Document / the userdata
   */
  async addUser(item: {}) {
    await addDoc(this.getUserRef(), item).catch(
      (err) => {
        console.error(err);
      }
    ).then(
      (docRef) => {
        // console.log("Document written with ID: ", docRef?.id);//colID
        this.addingdocRefToUser(item, docRef?.id);
      }
    )
  }

  /**
   * This function adds the automatically cenerated id from firebase to the userdoc
   * @param item the Document / the userdata
   * @param docId the generated docRef
   */
  async addingdocRefToUser(item: any, docId: any) {
    item.id = docId;
    await updateDoc(this.getSingleUserRef("user", docId), item).catch(
      (err) => { console.log(err); }
    )
  }

  /**
   * This function sets all given data to a structured user Object
   * @param obj userdata
   * @returns the user object
   */
  setUserObject(obj: any): User {
    return {
      id: obj.id || "",
      name: obj.name || "",
      nachname: obj.nachname || "",
      email: obj.email || "",
      passwort: obj.passwort || "",
    }
  }

  /**
   * This function checks, if the entered Email already exists in the firebase database or not.
   * @param email in the form entered Email
   * @returns true / false
   */
  async findUserWithEmail(email: string) {
    try {
      const q = query(this.getUserRef(), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (err) {
      console.error("Error checking email existence: ", err);
      return false;
    }
  }

  async getPasswort(email: string) {
    try {
      const q = query(this.getUserRef(), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const password = userData['passwort']; // Hier wird das Passwort abgerufen
        return password; // Gebe das Passwort zurück oder nutze es entsprechend
      }
      return !querySnapshot.empty;
    } catch (err) {
      console.error("Error checking email existence: ", err);
      return false;
    }
  }

  async verifyPassword(email:string, enteredPasswort: string){
    const password = await this.getPasswort(email);
    if (password == enteredPasswort) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * This function gets the name for the email the users wants to change the password for
   */
  async getName(){

  }

    /**
   * This function gets the surname for the email the users wants to change the password for
   */
  async getNachname(){

  }
}




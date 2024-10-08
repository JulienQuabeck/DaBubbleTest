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

  async gettingQuery(email: string) {
    const q = query(this.getUserRef(), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }

  /**
   * This function checks, if the entered Email already exists in the firebase database or not.
   * @param email in the form entered Email
   * @returns true / false
   */
  async findUserWithEmail(email: string) {
    try {
      // const q = query(this.getUserRef(), where("email", "==", email));
      // const querySnapshot = await getDocs(q);     
      const querySnapshot = await this.gettingQuery(email);
      return !querySnapshot.empty;
    } catch (err) {
      console.error("Error checking email existence: ", err);
      return false;
    }
  }

  /**
   * This functions returns the UserId regarding to the given Email
   * @param email written email (in change Passwort section)
   * @returns the userId in Firebase
   */
  async getUserId(email: string) {
    let querySnapshot = await this.gettingQuery(email);
    if (!querySnapshot.empty) {
      let userId = await querySnapshot.docs[0].data()['id'];
      return userId;
    }
  }

  /**
   * This function reads the password from the firebase database and returns it to the calling function
   * @param email given variable
   * @returns the password
   */
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

  /**
   * This function checks, if the written passwords is similar to the saved one in the firebase database
   * @param email  given variable
   * @param enteredPasswort written password
   * @returns true or false
   */
  async verifyPassword(email: string, enteredPasswort: string) {
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
  async getName(name: string) {
    try {
      const q = query(this.getUserRef(), where("name", "==", name));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const name = userData['name']; // Hier wird der name abgerufen
        return name; // Gebe den namen zurück oder nutze es entsprechend
      }
      return !querySnapshot.empty;
    } catch (err) {
      console.error("Error checking name existence: ", err);
      return false;
    }
  }

  /**
 * This function gets the surname for the email the users wants to change the password for
 */
  async getNachname(nachname: string) {
    try {
      const q = query(this.getUserRef(), where("nachname", "==", nachname));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const nachname = userData['nachname']; // Hier wird der nachname abgerufen
        return nachname; // Gebe den nachnamen zurück oder nutze es entsprechend
      }
      return !querySnapshot.empty;
    } catch (err) {
      console.error("Error checking nachname existence: ", err);
      return false;
    }
  }

  async updatePasswort(user: User) {
    await updateDoc(this.getSingleUserRef("user", user.id), this.getCleanJson(user)).catch(
      (err) => { console.log(err); });

  }

  getCleanJson(user: User): {} {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      nachname: user.nachname,
      passwort: user.passwort,
    }
  }
}




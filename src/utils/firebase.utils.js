const {initializeApp} = require('firebase/app')

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQuypTztzt8hmBEvMj8_UpdoWbV58uIMc",
    authDomain: "vistr-capstone.firebaseapp.com",
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://vistr-capstone-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "vistr-capstone",
    storageBucket: "vistr-capstone.appspot.com",
    messagingSenderId: "797622115263",
    appId: "1:797622115263:android:ad3720bf0a8ab5edea5f0a",
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    // measurementId: "G-MEASUREMENT_ID",
  };

const app = initializeApp(firebaseConfig);

module.exports = app
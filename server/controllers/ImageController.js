  // Set the configuration for your app
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDHYUPVErpZwbyzjS7tQ0ClD5G80YVsueU",
    authDomain: "abundant-edd87.firebaseapp.com",
    databaseURL: "https://abundant-edd87.firebaseio.com",
    projectId: "abundant-edd87",
    storageBucket: "abundant-edd87.appspot.com",
    messagingSenderId: "61831058909",
    appId: "1:61831058909:web:25cbd99915cab40f9dd234"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();
var config = {
    apiKey: "AIzaSyAJ5uGKkRw0nZBMKnTj4xLFm0kZUrrZAn4",
    authDomain: "petinder-tis.firebaseapp.com",
    databaseURL: "https://petinder-tis.firebaseio.com",
    projectId: "petinder-tis",
    storageBucket: "petinder-tis.appspot.com",
    messagingSenderId: "528792032770"
};

firebase.initializeApp(config);

var db = firebase.firestore();
var auth = firebase.auth();
var stor = firebase.storage();

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC76US95N7402_Y2ZMjhB2NEkR8w2OAUlM",
    authDomain: "school-room-63f2a.firebaseapp.com",
    databaseURL: "https://school-room-63f2a-default-rtdb.firebaseio.com",
    projectId: "school-room-63f2a",
    storageBucket: "school-room-63f2a.appspot.com",
    messagingSenderId: "878694396384",
    appId: "1:878694396384:web:119e616162a29831a47b85"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var username = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + username + "!"

function addRoom() {
    roomname = document.getElementById("room_name").value;
    firebase.database().ref("/").child(roomname).update({
        purpose: "adding-room"
    });
    localStorage.setItem("roomname", roomname);
    window.location = "school_page.html"
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("Room Name" + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });
}
getData();

function redirectToRoomName(name) {
    console.log(name)
    localStorage.setItem("Roomname", name);
    window.location = "school_page.html";
}

function logout() {
    window.location = "index.html"
}
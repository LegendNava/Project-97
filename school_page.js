function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("Roomname");
    window.location = "index.html";
}

//YOUR FIREBASE LINKS
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

room_name = localStorage.getItem("Roomname");
user_name = localStorage.getItem("user_name");

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                console.log(firebase_message_id);
                console.log(message_data);
                names = message_data['name'];
                message = message_data['message'];
                likes = message_data['like'];
                name_with_tag = "<h4>" + names + "<img src='tick.png' class='user_tick'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value =" + likes + " onclick='updatelike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + likes + "</span></button><hr>";
                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}
getData();

function send() {
    var msg = document.getElementById("msg").value;
    console.log(msg);
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = " ";
}

function updatelike(message_id) {
    console.log("Like Button Clicked" + message_id);
    button_id = message_id;
    likes1 = document.getElementById(button_id).value;
    updatedlikes = Number(likes1) + 1;
    console.log(updatedlikes);
    console.log(likes);
    firebase.database().ref(room_name).child(message_id).update({
        like: updatedlikes
    });
}
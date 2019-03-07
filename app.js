// Initialize Firebase
var config = {
    apiKey: "AIzaSyDmv5bJQfvvNVATjvtbyAW8uYBAQ88uk4g",
    authDomain: "time-sheet-8e5d2.firebaseapp.com",
    databaseURL: "https://time-sheet-8e5d2.firebaseio.com",
    projectId: "time-sheet-8e5d2",
    storageBucket: "time-sheet-8e5d2.appspot.com",
    messagingSenderId: "906722987411"
  };
  firebase.initializeApp(config);

// ==========================================================================

var database = firebase.database();

// Initial Values
var name = "";
var role = "";
var startDate = "";
var monthsWorked = "";
var monthlyRate = "";
var totalBilled = "";

$("#submit").on("click", function (event) {
    // Prevents page refresh
    event.preventDefault();

    // Capturing values of input fields
    name = $("#nameInput").val().trim();
    role = $("#roleInput").val().trim();
    start = moment().format($("#startInput").val().trim(), "MM/DD/YYYY");
    rate = $("#rateInput").val().trim();
    console.log("New Employee added:");
    console.log(name);
    console.log(role);
    console.log(start);
    console.log(rate);
    console.log("============================================");

    // Storing input field values in database
    database.ref().push({
        name: name,
        role: role,
        startDate: start,
        monthsWorked: moment(start).fromNow(),  // need to somehow save months
        monthlyRate: rate,
        totalBilled: parseInt(rate) * parseInt(moment(start).fromNow())
    })

    // Code in {} runs every time a child is added
    database.ref().on("child_added", function (snapshot) {
        // Creating elements to display data on page
        var tRow = $("<tr>");
        var nameTD = $("<td>");
        var roleTD = $("<td>");
        var startTD = $("<td>");
        var monthsTD = $("<td>");
        var rateTD = $("<td>");
        var totalTD = $("<td>");

        // Adding input values to the table elements
        nameTD.text(snapshot.val().name);
        roleTD.text(snapshot.val().role);
        startTD.text(snapshot.val().startDate);
        monthsTD.text(snapshot.val().monthsWorked);
        rateTD.text(snapshot.val().monthlyRate);
        totalTD.text(snapshot.val().totalBilled);
        tRow.append(nameTD);
        tRow.append(roleTD);
        tRow.append(startTD);
        tRow.append(monthsTD);
        tRow.append(rateTD);
        tRow.append(totalTD);
        $("tbody").append(tRow);
    });

});

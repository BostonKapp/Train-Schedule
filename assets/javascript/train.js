
  // Initialize Firebase
  // Could not get the users inpt to actually post to the page, I had a problem linking it to the firebase web

  var config = {
    apiKey: "AIzaSyBf87E4zr1_e7bmnTrY4E5LQm9rY3B3nQE",
    authDomain: "train-schedule-634c1.firebaseapp.com",
    databaseURL: "https://train-schedule-634c1.firebaseio.com",
    projectId: "train-schedule-634c1",
    storageBucket: "train-schedule-634c1.appspot.com",
    messagingSenderId: "513111606911"
  };

  firebase.initializeApp(config);


  var database = firebase.database();



  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = moment($("#frequency-input").val().trim(), "MM/DD/YYYY").format("mm");
    var arrival = $("#arrival-input").val().trim();
    var minAway = moment($("#min-away-input").val().trim(), )
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      train: trainName,
      place: trainPlace,
      speed: trainSpeed,
      next: nextTrain,
      away: howFar
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.train);
    console.log(newTrain.place);
    console.log(newTrain.speed);
    console.log(newTrain.next);
    console.log(newTrain.away);
   
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#arrival-input").val("");
    $("#min-away-input").val("");
  });

  // 
  
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var trainPlace = childSnapshot.val().place;
    var trainSpeed = childSnapshot.val().speed;
    var nextTrain = childSnapshot.val().next;
    var howFar = childSnapshot.val().away;
  
    // Train Info
    console.log(trainName);
    console.log(trainPlace);
    console.log(trainSpeed);
    console.log(nextTrain);
    console.log(howFar);
  
  
    var empStartPretty = moment.unix(trainPlace).format("MM/DD/YYYY");
  
    // Calculate how far the train is
    
    var howFar = moment().diff(moment(nextTrain, "X"), "months");
    console.log();
  
    // Calculate the when the next train is coming
    var nextTrain = howFar * trainSpeed;
    console.log(nextTrain);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainPlace),
      $("<td>").text(trainSpeed),
      $("<td>").text(nextTrain),
      $("<td>").text(howFar),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });




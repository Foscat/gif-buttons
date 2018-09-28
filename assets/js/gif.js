//Make a app that has sevral buttons at the top that when pressed clear all previous gif and displays gifs associated with that tag

//Make a input bar so that users can input new animals which makes buttons that go to the top of the screen along with the others

//Gifs must start out static and when clicked do they animate

//Develop all buttons and gifs that appear in js using arrays and for loops making the html markup basic

var people = [
  "puppies", "kittens", 'mia khalifa', "paint",
   "fence", "school", "bully", "gandalf", "rave",
  "burrito", "eat pant", "yoga pants", "workaholics",
  "corndogs", "disturbing", "party", "laxatives",
  "cable guy", "epic fail", "schwifty"
];
nameCount = 0;



//Get source info from giphy API
$(document).on("click", "button", function() {
    var person = $(this).attr("data-person");
   
    
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=2P4Am3JiMqyMkTDMeKLxWRyAoCsIDkhy&limit=10&tag=trending";
    

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;
        $("#people-gifs").empty();
        console.log(response.data);

        for (var i = 0; i < results.length; i++) {

          //makes each gif a ivdividual div with the class name of gif
          var gifDiv = $("<div>");
          gifDiv.attr({
            "class": "gif-div",
          });
          
          //gets rating value for result
          var rating = results[i].rating;

          //creates a p tag tied to the rating for the gif
          var p = $("<p>").text("Rating: " + rating);

          //generates a image tag inside the div that is the gif
          //displays a still of the gif
          var peopleImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
          //setting attributes for still and animate
          peopleImage.attr({
            "data-state": 'still',
            "data-still":  response.data[i].images.fixed_height_still.url,
            "data-animate": response.data[i].images.fixed_height.url
          })
          
          //attaches rating to the end of the div
          gifDiv.prepend(p);

          //attaches the imageDiv to the main div
          gifDiv.prepend(peopleImage);
          
          $("#people-gifs").prepend(gifDiv);

        }
        
        
      });
     

  });

  $(document).on("click", "img", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log(this);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  function renderButtons() {

    // Delete the content inside the people-gifs div prior to adding new movies
     $("#people-gifs").empty();
     $("#people-tags").empty();
    // (this is necessary otherwise you will have repeat buttons)

    // Loop through the array of movies, then generate buttons for each movie in the array
    for(i=0; i<people.length; i++){
     var Person = $("<button>").text(people[i]);
     
     //attach the attribute of data-person to Person
     Person.attr("data-person", people[i]);
     
     //put new button at the end othe other buttons
     $("#people-tags").append(Person);
     
      
    };

  };


  // This function handles events where the add movie button is clicked
  $("#add-person").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();

    // Write code to grab the text the user types into the input field
    var newPerson = $("#person-input").val().trim();

     //Write code to add the new person into the people array
    people.push(newPerson);
    var name = $("<p>");
    console.log("new person " + newPerson);

    name.attr("id", "item-" + nameCount++);
    name.text(newPerson);
    console.log("Name " + name);
    

    // The renderButtons function is called, rendering the list of movie buttons
    renderButtons();
  });

 // When the individual gif is clicked it changes its state from still to animate and vice versa

  


  
 

  // Calling the renderButtons function to display the initial list of movies
  renderButtons();

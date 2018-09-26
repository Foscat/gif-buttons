//Make a app that has sevral buttons at the top that when pressed clear all previous gif and displays gifs associated with that tag

//Make a input bar so that users can input new animals which makes buttons that go to the top of the screen along with the others

//Gifs must start out static and when clicked do they animate

//Develop all buttons and gifs that appear in js using arrays and for loops making the html markup basic

var people = [
  "puppies", "kittens", 'mia khalifa', "paint",
  "yorkies", "fence", "school", "bully", "fidget spinner",
  "burrito", "eat pant", "cat breading", "yoga pants",
  "corndogs", "disturbing", "party", "laxatives",
  "cable guy", "epic fail", "other guys", "planking"
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
        

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");
          gifDiv.attr({"class": "gif"});
          

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var peopleImage = $("<img>");
          peopleImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(peopleImage);
          

          $("#people-gifs").prepend(gifDiv);
        }

        
      });

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
     console.log(Person);
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

 

  // Calling the renderButtons function to display the initial list of movies
  renderButtons();

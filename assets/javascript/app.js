var topics = ['Austin Powers','This is Spinal Tap','Happy Gilmore','Ace Ventura: Pet Detective','Spaceballs','Finding Nemo','Superbad','The Hangover','Toy Story','The LEGO Movie','Shaun of the Dead','Ghostbusters','Office Space',"Wayne's World",'The Big Lebowski','Zoolander'];

//--------END OF GLOBAL VARIABLES	

function createButton(text){
	$('#buttonsList').append('<button type="button" class="btn btn-primary buttonList">' + text + '</button>')
};

function ArrayToButtons (){
	for (i=0; i<topics.length; i++){
		createButton(topics[i]);
	};//function that prints keywords array to DOM in the form of <buttons>
};

function gifSwitch(){//function that toggles the gif to opposite state, i.e. still->animated or animated->still
	$('body').on('click','img',function(){//when img tag in the DOM is clicked ...
		var currentSrc = $(this).attr("src"); //capture current src
		var altSrc = $(this).attr("data-alt-src");//capture alternative src in data-* attr (opposite of current gif state, so if gif is animated this will be the URL to still, etc ...)
		$(this).attr('src', altSrc);//switch current src to alternative src
		$(this).attr('data-alt-src', currentSrc);//switch alternative src to current src
		currentSrc = $(this).attr("src");//reassign current src attr
		altSrc = $(this).attr("data-alt-src");//reassign current data-* attr
	});
};

function gifGen(){
	$('.buttonList').on('click',function(){//when a button is clicked ...
		$('.gifBox').empty();//empty rows incase content is there
		var buttonKeyword = $(this).text();//store button text in var for search keyword in API on next line:
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonKeyword + "&api_key=dc6zaTOxFJmzC&limit=10";//search in API with previously stored keyword

		$.ajax({//jquery ajax method
	      	url: queryURL,//push previously stored API url
	      	method: "GET"
	    	}).done(function(response) {
	    		console.log(buttonKeyword);//log current keyword
	    		for (i=0; i<10; i++){//loop through API object to get 20 URLS (10 stills and 10 animated)
	    			var gifSrc = response.data[i].images.fixed_height_still.url;//capture still URL
	    			var gifAltSrc = response.data[i].images.fixed_height.url;//capture animated URL
	    			var gifRating = response.data[i].rating;//capture rating of gif
	      			$('.gifBox').append("<div class='col-md-6'><img src=" + gifSrc + " data-alt-src=" + gifAltSrc + "><p class='rating'>Rating: " + gifRating + "</p></div>");//append new rows each with an <img> with a src attr that is the still URL and a data-* attr that is the animated URL. Also, print the gif's rating below it in <p>
	      		};
	    	});
	});//function that generates gifs to page when keyword <button> is clicked.
};

function newButton(){//function for creating a new functional button from the user's input
	$('.addButton').click( function(){//when green 'add' button is clicked ...
		event.preventDefault();//prevent browser from refreshing
		var newTitle = $('input').val().trim();//capture user input with trim method to clear white space
		if (newTitle === ""){//if input is empty, no new button is created
			return;
		};
		topics.push(newTitle);//add new title to topics array
		$('#buttonsList').empty();//empty section so new buttons can be published
		ArrayToButtons();//republish buttons with newly submitted buttons
		gifGen();//generate gifs from which button is clicked (if this isn't here, new buttons won't work)
		$('form')[0].reset();//clear input to display placeholder text
	})
	
};

	//--------END OF GLOBAL FUNCTIONS

$(document).ready(function() {
	console.log('Theme is Comedies');//print to console the theme of the gifs

	//push buttons from a keywords array immediately at .ready
	ArrayToButtons();

	//When the user clicks on a button, the page should grab 10 static, non-animated gif images...
		//...from the GIPHY API and place them on the page.
	gifGen();

	//When the user clicks one of the still GIPHY images, the gif should animate... 
		//...If the user clicks the gif again, it should stop playing.
	gifSwitch();

	//When user adds a new title for a button, add new button to current list of buttons:
	newButton();

	//----------------------------------------------------------------END OF SCRIPT	
});
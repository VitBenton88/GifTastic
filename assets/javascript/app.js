var keywords = ['Dumb & Dumber','This is Spinal Tap','Old School','Ace Ventura: Pet Detective','The 40-Year-Old Virgin','Superbad','The Hangover','Harold & Kumar Go to White Castle','The LEGO Movie','Shaun of the Dead','Ghostbusters','Office Space',"Wayne's World",'The Big Lebowski','Zoolander'];

//--------END OF GLOBAL VARIABLES	

function createButtons (){
	for (i=0; i<keywords.length; i++){
		$('#buttonsList').append('<button type="button" class="btn btn-primary">' + keywords[i] + '</button>')
	};
};
	
	//--------END OF GLOBAL FUNCTIONS

$(document).ready(function() {

	//push buttons from a keywords array immediately at load
	createButtons();

	//When the user clicks on a button, the page should grab 10 static, non-animated gif images...
		//...from the GIPHY API and place them on the page.

	$('button').on("click",function(){
		$('.row').empty();
		var buttonKeyword = $(this).text();
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonKeyword + "&api_key=dc6zaTOxFJmzC&limit=10";
		$.ajax({
	      	url: queryURL,
	      	method: "GET"
	    	}).done(function(response) {
	    		console.log(buttonKeyword);
	    		for (i=0; i<10; i++){
	      			$('.row').append("<div class='col-md-3'><img src=" + response.data[i].images.fixed_height_still.url + "></div>");
	      		};
	    	});
	});

	//When the user clicks one of the still GIPHY images, the gif should animate... 
		//...If the user clicks the gif again, it should stop playing.

	$('img').on("click",function(){

	});

	//Under every gif, display its rating (PG, G, so on).


	//----------------------------------------------------------------END OF SCRIPT	
});
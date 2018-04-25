

const GET_PAGE_IDS = "https://en.wikipedia.org/w/api.php?action=query&aplimit=5&list=allpages&apfrom=";
const GET_OPEN_SEARCH = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
const GET_CONTENT_V1 = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&formatversion=2&titles=";              
const GET_CONTENT_V2 = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&rvparse=1&titles=";              
const GET_CONTENT_V3 = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=";

//$(document).ready(function(){
//	$(".search-icon").click(function(){
//		let userInput = select(".search-box");
//		userInput.changed(goToWiki);
//		goToWiki(userIput.value())
//	})

$(document).ready(function(){
	
	$(".search-icon").click(function(){
		let userInput = $(".search-box").val();
		doWiki(userInput);
		console.log(userInput);

	});

	$(".search-box").on('keypress',function(event){
    	if (event.which === 13){

    		let userInput = $(".search-box").val();
    		doWiki(userInput);

    		event.preventDefault(); 
    		return false; 

    	}

    });
});



function doWiki(userInput) {
    let url = GET_OPEN_SEARCH + userInput;
    url += "&origin=*";
    url += "&format=json";
	console.log(url);
	try {
	    $.getJSON(url, handleSearch, 'jsonp');
	}
	catch(err) {
	    console.log(err);
	}
	// console.log("Finieshed");

	    
}

function handleSearch(data) {

	    let respData = JSON.stringify(data[1]);
	    let introOnly = true;
	    console.log(respData);
	    $("#searches").text(respData);

	    let chosenArticle = data[1][0]; //Just take the first one
	    chosenArticle = chosenArticle.replace(/\s+/g, "_");

	    let url = GET_CONTENT_V3 + chosenArticle;
	    url += "&origin=*";
	    url += "&format=json" ;

	    if (introOnly === true){
	        url += "&exintro=1";
	    }


	    $.getJSON(url, handleContents);
	}

function handleContents(data){

    let respData = JSON.stringify(data);
    

    let pageId = Object.keys(data.query.pages)[0];

    // let pageContent = data.query.pages[pageId].revisions[0].content; // Works with GET_CONTENT_V1
    // let pageContent = data.query.pages[pageId].revisions[0]["*"];    // Works with GET_CONTENT_V2
    let pageContent = data.query.pages[pageId].extract;                 // Works with GET_CONTENT_V3
    console.log(respData);
    // $("#contents").text(JSON.stringify(pageContent));
    $("#contents").html(JSON.stringify(pageContent));

}


// function setup() {
// 	let userInput = select(".search-box");
// 	userInput.changed(doWiki);
// }







//doWiki("Moose");


//&origin=*
// https://en.wikipedia.org/w/api.php?action=query&generator=allpages&gaplimit=4&gapfrom=T&prop=info
//https://en.wikipedia.org/w/api.php?action=query&list=allpages&apfrom=Kre&aplimit=5
//https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=jsonfm&formatversion=2&titles=Main%20Page
//https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Ch&format=json&exintro=1

//https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=Threadless&rvprop=content&format=json&rvsection=0&rvparse=1
//https://stackoverflow.com/questions/964454/how-to-use-wikipedia-api-if-it-exists





	
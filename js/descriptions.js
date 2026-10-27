//written tweets saved here
var written_tweets = [];

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	var tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
 
	written_tweets = tweet_array.filter(function(tweet) {
		return tweet.written;
	});
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	var searchBox = document.getElementById('textFilter');
	var table = document.getElementById('tweetTable');
 
	//empty search
	document.getElementById('searchCount').innerText = 0;
	document.getElementById('searchText').innerText = '';
 
	//pop up every character written
	searchBox.addEventListener('input', function(event) {
		var searchText = event.target.value;
		document.getElementById('searchText').innerText = searchText;
 
		//clear table before new search
		table.innerHTML = '';
 
		//empty search box and empty table
		if (searchText === '') {
			document.getElementById('searchCount').innerText = 0;
			return;
		}
 
		//filter 
		var matches = written_tweets.filter(function(tweet) {
			return tweet.writtenText.toLowerCase().includes(searchText.toLowerCase());
		});
 
		document.getElementById('searchCount').innerText = matches.length;
 
		//build all row, add to table
		var rows = '';
		for (var i = 0; i < matches.length; i++) {
			rows += matches[i].getHTMLTableRow(i + 1);
		}
		table.innerHTML = rows;
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});
function formatPct(ratio) {
	return math.format(ratio * 100, {notation: 'fixed', precision: 2}) + '%';
}

function setText(name, value) {
	var elems = document.querySelectorAll('#' + name + ', .' + name);
	for (var i = 0; i < elems.length; i++) {
		elems[i].innerText = value;
	}
}

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;
	if (tweet_array.length === 0) {
        return;
    }	
	var earliest = tweet_array[0].time;
	var latest = tweet_array[0].time;

	for (var i = 1; i < tweet_array.length; i++) {
		if (tweet_array[i].time < earliest) {
			earliest = tweet_array[i].time;
		}

		if (tweet_array[i].time > latest) {
			latest = tweet_array[i].time;
		}
	}
	var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    var earliestDate = earliest.toLocaleDateString('en-US', options);
    var latestDate = latest.toLocaleDateString('en-US', options);

	document.getElementById('firstDate').innerText = earliestDate;
    document.getElementById('lastDate').innerText = latestDate;

	var completed = 0, live = 0, achievement = 0, misc = 0;
	var writtenCount = 0;
 
	for (var i = 0; i < tweet_array.length; i++) {
		var source = tweet_array[i].source;
		if (source === 'completed_event') {
			completed++;
			if (tweet_array[i].written) {
				writtenCount++;
			}
		} else if (source === 'live_event') {
			live++;
		} else if (source === 'achievement') {
			achievement++;
		} else {
			misc++;
		}
	}
 
	var total = tweet_array.length;
 
	setText('completedEvents', completed);
	setText('completedEventsPct', formatPct(completed / total));
	setText('liveEvents', live);
	setText('liveEventsPct', formatPct(live / total));
	setText('achievements', achievement);
	setText('achievementsPct', formatPct(achievement / total));
	setText('miscellaneous', misc);
	setText('miscellaneousPct', formatPct(misc / total));

	setText('written', writtenCount);
	setText('writtenPct', formatPct(writtenCount / completed));
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
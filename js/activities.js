function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	var completed_tweets = tweet_array.filter(function(tweet) {
		return tweet.source === 'completed_event' && tweet.activityType !== 'unknown';
	});

	//count number of tweet in each activity
	var activity_counts = {};
	for (var i = 0; i < completed_tweets.length; i++) {
		var type = completed_tweets[i].activityType;
		if (activity_counts[type] === undefined) {
			activity_counts[type] = 0;
		}
		activity_counts[type]++;
	}
	
	//change to array to sort and graph it
	var activity_array = Object.keys(activity_counts).map(function(type) {
		return {activityType: type, count: activity_counts[type]};
	});
	
	//most common to least
	activity_array.sort(function(a, b) {
		return b.count - a.count;
	});
 
	document.getElementById('numberActivities').innerText = activity_array.length;
	document.getElementById('firstMost').innerText = activity_array[0].activityType;
	document.getElementById('secondMost').innerText = activity_array[1].activityType;
	document.getElementById('thirdMost').innerText = activity_array[2].activityType;

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  }
	  //TODO: Add mark and encoding
	  ,
	  "transform": [
	    {"filter": "datum.activityType != 'unknown'"}
	  ],
	  "mark": "bar",
	  "encoding": {
	    "x": {"field": "activityType", "type": "nominal", "sort": "-y", "title": "Activity type"},
	    "y": {"aggregate": "count", "type": "quantitative", "title": "Number of tweets"}
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	var top_three = [activity_array[0].activityType, activity_array[1].activityType, activity_array[2].activityType];
 
	//Three most common activities
	var distance_data = completed_tweets.filter(function(tweet) {
		return top_three.indexOf(tweet.activityType) !== -1;
	}).map(function(tweet) {
		return {
			activityType: tweet.activityType,
			distance: tweet.distance,
			time: tweet.time
		};
	});
 
	// Graph 2
	distance_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "Distances of the three most tweeted-about activities by day of the week.",
	  "data": {
	    "values": distance_data
	  },
	  "mark": "point",
	  "encoding": {
	    "x": {"timeUnit": "day", "field": "time", "type": "ordinal", "title": "Day of the week"},
	    "y": {"field": "distance", "type": "quantitative", "title": "Distance (mi)"},
	    "color": {"field": "activityType", "type": "nominal", "title": "Activity type"}
	  }
	};
	vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});
 
	// Graph 3
	distance_vis_aggregated_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "Mean distances of the three most tweeted-about activities by day of the week.",
	  "data": {
	    "values": distance_data
	  },
	  "mark": "point",
	  "encoding": {
	    "x": {"timeUnit": "day", "field": "time", "type": "ordinal", "title": "Day of the week"},
	    "y": {"aggregate": "mean", "field": "distance", "type": "quantitative", "title": "Mean distance (mi)"},
	    "color": {"field": "activityType", "type": "nominal", "title": "Activity type"}
	  }
	};
	vegaEmbed('#distanceVisAggregated', distance_vis_aggregated_spec, {actions:false});
 
	// graph 2 - graph 3 button pressed
	var distanceVis = document.getElementById('distanceVis');
	var distanceVisAggregated = document.getElementById('distanceVisAggregated');
	var button = document.getElementById('aggregate');
 
	distanceVisAggregated.style.display = 'none';
 
	button.addEventListener('click', function() {
		if (distanceVisAggregated.style.display === 'none') {
			distanceVis.style.display = 'none';
			distanceVisAggregated.style.display = 'block';
			button.innerText = 'Show all activities';
		} else {
			distanceVis.style.display = 'block';
			distanceVisAggregated.style.display = 'none';
			button.innerText = 'Show means';
		}
	});
 
	document.getElementById('longestActivityType').innerText = 'bike';
	document.getElementById('shortestActivityType').innerText = 'walk';
	document.getElementById('weekdayOrWeekendLonger').innerText = 'weekends';
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
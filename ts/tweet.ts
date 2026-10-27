class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if (this.text.startsWith("Watch my")) {
            return "live_event";
        }
        if (this.text.startsWith("Achieved") || this.text.startsWith("I just set a goal")) {
            return "achievement";
        }
        if (this.text.startsWith("Just completed") || this.text.startsWith("Just posted")) {
            return "completed_event";
        }
        return "miscellaneous";
    }

    private parseWrittenText():string {
        var dashIndex = this.text.indexOf(" - ");
        if (dashIndex === -1) {
            return "";
        }
        var result = this.text.substring(dashIndex + 3);
 
        var linkIndex = result.indexOf("https://t.co/");
        if (linkIndex !== -1) {
            result = result.substring(0, linkIndex);
        }
        result = result.trim();
 
        if (result === "TomTom MySports Watch") {
            return "";
        }
        return result;
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        return this.parseWrittenText() !== "";
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return this.parseWrittenText();
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        var rest = this.text;
        if (rest.startsWith("Just completed ")) {
            rest = rest.substring("Just completed ".length);
        } else if (rest.startsWith("Just posted ")) {
            rest = rest.substring("Just posted ".length);
        }
        if (rest.startsWith("an ")) {
            rest = rest.substring(3);
        } else if (rest.startsWith("a ")) {
            rest = rest.substring(2);
        }
 
        // km or mi
        var spaceIndex = rest.indexOf(" ");
        var unit = rest.substring(spaceIndex + 1, spaceIndex + 3);
 
        var start = 0;
        var end = -1;
 
        if (unit === "km" || unit === "mi") {
            start = spaceIndex + 4;
            var withIndex = rest.indexOf(" with ");
            var dashIndex = rest.indexOf(" - ");
            if (withIndex !== -1 && (dashIndex === -1 || withIndex < dashIndex)) {
                end = withIndex;
            } else {
                end = dashIndex;
            }
        } else {
            end = rest.indexOf(" in ");
        }
 
        if (end === -1) {
            return "unknown";
        }
        return rest.substring(start, end);
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        var rest = this.text;
        if (rest.startsWith("Just completed ")) {
            rest = rest.substring("Just completed ".length);
        } else if (rest.startsWith("Just posted ")) {
            rest = rest.substring("Just posted ".length);
        }
        if (rest.startsWith("an ")) {
            rest = rest.substring(3);
        } else if (rest.startsWith("a ")) {
            rest = rest.substring(2);
        }
 
        //km or mi
        var spaceIndex = rest.indexOf(" ");
        var unit = rest.substring(spaceIndex + 1, spaceIndex + 3);
 
        if (unit !== "km" && unit !== "mi") {
            return 0;
        }
        var value = Number(rest.substring(0, spaceIndex));
        if (unit === "km") {
            value = value / 1.609;
        }
        return value;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}
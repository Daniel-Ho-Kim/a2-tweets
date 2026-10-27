--Readme document for *Daniel Ho Kim*, *danihk15@uci.edu*--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

*/10
- 3/3 Summarizing tweets
- 4/4 Identifying the most popular activities
- 3/3 Adding a text search interface

2. How long, in hours, did it take you to complete this assignment?
It took approximately 7-8 hours.


3. What online resources did you consult when completing this assignment? (list sites like StackOverflow or specific URLs for tutorials; describe queries to Generative AI or use of AI-based code completion)
IN4MATX 133 lecture slides and starter code.
Vega-Lite Example (https://vega.github.io/vega-lite/examples/): I referred to the examples that is shown in the site. I understand how to create a scatter plot and bar charts. 
Claude(https://claude.ai/new): 
Setting up my workspace (my visual studio had error in installing Transpiler: Install with npm install -g typescript and Live Server: Install with npm install -g live-server) in vscode, so I got help in debugging.
parseWrittenText: It suggested me to write this helper method, to separate user-written descriptions from automatically generated RunKeeper tweet text. In addition, I don't have to write same code in different part multiple times.   
Vega-Lite Visualization: It helped understand how to structure data for Vega-Lite and create different types of charts. I also asked questions about using aggregate to calculate and display average distances.
Live serach: I asked question about implementing a case-insensitive search feature using JavaScript. It helped me understand how to update the search results dynamically when the user types in the search box. The result get updated whenever each character written.

4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
I talked with Hyunbeen Han to compare the graph.


5. Is there anything special we need to know in order to run your code?
There is nothing special set up.
Compile the typescript with "tsc --p tsconfig.json" to generate js/tweet.js as written in the assignment instruction.
Then open the page with live-server.
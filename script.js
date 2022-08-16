// USing The DOM to Manipulate our code
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

//show Loading
function loading() {
    loader.hidden = false; //the "hidden" attribute is used to hide objects in our file
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
    
}


// Show New Quote
// Using Math.random which returns btw 0 and 1 and Math.floor which returns the largest number, we're going to wrap the math.random inside the math.floor function
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//  To check if author field is blank and replace it with 'unknown'
if (!quote.author) {
    authorText.textContent = 'Unknown';
} else {
    authorText.textContent = quote.author; // To just get the author and not the entire quote object
}

// Check the quote length to determine the styling.. Accessing the Css class
if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('long-quote');
}

//Set Quote, Hide Loader by calling the complete() function
    quoteText.textContent = quote.text; // To just get the text and not the entire object
    complete();
    // console.log(quote);
}

// Get Quotes From API
//Using Asynchronous fetch, try, catch: an asynchronous function can run at anytime idependently and it wont stop the browser from completing the loading of a page.
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl); //This means this constant won't be populated until it has some data fetched from API
        apiQuotes = await response.json(); // this means we are getting the JSON from our API as a response and we're turning that response into a JSON object
        // console.log(apiQuotes[10]);
        newQuote();
    } catch (error) {
    // Catch error here
    }
}

//  To Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();


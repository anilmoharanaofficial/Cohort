const newQuoteButton = document.querySelector(".new-quote");
const quote = document.querySelector(".quote");
const authorName = document.querySelector(".name");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");

// API URL
const api = "https://api.freeapi.app/api/v1/public/quotes/quote/random";

//Fetch Quotes
const quotes = async () => {
  try {
    const response = await fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Oppes, Something Went Wrong, Please Try Again");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const generateQuote = async () => {
  const { data } = await quotes();
  const { author, content } = data;

  quote.innerHTML = content;
  authorName.innerHTML = author;
};

// Generate New Quotes
newQuoteButton.addEventListener("click", generateQuote);

// Copy Quote
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quote.innerText);
});

// Share Quote
twitterBtn.addEventListener("click", () => {
  let url = `https://twitter.com/intent/tweet?url=${quote.innerText}`;
  window.open(url, "_blank");
});

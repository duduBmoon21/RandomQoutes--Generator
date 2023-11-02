import "./App.css";
import { useState, useEffect } from "react";

function getRandomQuote(quotes) {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    // fetch("https://type.fit/api/quotes")
 fetch("https://type.fit/api/quotes")  
      .then((res) => res.json())
      .then((json) => {
        setQuotes(json);
        setQuote(json[0]);
      });
  }, []);

  function getNewQuote() {
    setQuote(getRandomQuote(quotes));
  }

  return (
    <main>
      <h1>Day 2 Quote Generator</h1>
      <section className="card">
       
        <h3>
          <span>“</span>
          {quote?.text}
        </h3>
        <i>- {quote?.author}</i>
        <button onClick={getNewQuote} className="btn">New Quote</button>
      </section>
    </main>
  );
}

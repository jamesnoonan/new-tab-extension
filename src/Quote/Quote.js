import './Quote.css';
import { useEffect, useState } from 'react';

function Quote() {
  // const [quote, changeQuote] = useState({ quote: "My life amounts to no more than one drop in a limitless ocean. Yet what is any ocean, but a multitude of drops?", author: "David Mitchell"})
  const [quote, changeQuote] = useState({ quote: '', author: '' });

  // Get quote when component mounts
  useEffect(() => {
    fetch('https://quotes.rest/qod')
      .then((response) => response.json())
      .then((data) => changeQuote(data.contents.quotes[0]));
  }, []);

  return (
    <div className="quote-container">
      <h3 style={{ opacity: quote.quote === '' ? 0 : 1 }}>{quote.quote}</h3>
      <p style={{ opacity: quote.quote === '' ? 0 : 1 }}>{quote.author}</p>
    </div>
  );
}

export default Quote;

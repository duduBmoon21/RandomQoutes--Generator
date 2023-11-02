// import "./App.css";
// import { useState, useEffect } from "react";

// function getRandomQuote(quotes) {
//   return quotes[Math.floor(Math.random() * quotes.length)];
// }

// export default function App() {
//   const [quotes, setQuotes] = useState([]);
//   const [quote, setQuote] = useState(null);

//   useEffect(() => {
//     // fetch("https://type.fit/api/quotes")
//  fetch("https://type.fit/api/quotes")  
//       .then((res) => res.json())
//       .then((json) => {
//         setQuotes(json);
//         setQuote(json[0]);
//       });
//   }, []);

//   function getNewQuote() {
//     setQuote(getRandomQuote(quotes));
//   }

//   return (
//     <main>
//       <h1>Day 2 Quote Generator</h1>
//       <section className="card">
       
//         <h3>
//           <span>“</span>
//           {quote?.text}
//         </h3>
//         <i>- {quote?.author}</i>
//         <button onClick={getNewQuote} className="btn">New Quote</button>
//       </section>
//     </main>
//   );
// }

import React, { useState } from 'react'
import { Layout, Button, List } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

const config = {
  apiUrl: 'https://type.fit/api/quotes',
  repoUrl: 'https://github.com/ssokurenko/quotes-react-app'
}

const { Header, Content } = Layout

function App() {
  const [quotes, setQuotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const Quote = ({ text, author }) => {
    return (
      <span>
        <strong>{text}</strong> &nbsp; <span>{author}</span>
      </span>
    )
  }

  const getQuotes = () => {
    setQuotes([])
    setIsLoading(true)
    fetch(config.apiUrl)
      .then(function (response) {
        return response.json()
      })
      .then((data) => {
        setQuotes(data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }
  return (
    <Layout>
      <Header>
        <div className="container">
          <span className="site-logo">Inspirational Quotes</span>
        </div>
      </Header>
      <Content className="container">
        <List
          size="small"
          loading={isLoading}
          header={
            <Button
              onClick={() => getQuotes()}
              type="primary"
              icon={<DownloadOutlined />}
              disabled={isLoading}
              size="large">
              Fetch Quotes
            </Button>
          }
          footer={<a href={config.repoUrl}>Fork on Github</a>}
          bordered
          dataSource={quotes}
          renderItem={(quote) => (
            <List.Item>
              <Quote text={quote.text} author={quote.author} />
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  )
}

export default App




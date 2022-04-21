import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';
import 'tw-elements';
import Toggle from './components/ThemeToggle';
import { ThemeProvider } from './ThemeContext';
import Background from './components/Background';

const client = new ApolloClient({
  uri: 'https://tefmovies.herokuapp.com/graphql'
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <div class='dark:border-2 dark:border-hotstar dark:bg-hotstar'>
        <ThemeProvider>
      <Background>
        <App />
          </Background>
    </ThemeProvider>
        </div>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// ReactDOM.render(
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

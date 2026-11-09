import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'tw-elements';
import Toggle from './components/ThemeToggle';
import { ThemeProvider } from './ThemeContext';
import Background from './components/Background';
import { QueryClient, QueryClientProvider } from "react-query";
// const cache = new InMemoryCache();


// await persistCache({
//   cache,
//   storage: new LocalStorageWrapper(window.localStorage),
// });

// const client = new ApolloClient({
//   cache,
//   uri: 'https://tefmovies.herokuapp.com/graphql',
// })

// const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <div class='dark:border-2 dark:border-hotstar dark:bg-hotstar'>
        <ThemeProvider>
      <Background>
        <App />
          </Background>
          </ThemeProvider>
        </div>
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

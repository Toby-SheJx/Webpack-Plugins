import logo from './logo.svg';
import './App.css';

import mdHTML from "./README.md";
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const content = document.createElement("div");
    content.innerHTML = mdHTML;
    document.body.appendChild(content);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

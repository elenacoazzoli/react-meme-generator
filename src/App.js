import './App.css';
import { useState } from 'react';

function App() {
  const [upperText, setUpperText] = useState('');
  const [lowerText, setLowerText] = useState('');
  const [memeChoice, setMemeChoice] = useState('');

  return (
    <div className="App">
      <h1>Meme Generator</h1>
      <br />
      <div>
        <label htmlFor="memeList">Choose your favourite meme:</label>
        <br />
        <input
          id="memeList"
          list="memeOptions"
          onChange={(event) => setMemeChoice(event.target.value)}
        />
        <datalist id="memeOptions">
          <option value="bender" />
        </datalist>
        <br />
        <label htmlFor="upperText">Text:</label>
        <br />
        <input
          id="upperText"
          onChange={(event) => setUpperText(event.target.value)}
        />
        <br />
        <label htmlFor="lowerText">Lower text:</label>
        <br />
        <input
          id="lowerText"
          onChange={(event) => setLowerText(event.target.value)}
        />
        <br />
        <br />

        <button
          type="button"
          onClick={() => console.log(memeChoice + upperText + lowerText)}
        >
          Preview your meme
        </button>
        <p>{memeChoice}</p>
        <p>{upperText}</p>
        <p>{lowerText}</p>
      </div>
    </div>
  );
}

export default App;

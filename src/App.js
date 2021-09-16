import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [upperText, setUpperText] = useState('');
  const [lowerText, setLowerText] = useState('');
  const [memeChoice, setMemeChoice] = useState('');
  const [allOptions, setAllOptions] = useState([]);

  // Get all templates from the API and save all objects in allOptions array
  const getMemesTemplates = async () => {
    await axios
      .get('https://api.memegen.link/templates')
      .then((response) => {
        setAllOptions(response.data);
      })
      .catch((error) =>
        // handle error
        console.erro(error),
      );
  };

  // Executes getMemesTemplate function on page loading
  useEffect(() => {
    getMemesTemplates();
  });

  const previewMeme = () => {
    console.log(memeChoice + ' ' + upperText + ' ' + lowerText);
  };

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
          {allOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
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

        <button type="button" onClick={() => previewMeme()}>
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

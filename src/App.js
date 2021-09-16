import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from './Button';

function App() {
  const [upperText, setUpperText] = useState('');
  const [lowerText, setLowerText] = useState('');
  const [memeChoice, setMemeChoice] = useState('');
  const [allOptions, setAllOptions] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

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

  const previewMeme = async () => {
    setImageUrl(
      'https://api.memegen.link/images/' +
        memeChoice +
        '/' +
        upperText.replace(/ /g, '-') +
        '/' +
        lowerText.replace(/ /g, '-'),
    );
    await axios
      .get(imageUrl)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) =>
        // handle error
        console.error(error),
      );
  };

  async function downloadImage() {
    const image = await fetch(imageUrl);
    const imageBlob = await image.blob();
    const imagePath = URL.createObjectURL(imageBlob);

    const link = document.createElement('a');
    link.href = imagePath;
    link.download = memeChoice + '_' + upperText + '_' + lowerText;
    document.body.appendChild(link); // adds link at the end of the body
    link.click(); // clicks link and downloads
    document.body.removeChild(link); // removes link at the end of the body
  }

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

        <Button onClick={() => previewMeme()} text="Preview your meme" />
        <br />
        <br />

        <img alt="" src={imageUrl} width="500px" />
        <br />
        <br />
        <Button onClick={() => downloadImage()} text="Download your meme" />
      </div>
    </div>
  );
}

export default App;

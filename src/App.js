import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
      <h1
        css={css({
          color: '#9F84BD',
        })}
      >
        Meme Generator
      </h1>
      <div
        css={css({
          padding: 10,
          borderRadius: '3px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        <div
          css={css({
            margin: 'auto',
            padding: 20,
            backgroundColor: '#EFD0CA',
            borderRadius: '3px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          })}
        >
          <label htmlFor="memeList">Choose your favourite meme:</label>

          <input
            id="memeList"
            list="memeOptions"
            onChange={(event) => setMemeChoice(event.target.value)}
            css={css({
              padding: 10,
              margin: '10px 0',
              borderRadius: '8px',
              border: '0', // remove default border
              borderBottom: '2px solid #9F84BD',
            })}
          />

          <datalist id="memeOptions">
            {allOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </datalist>
          <br />
          <label htmlFor="upperText">Choose the upper text:</label>

          <input
            id="upperText"
            placeholder="Upper text"
            onChange={(event) => setUpperText(event.target.value)}
            css={css({
              padding: 10,
              margin: '10px 0',
              borderRadius: '8px',
              border: '0', // remove default border
              borderBottom: '2px solid #9F84BD',
            })}
          />
          <br />
          <label htmlFor="lowerText">Choose the lower text:</label>
          <input
            id="lowerText"
            placeholder="Lower text"
            onChange={(event) => setLowerText(event.target.value)}
            css={css({
              padding: 10,
              margin: '10px 0',
              borderRadius: '8px',
              border: '0', // remove default border
              borderBottom: '2px solid #9F84BD',
            })}
          />
          <br />

          <Button onClick={() => previewMeme()} text="Preview your meme" />
          <br />

          <Button onClick={() => downloadImage()} text="Download your meme" />
        </div>
        <br />
        <br />
        <div
          css={css`
            background-color: #eee;
          `}
        >
          <img alt="" src={imageUrl} width="500px" />
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}

export default App;

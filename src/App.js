import React from 'react';
import './App.css';
import anime from 'animejs/lib/anime.es.js';

/* This React JS app has been created from 2 different APIs to provide information on traditional Irish Music.
THe first API is from thesession.org and will randomly secure a tune from the top 50 most popular tunes on the site.
The second API will search for information on the selected tune using the Wikipedia Search API.
Author: @cbergen
CSS: tailwindcss.com
Credit for assitance for coding to: 
chatGPT https://openai.com/blog/chatgpt for general questions 
anime.js (https://animejs.com/) for the wikipedia result animation.
**/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tunes: [],
      currentTune: null,
      wikiResults: [],
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.fetchWikiResults = this.fetchWikiResults.bind(this);
  }

  async componentDidMount() {
    const url = 'https://thesession.org/tunes/popular?format=json&perpage=50';
    const response = await fetch(url);
    const data = await response.json();
    this.setState(
      {
        tunes: data.tunes,
        currentTune: data.tunes[0],
        loading: false,
      },
      () => {
        this.fetchWikiResults(data.tunes[0].name, data.tunes[0].type);
      }
    );
  }
//this function is used to fetch the wikipedia results for the selected tune by name ane tune type
  async fetchWikiResults(name, type) {
    const query = `${name} ${type}`;
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`;
    console.log('fetching wiki results for', name, type);
    const response = await fetch(url);
    const data = await response.json();
    const results = data.query.search.map((result) => ({
      ...result,
      snippet: result.snippet
        .replace(/<[^>]*>?/gm, '')
        .replace(/&quot;/gi, '"'),
    }));
    this.setState({ wikiResults: results.slice(0, 5) });
    console.log('wiki results', results);
  }

  handleButtonClick = () => {
    try {
      const { tunes } = this.state;
      if (tunes.length === 0) {
        throw new Error('No tunes to choose from');
      }
      const randomIndex = Math.floor(Math.random() * tunes.length);
      const randomTune = tunes[randomIndex];
      console.log('selected tune', randomTune.name);
      this.setState({ currentTune: randomTune }, () => {
        this.fetchWikiResults(randomTune.name, randomTune.type);
        anime({
          targets: '.wiki-result-animation',
          translateY: [100, 0],
          opacity: [0, 1],
          easing: 'easeOutQuad',
          duration: 800,
          delay: anime.stagger(100),
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { loading, currentTune, wikiResults } = this.state;

    return (
      <div
        id="root"
        className="bg-[#98AA9f] flex flex-col"
      >
        <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl mt-8 p-4 font-bold w-2/3 text-center dark-green bg-[#4D5D53] text-[#CEE1D5] rounded-lg">
          Traditional Irish Music Randomizer
        </h1>
        <h2 className="font-bold p-4 text-center">
          From the top 50 most popular tunes on{' '}
          <a className="text-blue-900 underline italic" href="thesession.org">
            The Session
          </a>
          , one of the most widely-used sites for traditional irish music
        </h2>
        <button 
          className="dark-green bg-[#4D5D53] hover:bg-black text-[#CEE1D5] font-bold py-4 px-4 mb-4 border-2 border-black rounded"
          onClick={this.handleButtonClick}
        >
          Click here to Load Random Tune!
          </button>
        </div>
        {loading || !currentTune ? (
          <div id="loading">loading...</div>
        ) : (
          <div className=" flex flex-col ml-12 mr-12 lg:flex-row">
            <div className="dark-green bg-[#4D5D53] text-[#CEE1D5] mt-12 justify-center items-center text-center rounded-lg w-full p-4 lg:w-1/2 h-1/4 ">
              <h2 className="mr-12 ml-12 pt-4 text-4xl font-bold" id="display-current-tune">
                {currentTune.name}
              </h2>
              <p className="text-2xl font-semibold">
                Tune Type: {currentTune.type}
              </p>
              <p className="text-2xl font-semibold">
                Click this link to see the sheet music:{' '}
              </p>
              <p className=" pb-4">
                <a
                  className="text-2xl font-semibold underline text-blue-900 italic"
                  href={currentTune.url}
                >
                  {currentTune.name} on The Session
                </a>
              </p>
            </div>
            <div className=" text-[#CEE1D5] rounded-lg w-full lg:w-1/2">
              <h3 className="mr-8 ml-8 mb-4 mt-8 text-2xl text-center text-black font-bold">
                Everything you ever wanted to know about {currentTune.name}{' '}
                {currentTune.type} from Wikipedia:
              </h3>
              <ul className="ml-8 mr-8">
                {wikiResults.map((result) => (
                  <li
                    className="wiki-result-animation p-4 dark-green bg-[#4D5D53] text-[#CEE1D5] rounded-lg mb-8"
                    key={result.pageid}
                  >
                    <a
                      className="text-xl font-bold underline"
                      href={`https://en.wikipedia.org/wiki/${result.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.title}
                    </a>
                    <p>{result.snippet}...</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;

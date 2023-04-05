import React from 'react';
import './App.css';
import anime from 'animejs/lib/anime.es.js';

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
  // handleButtonClick = () => {
  //   const { tunes } = this.state;
  //   const shuffledTunes = [...tunes].sort(() => Math.random() - 0.5);
  //   const randomIndex = Math.floor(Math.random() * shuffledTunes.length);
  //   const randomTune = shuffledTunes[randomIndex];
  //   console.log('selected tune', randomTune.name);
  //   this.setState({ currentTune: randomTune }, () => {
  //     this.fetchWikiResults(randomTune.name, randomTune.type);

  //   });
  // };

  render() {
    const { loading, currentTune, wikiResults } = this.state;

    return (
      <div
        id="root"
        className="bg-[#98AA9f] flex flex-col justify-center items-center"
      >
        <h1 className="text-5xl mt-8 p-4 font-bold w-2/3 text-center bg-[#4D5D53] text-[#CEE1D5] rounded-lg">
          Traditional Irish Music Randomizer
        </h1>
        <h2 className="font-bold p-4">
          From the top 50 most popular tunes on{' '}
          <a className="text-blue-900 underline italic" href="thesession.org">
            The Session
          </a>
          , one of the most widely-used sites for traditional irish music
        </h2>
        <button
          className="bg-[#4D5D53] hover:bg-black text-[#CEE1D5] font-bold py-2 px-4 border border-black rounded"
          onClick={this.handleButtonClick}
        >
          Click here to Load Random Tune!
        </button>
        {loading || !currentTune ? (
          <div>loading...</div>
        ) : (
          <div className=" flex flex-col lg:flex-row">
            <div className="bg-[#4D5D53] text-[#CEE1D5] rounded-lg m-8 w-full lg:w-1/2 mr-8">
              <h2 className="pl-8 pt-4 text-4xl font-bold">
                {currentTune.name}
              </h2>
              <p className="pl-8 text-2xl font-semibold">
                Tune Type: {currentTune.type}
              </p>
              <p className="pl-8 text-2xl font-semibold">
                Click this link to see the sheet music:{' '}
              </p>
              <p className="pl-8 pb-4">
                <a
                  className="text-2xl font-semibold underline text-blue-900 italic"
                  href={currentTune.url}
                >
                  {currentTune.name} on The Session
                </a>
              </p>
            </div>
            <div className=" text-[#CEE1D5] rounded-lg mt-8 mr-8 w-full lg:w-1/2 ml-4">
              <h3 className="mr-12 ml-12 mb-4 text-2xl text-black font-bold justify-center items-center">
                Everything you ever wanted to know about {currentTune.name}{' '}
                {currentTune.type} from Wikipedia:
              </h3>
              <ul className="ml-4 mr-12">
                {wikiResults.map((result) => (
                  <li
                    className="wiki-result-animation p-4 bg-[#4D5D53] text-[#CEE1D5] rounded-lg mb-8"
                    key={result.pageid}
                  >
                    <a
                      className="text-xl font-bold underline"
                      href={`https://en.wikipedia.org/wiki/irishtune${result.title}`}
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

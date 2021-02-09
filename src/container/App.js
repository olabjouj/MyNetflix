import axios from 'axios';
import React, { Component } from 'react';
import SearchBar from '../componemts/search-bar';
import VideoList from '../container/video-list';
import VideoDetail from '../componemts/video-details';
import Video from '../componemts/videos';


const API_END_POINT = 'https://api.themoviedb.org/3/';
const POPULAR_MOVIE_URL = 'discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images';
const API_KEY = 'api_key=b1bb009f89a909c0ae0b65bc17104e0e';
const SEARCH_URL = 'search/movie?language=fr&include_adult=false';
const undefind = "undefined";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { movieList: {}, currentMovie: {}, noVideo: ''};
  }

  componentWillMount() {
    this.getAxiosRes();
  }

  getAxiosRes() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIE_URL}&${API_KEY}`).then(function (response) {
      this.setState({ movieList: response.data.results.slice(1, 6), currentMovie: response.data.results[0] }, function () {
        this.getVideoRes();
      });
    }.bind(this));
  }

  getVideoRes() {
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`).then(function (res) {
      if (res.data.videos && res.data.videos.results[0]) {
        const youtubeId = res.data.videos.results[0].key;
        let newCurrentMovie = this.state.currentMovie;
        newCurrentMovie.videoId = youtubeId;
        this.setState({ currentMovie: newCurrentMovie, noVideo: '' });
      } else {

        this.setState({ noVideo: 'Video indisponible !!!' });
      }
    }.bind(this));
  }
  onClickListItem(movie) {
    console.log('--------');
    console.log('----je suis le App grand parent----', movie);
    console.log('--------');
    this.setState({ currentMovie: movie }, () => {
      this.getVideoRes();
      this.setRecommandation();
    })

  }
  getsearchTexta(searchTexton) {

    axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchTexton}`).then(function (repondre) {
      if (repondre.data && repondre.data.results[0]) {
        if (repondre.data.results[0].id != this.state.currentMovie.id) {
          this.setState({ currentMovie: repondre.data.results[0] }, () => {
            this.getVideoRes();
            this.setRecommandation();
          })
        }
      }
      console.log('------------');
      console.log('-----JE SUIS DANS APP-------');
      console.log('------------');
      console.log('------MON TEXTSEARCH------', searchTexton);
    }.bind(this));

  }
  setRecommandation() {
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`).then(function (res) {
      console.log('------recomm---', res);
      this.setState({ movieList: res.data.results.slice(0, 6) });

    }.bind(this));
}

  render() {

    const rendMoviesList = () => {
      if (this.state.movieList.length >= 5) {
        return <VideoList movieList={this.state.movieList} callBack={this.onClickListItem.bind(this)} />
      }
    }
      const VideoIndispo = () => {
        if (this.state.noVideo != ''){
          return <h1>{this.state.noVideo}</h1>
      }
    
    }
  
    return (
      <div>
        <div className="search-bar">
          <SearchBar callBacka={this.getsearchTexta.bind(this)} />
        </div>
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId} />
            <VideoDetail title={this.state.currentMovie.title} overview={this.state.currentMovie.overview} date={this.state.currentMovie.release_date} />
            {VideoIndispo()}
          </div>
          <div className="col-md-4">
            {rendMoviesList()}
          </div>
        </div>
      </div>
    )
    
    }


}


export default App;

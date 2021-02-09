import React from 'react';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';



const VideoListItem = (props) => {

    const movie = props.movie;
    const urlImage = props.movie.poster_path;
    console.log('-------mes Liens des images---------', urlImage)
    return (
        
            <li className="list-group-left" onClick={handleClick}>
                <div className="media">
                    <div className="media-left">
                        <img width="100px" height="100px" classeName="media-object img-rounded" src={`${IMAGE_URL}${urlImage}`} />
                    </div>

                    <div className="media-body">
                        <li className="title-liste-item">  {movie.title} </li>
                    </div>
                </div>
            </li>
             )
            function  handleClick() {
                console.log('------------')
                console.log('------Je suis la ------', movie)
                console.log('------------')
                props.callBack(movie);


                
            }
        
   
}

export default VideoListItem;
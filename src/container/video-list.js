import React from 'react';
import VideoListItem from '../componemts/video-list-items';


const VideoList = (props) => {
    const movieList = props.movieList;
    console.log('--------ListVideo----------', movieList);
    return (
        <div>
            <ul>{
                movieList.map(movie => {
                    return <VideoListItem key={movie.id} movie={movie} callBack={recevoirFilm}/>
                })
            }

            </ul>
        </div>
    )
    function recevoirFilm(movie){
        console.log('--------------');
        console.log('-------je suis le parent -------', movie);
        console.log('--------------');
        props.callBack(movie);

    }

}

export default VideoList;
import React from 'react';


const VideoDetail = (props) => {
    const title = props.title;
    const overview = props.overview;
    const Date = props.date;
    return (
        <div>
            <h1>{title}</h1>
            <p>{overview}</p>
            <p> La date de sortie est : {Date}</p>
        </div>

    )
}

export default VideoDetail;
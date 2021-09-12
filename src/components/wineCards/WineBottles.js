
import React from "react";
import "./wineBottles.css";

function WineBottles() {
    return (
        <div id='wineBox'>
            <div id='img'>
                <img 
                src='../../../media/red/Rose-Fremur.jpeg'
                alt='wineee' 
                id='winePic'>
                </img>
            </div>
            <div id='wineFacts'>
                <h3 >
                    wine-title
                </h3>
                <p >
                    despcription
                </p>
                <p >
                    price :-
                </p>
            </div>
        </div>
    )
}

export default WineBottles;

import React, { useEffect, useState } from "react";
import "./wineBottles.css";
//import result from ../../../server/index.js

function WineBottles() {
    // const [bottles, setBottles] = useState();
    useEffect(() => {
        (async ()=> {
          console.log((await(await fetch('/api/products')).json()));
        })();
      }, []);

    return (
        
        <div id='wineBox'>
            
            {/* {handleGetJson()} */}
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

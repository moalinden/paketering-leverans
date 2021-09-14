import React, { useEffect, useState } from "react";
import "./wineBottles.css";
import { Image } from "react-bootstrap";
// import "../../media/red";

function WineBottles() {
    const [bottles, setBottles] = useState();
    useEffect(() => {
        (async ()=> {
          const wines = ((await(await fetch('/api/products')).json()));
            console.log(wines.products[2])
            setBottles(wines.products);
            return wines;
        })();
    }, []);

    return (
        <div className='container' id='systembolaget'>
            <div className='row'>
                {bottles != undefined  ? [ bottles.map(wine => (
                    <div className='col-1' id='wineBox' key={wine.id}>
                        {/* <div className='bildTest'>
                        </div> */}
                        <div id='bild'>
                        {/* {console.log(wine)} */}
                            <Image 
                            src={wine.imageUrl}
                            alt='wine and dinee' 
                            id='winePic'>
                            </Image>
                        </div>
                        <div id='wineFacts'>
                            <h3>
                                {wine.name}
                            </h3>
                            <p>
                                {wine.description}
                            </p>
                            <p>
                                {wine.price}
                            </p>
                        <button id='cartKnapp' type="button" placeholder="add to cart">
                            add to cart
                        </button>
                        </div>
                    </div>
                ))]: null}
                {/* {handleGetJson()} */}
                {/* {console.log(bottles)} */}
                
            </div>
        </div>
    )
}

export default WineBottles;

//import React from 'react'
//import {
//    favoriteProduct, removeWishList
//} from "../../redux/actions";
//import { useSelector, useDispatch } from "react-redux";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faHeart } from "@fortawesome/free-solid-svg-icons";
//import NoWishList from "./NoWishList";

//function WishList(data) {
//    //const userChoice = data.data;
//    const favoritesState = useSelector((state) => state.storeSlice);
//    const favorites = favoritesState.wishList;

//    const dispatch = useDispatch();
    
//    const saveToWishList = (wine) => {
//        dispatch(favoriteProduct(wine));
//        return true
//    };
//    const unfavoriteWine = (wine) => {
//        dispatch(removeWishList(wine));
//        return true
//    }

        
//    {
//        favorites.length === 0 ? (<NoWishList />) : favorites.map((wine, index) => {
//            return (
//                <div className="col-1" id="wineBox" key={index}>
//                <div id="bild">
//                    <img src={wine.imageUrl} alt="wine and dinee" id="winePic"></img>
//                </div>

//                <div id="wineFacts">
//                    <h3>{wine.name}</h3>
//                </div>
//                <div>

//                    {wine.isFavorite ? <FontAwesomeIcon icon={faHeart} onClick={() => unfavoriteWine(wine)} className="fav" color="red" />
//                        : < FontAwesomeIcon onClick={() => saveToWishList(wine)} icon={faHeart} />}
//                </div>
//            </div>

//            )
//        })
    

//    }
//}

//    export default WishList;

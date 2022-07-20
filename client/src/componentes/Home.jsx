import React from "react";
import Card from "./Cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import {getVideogames, filtradoXGenero, filterByCreate, orderByAsc, orderByRating} from "../actions/index"
import {Link} from "react-router-dom"
import Paginado from "./Paginado";
import SearchBar from "./SearchBar"


import styles from './Paginado.module.css'
import Styles from './Home.module.css'

export default function Home () {


const Dispatch = useDispatch ();
const AllVideogames = useSelector((state=>state.videogames));
const [orden, setOrden] = useState('')
const [currentPage, setCurrentPage] =useState(1);
const [videogamesPerPage, setVideogamesPerPage] = useState(15);
const indexOfLastVideogames = currentPage * videogamesPerPage; 
const indexOfFirstVideogames = indexOfLastVideogames - videogamesPerPage;
const currentVideogames = AllVideogames?.slice(indexOfFirstVideogames, indexOfLastVideogames);

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
};
useEffect(() => {
    Dispatch(getVideogames());
    },[Dispatch])

function handleClick(e) {
    e.preventDefault();
    Dispatch(getVideogames());
    }

function handleFilterByGenre(e){
    e.preventDefault();
    Dispatch(filtradoXGenero(e.target.value))
}

function handleFilterByCreate(e){
    e.preventDefault();
    Dispatch(filterByCreate(e.target.value))
}
function handlesort(e){
    e.preventDefault();
       Dispatch(orderByAsc(e.target.value))
       setCurrentPage(1);
       setOrden(`Ordenado ${e.target.value}`);
}
function handlesort2(e){
    e.preventDefault();
       Dispatch(orderByRating(e.target.value))
       setCurrentPage(1);
       setOrden(`Ordenado ${e.target.value}`);
}


    return(
        <div className={Styles.sf}>
            <h1 className={styles.letra}>APP DE VIDEOGAMES</h1>
            <br></br>
            <Link className={styles.btn} to="/videogames">Crea tu personaje</Link>
            <SearchBar/>
            <button className={styles.btn} onClick= {e=> handleClick(e)}>
            Refresh all videogames
            </button>
            <select className={styles.btn} onChange={e => handlesort(e)}>
                <option value="asc">ascendente</option>
                <option value="descendente">descendente</option>
            </select>
            <select className={styles.btn} onChange={e => handleFilterByCreate(e)}>
                <option value="Todos">todos</option>
                <option value="creadoDB">creados en DB</option>
                <option value="creadosAPI">Creados en la API</option>
            </select>
            <select className={styles.btn} onChange={e=> handlesort2(e)}>
                <option value="+/-">mejores Rankeados</option>
                <option value="-/+">peores Rankeados</option>
            </select>
            <select className={styles.btn} onChange={e=> handleFilterByGenre(e)}>
                <option value="Action">accion</option>
                <option value="Adventure">aventura</option>
                <option value="RPG">RPG</option>
                <option value="Puzzle">puzzle</option>
                <option value="Shooter">tiros</option>
                <option value="Platformer">platformer</option>
                <option value="Indie">indie</option>
                <option value="Massively multiplayer">multijugador</option>
                <option value="Sports">deportes</option>
                <option value="Racing">carreras</option>
                <option value="Simulation">simulacion</option>
                <option value="Arcade">arcade</option>
                <option value="Fighting">pelea</option>
                <option value="Strategy">estrategia</option>
                <option value="Casual">casual</option>
            </select>
            <Paginado
                    videogamesPerPage ={videogamesPerPage}
                    AllVideogames ={AllVideogames?.length}
                    paginado ={paginado}
                />
            { currentVideogames && currentVideogames.map(e=>{
            
            return(
            <div className={styles.container}>
            <Link className={styles.sub} to={"/Videogames/" + e.id}>
            <Card
            key={e.id}
            name= {e.name}
            released= {e.released}
            rating= {e.rating}
            platforms= {e.platforms}
            img= {e.img}
            genres= {e.genres}
            id= {e.id}
            />
            </Link>
            </div>
            )})}

        </div>
    )
};
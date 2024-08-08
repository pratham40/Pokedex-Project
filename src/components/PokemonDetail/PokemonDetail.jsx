import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import "./PokemonDetail.css"
function PokemonDetail() {

    const {id}=useParams()
    // console.log(id);
    const[pokemon,setPokemon]=useState({})
    async function downloadPokemon() {
        const response=await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        // console.log(response.data);
        setPokemon({
            name:response.data.name,
            image:response.data.sprites.other.dream_world.front_default,
            weight:response.data.weight,
            height:response.data.height,
            types:response.data.types.map((t)=>t.type.name)
        })
        // console.log(response.data.types)
        const s=response.data.types.map((t)=>t.type.name)
        console.log(s);
        
    }


    useEffect(()=>{
        downloadPokemon()
    },[])
    return (
        <div className="pokemon-detail-wrapper">  
            <div className="pokemon-name">
                name:{pokemon.name}
            </div>
            <img className="pokemon-image" src={pokemon.image} alt="" />

            <div className="features">
                Height:{pokemon.height}
            </div>
            <div className="features">
                weight:{pokemon.weight}
            </div>
            <div className="pokemon-types">
                {pokemon.types && pokemon.types.map((t)=> <div key={t}>{t}</div> )}
            </div>
        </div>
    )
}

export default PokemonDetail

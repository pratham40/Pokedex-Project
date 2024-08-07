import axios from 'axios'
import  { useEffect, useState } from 'react'
import "./PokemonList.css"
import Pokemon from '../Pokemon/Pokemon'
function PokemonList() {

    const PokemonUrl="https://pokeapi.co/api/v2/pokemon"

    const [pokemonList,setPokemonList] = useState([])

    const [isLoading,setIsLoading]=useState(true)

    async function downloadPokemon(){
        const response=await axios.get(PokemonUrl)  // download the list of 20 pokemon
        // console.log(response.data);
        const pokemonResult = response.data.results   // we get the array of pokemon result
        const pokemonResultPromise=pokemonResult.map((pokemon)=>axios.get(pokemon.url))  // iterating over the pokemon and using their url create array of promise that will download 20 pokemon
        // console.log(pokemonResultPromise)
        const pokemonData = await axios.all(pokemonResultPromise)  // passing the promise axios.all()  // array of 20 pokemon detailed data
        // console.log(pokemonData.data);

        const res=pokemonData.map((pokeData)=>{
            const pokemon=pokeData.data
            // console.log(pokemon.name);
            
            // console.log(pokemon.sprites.other.dream_world.front_default);
            
            // console.log(pokemon.types);
            return{
                id:pokemon.id,
                name:pokemon.name,
                image:pokemon.sprites.other.dream_world.front_default,
                types:pokemon.types
            }
        })
        console.log(res);
        setPokemonList(res)
        setIsLoading(false)
    }
    useEffect(()=>{
        downloadPokemon()   
    },[])

    return (
        <div className='pokemon-list-wrapper'>
            <div>Pokemon List</div>
            {(isLoading) ? 'Loading....':pokemonList.map((pokemon)=><Pokemon name={pokemon.name} image={pokemon.image} key={pokemon.id}/>)}
        </div>
    )
}

export default PokemonList

import axios from "axios";
import { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {
    // const [PokemonUrl, setPokemonUrl] = useState(
    //     "https://pokeapi.co/api/v2/pokemon"
    // );

    // const [pokemonList, setPokemonList] = useState([]);

    // const [isLoading, setIsLoading] = useState(true);

    // const [nextUrl, setNextUrl] = useState("");
    // const [prevUrl, setPrevUrl] = useState("");


    const[pokemonListState,setPokemonListState]=useState({
        pokemonList:[],
        isLoading:true,
        PokemonUrl:"https://pokeapi.co/api/v2/pokemon",
        nextUrl:"",
        prevUrl:""
    })
    async function downloadPokemon() {
        const response = await axios.get(pokemonListState.PokemonUrl); // download the list of 20 pokemon
        // setIsLoading(true)
        setPokemonListState((state)=>(
            {...state,isLoading:true}))


        // console.log(response);
        // setNextUrl(response.data.next);
        setPokemonListState((state)=>(
            {...state,nextUrl:response.data.next,prevUrl:response.data.previous}
        ))
        // console.log(prevUrl===null);
        // console.log(nextUrl);
        
        
        // console.log(response.data.next)

        // setPrevUrl(response.data.previous);
        const pokemonResult = response.data.results; // we get the array of pokemon result
        const pokemonResultPromise = pokemonResult.map((pokemon) =>
            axios.get(pokemon.url)
        ); // iterating over the pokemon and using their url create array of promise that will download 20 pokemon
        // console.log(pokemonResultPromise)
        const pokemonData = await axios.all(pokemonResultPromise); // passing the promise axios.all()  // array of 20 pokemon detailed data
        // console.log(pokemonData.data);

        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            // console.log(pokemon.name);

            // console.log(pokemon.sprites.other.dream_world.front_default);

            // console.log(pokemon.types);
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types,
            };
        });
        console.log(res);
        // setPokemonList(res);
        // setIsLoading(false);

        setPokemonListState((state)=>(
            {...state,pokemonList:res,isLoading:false})
        )

        console.log(pokemonListState.isLoading)
    }
    useEffect(() => {
        downloadPokemon();
    }, [pokemonListState.PokemonUrl]);

    return (
        <div className="pokemon-list-wrapper">
            <div>Pokemon List</div>
            <div className="pokemon-wrapper">
                {pokemonListState.isLoading
                    ? "Loading...."
                    : pokemonListState.pokemonList.map((pokemon) => (
                        <Pokemon
                            name={pokemon.name}
                            image={pokemon.image}
                            key={pokemon.id}
                            id={pokemon.id}
                        />
                    ))}
            </div>

            <div className="controls">
                <button
                    disabled={pokemonListState.prevUrl === null}
                    onClick={() => setPokemonListState((state)=>({...state,PokemonUrl:state.prevUrl}))}
                >
                    Prev
                </button>
                <button
                    disabled={pokemonListState.nextUrl === null}
                    onClick={() => setPokemonListState((state)=>({...state,PokemonUrl:state.nextUrl}))}
                > 
                    Next
                </button>
            </div>
        </div>
    );
}

export default PokemonList;

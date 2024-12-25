import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {

        const fetchPokemon = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=6");
            const data = await response.json();


            const pokemonDetails = await Promise.all(
                data.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url);
                    return await res.json();
                })
            );
            setPokemonList(pokemonDetails);
        };

        fetchPokemon();
    }, []);

    return (
        <div className="app">
            <div className="card-container">
                {pokemonList.map((pokemon) => (
                    <div className="card" key={pokemon.id}>
                        <img
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                            className="pokemon-image"
                        />
                        <h3>{pokemon.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
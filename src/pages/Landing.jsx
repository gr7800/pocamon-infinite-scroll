import React, { useState, useEffect } from 'react';
import { Box, Text, Input } from '@chakra-ui/react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Pagination from '../componets/Pagination';

const PAGE_SIZE = 10;

const Landing = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchPokemonData = async () => {
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * PAGE_SIZE}&limit=${PAGE_SIZE}`
            );
            setPokemonData(response.data.results);
            setTotalPages(Math.ceil(response.data.count / PAGE_SIZE));
        };

        fetchPokemonData();
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const filteredPokemonData = pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box p={4}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Pokemon API
            </Text>
            <Input
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                mb={4}
                bg={"aqua"}
            />
            <Box
                display="grid"
                gridTemplateColumns="repeat(2, 1fr)"
                gap={4}
                bg="coral"
                p={4}
                boxShadow="md"
            >
                {filteredPokemonData.map((pokemon) => (
                    <Box
                        key={pokemon.name}
                        textAlign="center"
                        boxShadow="lg"
                        borderRadius="lg"
                        overflow="hidden"
                        bg={"aqua"}
                    >
                        <LazyLoadImage
                            alt={pokemon.name}
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)}.png`}
                            effect="blur"
                            style={{ minWidth: '300px', height: 'auto', borderRadius: '50%', animation: 'spin 1s linear infinite' }}
                        />
                        <Text fontSize="lg" fontWeight="bold" mt={2}>{pokemon.name}</Text>
                    </Box>
                ))}
            </Box>


            {totalPages > 1 && (
                <Box mt={4} display="flex" justifyContent="center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Landing;

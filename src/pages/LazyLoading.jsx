import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PAGE_SIZE = 20;

const LazyLoading = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            setIsLoading(true);
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?offset=${pokemonData.length}&limit=${PAGE_SIZE}`
            );
            setPokemonData((prevData) => [...prevData, ...response.data.results]);
            setIsLoading(false);
            setHasMore(response.data.results.length === PAGE_SIZE);
        };
        fetchPokemonData();
    }, []);

    const handleObserver = (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
            setHasMore(false);
            fetchMoreData();
        }
    };

    const fetchMoreData = async () => {
        setIsLoading(true);
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=${pokemonData.length}&limit=${PAGE_SIZE}`
        );
        setPokemonData((prevData) => [...prevData, ...response.data.results]);
        setIsLoading(false);
        setHasMore(response.data.results.length === PAGE_SIZE);
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };
        observer.current = new IntersectionObserver(handleObserver, options);
        if (observer.current && hasMore) {
            observer.current.observe(document.getElementById('lazy-loading-end'));
        }
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [hasMore]);

    return (
        <Box p={4}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Lazy Loading
            </Text>
            <Box
                display="grid"
                gridTemplateColumns="repeat(2, 1fr)"
                gap={4}
                bg="gray.100"
                p={4}
                boxShadow="md"
            >
                {pokemonData.map((pokemon) => (
                    <Box
                        key={pokemon.name}
                        textAlign="center"
                        boxShadow="lg"
                        borderRadius="lg"
                        overflow="hidden"
                        bg={"lightpink"}
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
            {isLoading && (
                <Box textAlign="center" mt={4}>
                    <Text>Loading...</Text>
                </Box>
            )}
            {!isLoading && hasMore && (
                <Box id="lazy-loading-end" mt={4} textAlign="center">
                    <Button onClick={() => setHasMore(false)}>
                        Load more
                    </Button>
                </Box>
            )}
            {!isLoading && !hasMore && pokemonData.length === 0 && (
                <Box textAlign="center" mt={4}>
                    <Text>No results found.</Text>
                </Box>
            )}
        </Box>
    );
}

export default LazyLoading;

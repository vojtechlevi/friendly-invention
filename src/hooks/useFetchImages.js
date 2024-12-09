import { useState, useEffect } from 'react';
import { fetchImages } from '../utils/api';
import { getFromStorage, saveToStorage } from '../utils/storage';

// Hook för att hantera hämtning av bilder från Unsplash API baserat på en sökfråga
const useFetchImages = (query) => {
    // States för att lagra bilder, laddningsstatus, felmeddelanden och sidnummer
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    // Funktion för att ladda fler bilder
    const loadMore = async () => {
        setLoading(true); // Indikera att data laddas

        try {
            // Generera en nyckel för cachen baserat på query och page
            const cacheKey = `images_${query}_${page}`;
            const cachedData = getFromStorage(cacheKey); // Försök hämta data från cache

            let newData = [];
            if (cachedData) {
                // Använd cachedata om den finns
                newData = cachedData;
            } else {
                // Hämta nya data från API om cachedata saknas
                const data = await fetchImages(query, page);
                saveToStorage(cacheKey, data.results); // Spara API-svaret i cachen
                newData = data.results;
            }

            // Slå samman nya data med befintliga, men ta bort eventuella dubbletter
            const uniqueImages = [
                ...images,
                ...newData.filter((img) => !images.find((existing) => existing.id === img.id)),
            ];

            setImages(uniqueImages); // Uppdatera state med unika bilder
            setPage((prev) => prev + 1); // Öka sidnumret för nästa hämtning
        } catch (err) {
            // Sätt ett felmeddelande om något går fel
            setError('Failed to fetch images.');
        } finally {
            // Indikera att laddningen är klar
            setLoading(false);
        }
    };

    // Effekt som återställer bilder och sidnummer när query ändras
    useEffect(() => {
        setImages([]); // Återställ bilder
        setPage(1); // Återställ sidan till 1
    }, [query]);

    // Effekt som laddar bilder när query ändras
    useEffect(() => {
        if (query) loadMore(); // Ladda bilder om query inte är tom
    }, [query]);

    // Returnera state och funktioner för att använda i komponenter
    return { images, loading, error, loadMore };
};

export default useFetchImages;

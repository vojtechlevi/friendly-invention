// Definierar bas-URL:en för Unsplash API
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

// Exporterar en asynkron funktion för att hämta bilder från Unsplash API
export const fetchImages = async (query, page = 1, perPage = 10) => {
    // Hämtar API-nyckeln från miljövariabler (environment variables)
    const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

    // Kontrollera om API-nyckeln finns; om inte, kasta ett fel
    if (!API_KEY) {
        throw new Error('Unsplash API-nyckel saknas! Lägg till den i .env-filen.');
    }

    // Bygger URL:en för API-anropet med sökparametrar (query, page, och perPage)
    const url = `${UNSPLASH_BASE_URL}/search/photos?query=${query}&page=${page}&per_page=${perPage}`;

    try {
        // Skickar ett HTTP-anrop till Unsplash API
        const response = await fetch(url, {
            headers: {
                // Lägger till autentisering i anropets headers med API-nyckeln
                Authorization: `Client-ID ${API_KEY}`,
            },
        });

        // Kontrollera om svaret från servern är framgångsrikt (statuskod 200-299)
        if (!response.ok) {
            throw new Error(`Unsplash API-fel: ${response.status} ${response.statusText}`);
        }

        // Om anropet lyckas, konvertera svaret till JSON-format
        const data = await response.json();
        return data; // Returnerar de hämtade data till anroparen
    } catch (error) {
        // Loggar eventuella fel i konsolen för debugging
        console.error('Fel vid hämtning av bilder:', error.message);
        throw error; // Kastar felet vidare så att anroparen kan hantera det
    }
};
export const ProductService = {
    fetchData: async () => {
        try {
            const response = await fetch('https://api.artic.edu/api/v1/artworks?page=1');
            const data = await response.json();
            return data.data;  
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;  // Re-throw the error so that it can be caught in the `App` component
        }
    }
};








export const ProductService = {
  fetchData: async (page: number) => {
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
      const data = await response.json();
      return {
        data: data.data,
        pagination: data.pagination,
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
};

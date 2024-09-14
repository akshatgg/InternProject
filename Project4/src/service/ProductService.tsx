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
  
    // fetchDataFromPages: async (maxPage: number = 10) => {
    //   let allData: any[] = [];
    //   for (let page = 1; page <= maxPage; page++) {
    //     try {
    //       const { data } = await ProductService.fetchData(page);
    //       if (data.length === 0) {
    //         console.log(`No more data found at page ${page}. Stopping fetch.`);
    //         break;
    //       }
    //       allData = [...allData, ...data];
    //       console.log(`Fetched data from page ${page}`);
    //     } catch (error) {
    //       console.error(`Error fetching data on page ${page}:`, error);
    //       break;
    //     }
    //   }
    //   return allData;
    // },
  };
  
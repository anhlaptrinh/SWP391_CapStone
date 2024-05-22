import api from "./mockapi";

export const getJwelryApi = async () => {
    try {
      const response = await api.get(
        "/ListJewellery/Jwellery"
      );
      return response.data;
    } catch (error: any) {
      throw Error(error);
    }
  };

  export const deleteJwelryApi = async (id:any) => {
    try {
      const response = await api.delete(
        `/ListJewellery/Jwellery/${id}`
      );
      return response.data;
    } catch (error: any) {
      throw Error(error);
    }
  };
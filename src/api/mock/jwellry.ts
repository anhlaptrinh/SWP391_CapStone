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
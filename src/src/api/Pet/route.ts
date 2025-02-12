import axiosInstance from "@/utils/client";

export const getPetData = async () => {
    try {
      const response = await axiosInstance.get(`/pets`);
      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  };
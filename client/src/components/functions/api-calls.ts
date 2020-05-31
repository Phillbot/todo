import axios from "axios";

export const getRequest = async (
  url: string,
  isCancelled?: any,
  options: object = {}
) => {
  try {
    const result = await axios.get(url);
    const { data } = result;
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const postRequest = async (
  url: string,
  isCancelled?: any,
  options: object = {}
) => {
  try {
    await axios.post(url, options);
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteRequest = async (
  url: string,
  isCancelled?: any,
  options: object = {}
) => {
  try {
    await axios.delete(url, options);
  } catch (error) {
    console.error(error.message);
  }
};

export const putRequest = async (
  url: string,
  isCancelled?: any,
  options: object = {}
) => {
  try {
    await axios.put(url, options);
  } catch (error) {
    console.error(error.message);
  }
};

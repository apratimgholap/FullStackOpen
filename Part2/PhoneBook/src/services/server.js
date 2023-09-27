/* eslint-disable no-unused-vars */
import axios from "axios";

const base = "http://localhost:3002/persons";
const getAll = () => {
  return axios.get(base);
};

const create = (newObject) => {
  const request = axios.post(base, newObject);
  return request.then((response) => response.data);
};

const update = (newObject, id) => {
  const request = axios.put(`${base}\\${id}`, newObject);
  return request
    .then((response) => {
      console.log(response.data);
    })
    .then(() => getAll())
    .then((response) => response.data);
};
const remove = (id) => {
  axios.delete(`${base}/${id}`);
  return getAll();
};

export default {
  getAll,
  remove,
  create,
  update,
};

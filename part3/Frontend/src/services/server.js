/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";

const base = "/api/persons/";
const getAll = () => {
  return axios.get(base);
};

const getById = (id) => {
  const url = `${base}${id}`;
  return axios.get(url);
};

const create = (newObject) => {
  let objExists = null;

  //Check if entry already exists
  getAll()
    .then((response) => response.data)
    .then((data) => {
      const output = data.filter((obj) => obj.name === newObject.name);
      return output;
    })
    .then((output) => (objExists = output));

  if (objExists && objExists.number !== newObject.number) {
    const ans = confirm("Do you want to update the number ?");

    if (ans) {
      const request = axios.update(newObject, objExists.id);
      return request.then((data) => {
        console.log("Updated the number!");
        return data;
      });
    }
  }
  if (!objExists) {
    const request = axios.post(base, newObject);
    return request
      .then((response) => response.data)
      .then(() => getAll()) // We are returning entire updated person list so we set it directly in setPersons
      .then((response) => response.data);
  }
};

const update = (newObject, id) => {
  const request = axios.put(`${base}${id}`, newObject);
  return request
    .then((response) => {
      console.log(response.data);
    })
    .then(() => getAll())
    .then((response) => response.data);
};
const remove = (id) => {
  axios.delete(`${base}${id}`);
  return getAll();
};

export default {
  getAll,
  remove,
  create,
  update,
};

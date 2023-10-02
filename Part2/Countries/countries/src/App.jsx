/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const DisplayCountries = ({ countries }) => {
  return countries.map((country) => <p key={country}>{country}</p>);
};

const fetchCountry = async (country) => {
  const baseURl = "https://studies.cs.helsinki.fi/restcountries/api/name/";
  const response = await axios.get(`${baseURl}${country}`);
  return response.data;
};
const Country = ({ country }) => {
  console.log(country);
  const output = fetchCountry(country);
  console.log(output);

  // return <div>{countryData.flags.png}</div>;
};

React.memo(Country);

const App = () => {
  const [country, setCountry] = useState("");
  const [allCountries, setAllCountries] = useState("");
  const [searchText, setSearchText] = useState("");
  const [resultSet, setResultSet] = useState(0);
  const countryHandler = (e) => {
    // can add validation logic
    setSearchText(e.target.value.toLowerCase());
  };

  // Fetches all the countries that are necessary for further computation
  const getAllCountries = () => {
    console.log("Effect get all countries called");
    let baseURl = "https://studies.cs.helsinki.fi/restcountries/api/all/";
    axios
      .get(`${baseURl}`)
      .then((response) => response.data)
      .then((data) => data.map((c) => c.name.common.toLowerCase()))
      .then((countryList) => {
        console.log(countryList);
        setAllCountries(countryList);
      });
  };

  // Fetches list of country that match the search input
  const getMatchingCountries = () => {
    console.log("Effect matching countries called");
    let result = [];
    if (searchText && allCountries) {
      result = allCountries.filter((c) => c.includes(searchText));
      setResultSet(result);
      if (result.length == 1) {
        // console.log(result);
        setCountry(...result);
      }
    }
  };

  useEffect(getAllCountries, []);
  useEffect(getMatchingCountries, [searchText]);

  return (
    <div>
      <p>Find Countries: </p>

      <input value={searchText} onChange={countryHandler} />
      {resultSet.length <= 10 ? (
        <DisplayCountries countries={resultSet} />
      ) : (
        <p>Too many countries specify another filter</p>
      )}
      {country != "" ? <Country country={country} /> : ""}
    </div>
  );
};
export default App;

import { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "./App.css";

function App() {
  //
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    async function getData() {
      let response = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );

      let data = await response.data;

      // Create an array of objects
      // Objects have a name, value and key property
      // Filter any countries that have an id of null
      const countries = data
        .map((country) => ({
          name: country.country,
          value: country.countryInfo.iso3,
          key: country.countryInfo._id,
        }))
        .filter((country) => country.key !== null);

      setCountries(countries);
    }

    getData();
  }, []);

  const onCountryChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID 19 TRACKER</h1>
        <FormControl>
          <Select value={country} onChange={onCountryChange} variant="outlined">
            <MenuItem value="worldwide" key={0}>
              Worldwide
            </MenuItem>
            {countries.map(({ value, key, name }) => (
              <MenuItem value={value} key={key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import InfoBox from "./components/InfoBox/InfoBox.jsx";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

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

  useEffect(() => {
    async function getCountryData() {
      let url =
        country === "worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${country}`;

      let response = await axios.get(url);
      const countryInfo = response.data;

      setCountryInfo(countryInfo);
    }

    getCountryData();
  }, [country]);

  const onCountryChange = (e) => {
    let country = e.target.value;
    setCountry(country);
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
      <div className="app__infoBox">
        <InfoBox
          title="New Cases"
          value={countryInfo.todayCases}
          total={countryInfo.cases}
        />
        <InfoBox
          title="New Recoveries"
          value={countryInfo.todayRecovered}
          total={countryInfo.recovered}
        />
        <InfoBox
          title="New Deaths"
          value={countryInfo.todayDeaths}
          total={countryInfo.deaths}
        />
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import axios from "axios";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "./LineChart.css";

const LineChart = ({ country }) => {
  const [countryCases, setCountryCases] = useState([]);
  const [days, setDays] = useState(31);

  useEffect(() => {
    async function getHistoricalData() {
      let url =
        country === "worldwide"
          ? `https://disease.sh/v3/covid-19/historical/all?lastdays=${days}`
          : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=${days}`;

      let response = await axios.get(url);

      let data =
        country === "worldwide"
          ? response.data.cases
          : response.data.timeline.cases;

      let countryCases = buildChartData(data);
      setCountryCases(countryCases);
    }

    getHistoricalData();
  }, [country, days]);

  const buildChartData = (data) => {
    const countryCases = [];
    let lastDataPoint;

    for (let date in data) {
      if (lastDataPoint) {
        let newDataPoint = {
          date: date,
          "New Cases": data[date] - lastDataPoint,
        };
        countryCases.push(newDataPoint);
      }
      lastDataPoint = data[date];
    }

    return countryCases;
  };

  const onDaysChange = (e) => {
    setDays(e.target.value);
  };

  return (
    <div className="lineChart">
      <div className="lineChart__header">
        <div className="lineChart__title">Historical New Cases</div>
        <div className="lineChart__form">
          <FormControl>
            <Select value={days} onChange={onDaysChange} variant="outlined">
              <MenuItem value="8" key={8}>
                7 Days
              </MenuItem>
              <MenuItem value="15" key={15}>
                14 Days
              </MenuItem>
              <MenuItem value="31" key={31}>
                30 Days
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="lineChart__chart">
        <ResponsiveContainer width={"100%"} height={475}>
          <ComposedChart
            width={1000}
            height={500}
            data={countryCases}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 10,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="natural" dataKey="New Cases" stroke="rebeccapurple" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;

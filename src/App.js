import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import { toDateTime, readCSV } from "danfojs";

import csvFilePath from "./data/activities.csv";

import NavigationBar from "./nav/NavigationBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Statistics from "./pages/Statistics";

function App() {
  const [df, setDf] = useState();
  const [years, setYears] = useState();

  const getYears = async (df) => {
    let sub_df = df.loc({
      columns: ["Activity Date"],
    });

    sub_df = toDateTime(sub_df["Activity Date"]).year();

    return sub_df.unique().values;
  };

  useEffect(() => {
    const fetchData = async () => {
      const _df = await readCSV(csvFilePath, ",");

      let xdf = _df.loc({
        columns: ["Activity Date", "Elapsed Time", "Distance"],
      });

      setDf(xdf);

      setYears(await getYears(xdf));
    };

    fetchData();
  }, []);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/statistics"
          element={<Statistics df={df} years={years} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

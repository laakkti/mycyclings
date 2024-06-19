import React, { useState, useEffect } from "react";
import { toDateTime } from "danfojs";
import { Form, Row, Col, Container} from "react-bootstrap";
import Plot from "react-plotly.js";

const MonthsGraph = ({ df, _years }) => {
  const [mode, setMode] = useState("bar");
  const [year, setYear] = useState(_years[0]);
  const [years, setYears] = useState([]);

  const start = 1;
  const end = 12;
  const [months, setMonths] = useState(
    [...Array(end - start + 1).keys()].map((x) => x + start)
  );

  let sub_df = df.loc({
    columns: ["Distance", "Activity Date"],
  });

  let _year = parseInt(year);

  let condition = toDateTime(sub_df["Activity Date"]).year().eq(_year);

  sub_df = sub_df.loc({ rows: condition });

  let _val = [];

  for (let month = 0; month < 12; month++) {
    condition = toDateTime(sub_df["Activity Date"]).month().eq(month);
    let sub_dfx = sub_df.loc({ rows: condition });

    let sum = sub_dfx["Distance"].sum();

    _val.push(sum);
  }

  useEffect(() => {
    setYears(_years);
  }, []);

  const modes = ["bar", "line"];

  let data = [{ type: mode, x: months, y: _val }];

  return (
    <div>
      <Plot
        data={data}
        layout={{
          plot_bgcolor: "rgba(0, 0, 0, 0)",
          paper_bgcolor: "rgba(0, 0, 0, 0)",
          xaxis: {
            title: "Month",
            showline: true,
            zeroline: false,
            gridcolor: "#333366",
            color: "#00AAFF",
          },
          yaxis: {
            title: "Km",
            showline: false,
            zeroline: false,
            gridcolor: "#333366",
            color: "#00AAFF",
          },
          legend: {
            font: { family: "Arial", size: 12, color: "#14a2b8" },
          },
        }}
        config={{ displayModeBar: false }}
        useResizeHandler={true}
        style={{ width: "90%", height: "90%" }}
      />
      <Container>
        <Row>
          <Col className="text-end">
            <Form.Control
              className="float-right mr-5 btn"
              style={{ width: "auto", backgroundColor: "dodgerblue" }}
              as="select"
              id="type"
              custom
              value={mode}
              onChange={({ target }) => {
                setMode(target.value);
              }}
            >
              {modes.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </Form.Control>

            <Form.Control
              className="float-right mr-1 btn"
              variant="warning"
              style={{ width: "auto", backgroundColor: "darkgray" }}
              as="select"
              id="type"
              value={year}
              onChange={({ target }) => {
                setYear(target.value);
              }}
            >
              {years.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </Form.Control>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MonthsGraph;

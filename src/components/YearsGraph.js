import React, { useState, useEffect } from "react";
import { toDateTime } from "danfojs";
import { Form, Row, Col, Container} from "react-bootstrap";
import Plot from "react-plotly.js";

const YearsGraph = ({ df, _years }) => {
  const [mode, setMode] = useState("bar");
  const [val, setVal] = useState([]);
  const [years, setYears] = useState([]);

  let condition;
  let tmp;

  let _val = [];

  _years.forEach((item) => {
    let sub_df = df.loc({
      columns: ["Distance", "Activity Date"],
    });

    condition = toDateTime(sub_df["Activity Date"]).year().eq(item);
    sub_df = sub_df.loc({ rows: condition });

    tmp = sub_df["Distance"].sum();

    _val.push(tmp);
  });

  useEffect(() => {
    setYears(_years);
    setVal(_val);
  }, []);

  const modes = ["bar", "line"];

  let data = [
    {
      type: mode,
      x: years,
      y: _val,
      mode: "lines+markers",
      line: {
        color: "green",
        shape: "spline",
      },
      marker: {
        color: "green",
      },
      fill: "tozeroy",
    },
  ];

  return (
    <div>
      <div id="plot_div" />
      <Plot
        data={data}
        layout={{
          plot_bgcolor: "rgba(0, 0, 0, 0)",
          paper_bgcolor: "rgba(0, 0, 0, 0)",
          xaxis: {
            title: "Year",
            showline: true,
            zeroline: false,
            gridcolor: "#333366",
            color: "darkgray",
            fill: "tozeroy",
          },
          yaxis: {
            title: "Km",
            showline: false,
            zeroline: false,
            gridcolor: "#333366",
            color: "darkgray",
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
              style={{ width: "auto", backgroundColor: "olive" }}
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
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default YearsGraph;

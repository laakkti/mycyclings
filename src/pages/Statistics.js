import logo from "../logo.svg";
import { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Navbar, NavItem } from "react-bootstrap";

import YearsGraph from "../components/YearsGraph";
import MonthsGraph from "../components/MonthsGraph";
import MonthsSummaryGraph from "../components/MonthsSummaryGraph";
import DataForm from "../components/DataForm";

import { useParams } from "react-router-dom";

const Statistics = ({ df, years }) => {
  const [mode, setMode] = useState(2);
  const [topics, setTopics] = useState(["Distance"]);
  const [topic, setTopic] = useState(["Distance"]);

  const [myDataToShow, setMyDataToShow] = useState([]);

  const [showMode, setShowMode] = useState(0);

  const doQuery = async (data) => {
    let startDate = data.startDate;
    let endDate = data.endDate;

    startDate = new Date(startDate.setUTCHours(0, 0, 0, 0));
    endDate = new Date(endDate.setUTCHours(23, 59, 0, 0));

    startDate = startDate.toISOString();
    endDate = endDate.toISOString();

    let columns = ["Activity Date", "Distance", "Elapsed Time"];

    let sub_df = df.loc({
      columns: columns,
    });

    columns = [...columns, "AvgSpeed"];

    sub_df.addColumn("AvgSpeed", sub_df["Distance"], { inplace: true });

    sub_df["AvgSpeed"] = sub_df["Distance"]
      .div(sub_df["Elapsed Time"])
      .mul(3600);

    let result = [];
    for (let i = 0; i < sub_df.index.length; i++) {
      let date = new Date(sub_df.at(i, "Activity Date"));
      date = date.toISOString();

      if (date >= startDate && date <= endDate) {
        let val = {};
        for (let col of columns) {
          val[col] = sub_df.at(i, col);
          if (col === "AvgSpeed") {
            val[col] = val[col].toFixed(2);
          }
        }

        result.push(val);
      }
    }

    setMyDataToShow(result);
    setMode(2);
  };

  const handleForm = async (_mode, id, selectedIndex) => {
    if (_mode === 0) {
      let data = [];
      setMyDataToShow([data]);
      setMode(_mode);
    } else if (_mode === 5) {
      let data = id;

      doQuery(data);
    }
  };

  let header = ["Start", "End", "Topic", " ", ""];
  if (mode === 2) {
    header = [
      "Date",
      "Moving time (s)",
      "Distance (km)",
      "Avg speed (km/h)",
      " ",
    ];
  }

  return (
    <div className="full-height-layout">
      <Container>
        <Navbar style={{ background: "#000000" }} variant="dark">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <NavItem className="float-left">
            <Form.Control
              className="mr-1 btn btn-info"
              style={{
                width: "auto",
                background: "#000000",
                color: "#00FFFF",
                borderStyle: "none",
                fontSize: "20px",
              }}
              as="select"
              id="type"
              custom
              value={topic}
              onChange={({ target }) => {
                setTopic(target.value);
              }}
            >
              {topics.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </Form.Control>
          </NavItem>

          <NavItem className="ml-auto">
            <Button
              variant="outline-success"
              onClick={() => {
                setShowMode(1);
              }}
            >
              Years
            </Button>
          </NavItem>
          <NavItem className="ml-2">
            <Button
              variant="outline-primary"
              onClick={() => {
                setShowMode(2);
              }}
            >
              Months
            </Button>
          </NavItem>

          <NavItem className="ml-2">
            <Button
              variant="outline-info"
              onClick={() => {
                setShowMode(4);
              }}
            >
              Summary
            </Button>
          </NavItem>

          <NavItem>
            <Button
              className="ml-2"
              variant="outline-warning"
              onClick={() => {
                handleForm(0, null);
                setShowMode(3);
              }}
            >
              Query
            </Button>
          </NavItem>
        </Navbar>

        <Row>
          <Col>
            <h2> </h2>
          </Col>
        </Row>

        {showMode === 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={logo} width="50%" style={{ marginTop: "50px" }} alt="" />
          </div>
        )}
        {showMode === 1 && <YearsGraph df={df} _years={years} />}
        {showMode === 2 && <MonthsGraph df={df} _years={years} />}
        {showMode === 4 && <MonthsSummaryGraph df={df} _years={years} />}

        {showMode === 3 && (
          <DataForm
            mode={mode}
            data={myDataToShow}
            header={header}
            func={handleForm}
          />
        )}
      </Container>
    </div>
  );
};

export default Statistics;

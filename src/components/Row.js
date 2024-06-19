import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Row = ({ mode, item, func, _selectedIndex }) => {
  const [typeOptions] = useState(["Moving time", "Distance", "Average speed"]);
  const [id, setId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [type, setType] = useState(typeOptions[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (_selectedIndex !== null && mode !== 0) {
      setSelectedIndex(_selectedIndex);
    } else {
      setSelectedIndex(0);
    }
  }, [_selectedIndex, mode]);

  
  if (mode === 2) {
    const getFormmatedDate = (dateString) => {
      const date = new Date(dateString);
      let month = (date.getMonth() + 1).toString();
      let day = date.getDate().toString();
      let year = date.getFullYear().toString();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return month + "/" + day + "/" + year;
    };

    let formattedDate = getFormmatedDate(item["Activity Date"]);

    let values = [
      formattedDate,
      item["Elapsed Time"],
      item["Distance"],
      item["AvgSpeed"],
    ];

    let style = { background: "#7AABFF" };

    return (
      <tbody>
        <tr>
          {values.map((item, ind) => {
            return ind === selectedIndex + 1 ? (
              <td key={ind} style={style}>
                {item}
              </td>
            ) : (
              <td key={ind}> {item} </td>
            );
          })}
          <td style={{ textAlign: "right" }}></td>
        </tr>
      </tbody>
    );
  } else {
    const handleSearch = (event, _id) => {
      if (startDate === "" || endDate === "") {
        return;
      } else {
        event.preventDefault();

        const data = {
          startDate: startDate,
          endDate: endDate,
        };

        if (mode === 0) {
          func(5, data, selectedIndex);
        } else {
        }
      }
    };

    return (
      <tbody>
        <tr>
          <td>
            <DatePicker
              type="date"
              className="form-control"
              id="dp"
              required
              selected={startDate}
              onChange={(startDate) => setStartDate(startDate)}
            />
          </td>
          <td>
            <DatePicker
              type="date"
              className="form-control"
              id="dp2"
              required
              selected={endDate}
              onChange={(endDate) => setEndDate(endDate)}
            />
          </td>
          <td>
            <Form.Control
              as="select"
              id="type"
              custom
              value={type}
              onChange={({ target }) => {
                setSelectedIndex(target.selectedIndex);
                setType(target.value);
              }}
            >
              {typeOptions.map((item, ind) => {
                return (
                  <option key={ind} value={item}>
                    {item}
                  </option>
                );
              })}
            </Form.Control>
          </td>

          <td>
            <Button
              type="submit"
              className="float-right btn btn-success"
              id={id}
              onClick={(e) => {
                handleSearch(e, e.target.id);
              }}
            >
              <Search id={id}></Search>
            </Button>
          </td>
          <td></td>
        </tr>
      </tbody>
    );
  }
};
export default Row;

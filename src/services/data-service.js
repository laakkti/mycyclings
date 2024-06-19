import axios from "axios";

//require("dotenv").config();

console.log("process.env.NODE_ENV ", process.env.NODE_ENV);

let baseUrl = "/api/data/";
if (process.env.NODE_ENV === "development")
  baseUrl = "http://localhost:5000/api/data/";

const getActivities = async () => {
  try {
    const response = await axios.get(baseUrl + "activities");
    return response.data;
  } catch (error) {
    console.error("ERROR: ", error.message);
  }
};

export default { getActivities };

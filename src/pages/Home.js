import logo from "../logo.svg";

const Home = () => {
  return (
    <div className="full-height-layout">
      <div style={{ paddingLeft: "40px", paddingTop: "30px" }}>
        <div style={{ color: "white", fontSize: "30px" }}>
          Statistics of my cycling activities
        </div>
        <h6 style={{ color: "#609CE1", marginTop: "8px" }}>2023 ©AA4598</h6>
      </div>
      <header className="App-header">
        <img src={logo} alt="logo" />
      </header>
    </div>
  );
};

export default Home;

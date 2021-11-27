import logo from "./logo.svg";
import { useFetch } from "./hooks/useFetch";
import "./App.css";
import Header from "./header/header-mini.js";
import MapChart from "./MapChart";
import TTest from "./TTest.js";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const [dataLoc, loadingLoc] = useFetch(
    "https://raw.githubusercontent.com/Aquite/lis570/main/data/libraryloc.csv"
  );

  const [dataLib, loadingLib] = useFetch(
    "https://raw.githubusercontent.com/Aquite/lis570/main/data/libraries.csv"
  );

  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <h1>LIS 570 Sex Education and Libraries</h1>
        <p>Test page</p>
      </header>
      <main>
        {loadingLoc ? (
          <p>Loading...</p>
        ) : (
          <div>
            <MapChart dataLoc={dataLoc} />
          </div>
        )}
        {loadingLoc || loadingLib ? (
          <p>Loading...</p>
        ) : (
          <React.Fragment>
            <p>P-values:</p>
            <TTest dataLib={dataLib} dataLoc={dataLoc} metric={"Taught"} />
            <TTest dataLib={dataLib} dataLoc={dataLoc} metric={"Rural"} />
            <TTest
              dataLib={dataLib}
              dataLoc={dataLoc}
              metric={"Conservative"}
            />
            <TTest dataLib={dataLib} dataLoc={dataLoc} metric={"TrumpWin"} />
          </React.Fragment>
        )}
      </main>
    </div>
  );
}

export default App;

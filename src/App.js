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

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

function App() {
  const [dataLoc, loadingLoc] = useFetch(
    "https://raw.githubusercontent.com/Aquite/lis570/main/data/libraryloc.csv"
  );

  const [dataLib, loadingLib] = useFetch(
    "https://raw.githubusercontent.com/Aquite/lis570/main/data/libraries.csv"
  );

  const covers = importAll(
    require.context("./img/bks", false, /\.(png|jpe?g|svg)$/)
  );
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <h1>LIS 570 Sex Education and Libraries</h1>
        <p>Test page</p>
      </header>
      <main>
        {loadingLoc || loadingLib ? (
          <p>Loading...</p>
        ) : (
          <React.Fragment>
            <MapChart dataLoc={dataLoc} />
            <Container>
              <Row>
                {dataLib.slice(0, 1).map((book) => {
                  console.log(book);
                  return (
                    <Col>
                      <img src={covers[book.Title].default} />
                    </Col>
                  );
                })}
              </Row>
            </Container>
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

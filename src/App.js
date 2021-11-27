import { useFetch } from "./hooks/useFetch";
import "./App.css";
import Header from "./header/header-mini.js";
import MapChart from "./MapChart";
import TTest from "./TTest.js";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const App = () => {
  const [focLib, setFocLib] = useState("Yolo County Library");

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
      <main style={{ margin: "0 auto", maxWidth: "50em" }}>
        <h1>LIS 570 Sex Education and Libraries</h1>
        <p>Test page</p>
        {loadingLoc || loadingLib ? (
          <p>Loading...</p>
        ) : (
          <React.Fragment>
            <MapChart
              dataLoc={dataLoc}
              dataLib={dataLib}
              focLib={focLib}
              setFocLib={setFocLib}
            />
            <Container style={{ margin: "0 auto", maxWidth: "50em" }}>
              <Row>
                {dataLib.slice(0, 20).map((book) => {
                  return (
                    <Col className="w-sm-10 w-20">
                      <Card style={{ width: "auto" }}>
                        {book[focLib] == 1 ? (
                          <Card.Img src={covers[book.image].default} />
                        ) : (
                          <Card.Img
                            src={covers[book.image].default}
                            className="gs"
                          />
                        )}
                      </Card>
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
};

export default App;

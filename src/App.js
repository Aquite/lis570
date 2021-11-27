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
  const [focLib, setFocLib] = useState(
    "Click a marker on the map to show library-specifc results!"
  );

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
            <p>{focLib}</p>
            <Container style={{ margin: "0 auto", maxWidth: "50em" }}>
              <Row>
                {dataLib.slice(0, 20).map((book) => {
                  return (
                    <Col className="w-sm-10 w-20">
                      <Card style={{ width: "auto" }}>
                        {book[focLib] == 0 ? (
                          <Card.Img
                            src={covers[book.image].default}
                            alt={"not included: " + book.Title}
                            className="gs"
                          />
                        ) : (
                          <Card.Img
                            src={covers[book.image].default}
                            alt={"included: " + book.Title}
                          />
                        )}
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Container>
            <h2>Questionnaire Responses</h2>
            <ul>
              <li>Library Patrons</li>
              <li>Library Employees</li>
              <li>Educators</li>
            </ul>
            <h2>Ask a Librarian</h2>
            <ul>
              <li>Collection Development</li>
              <li>Accessibility</li>
              <li>Censorship</li>
            </ul>
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

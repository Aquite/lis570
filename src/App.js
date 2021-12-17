import { useFetch } from "./hooks/useFetch";
import "./App.css";
import Header from "./header/header-mini.js";
import MapChart from "./MapChart";
import TTest from "./TTest.js";
import Cover from "./Cover.js";
import Survey from "./Survey.js";
import Definitions from "./Definitions.js";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const App = () => {
  const [dataLoc, loadingLoc] = useFetch(
    "https://raw.githubusercontent.com/Aquite/lis570/main/data/libraryloc.csv"
  );

  const [dataLib, loadingLib] = useFetch(
    "https://raw.githubusercontent.com/Aquite/lis570/main/data/libraries.csv"
  );

  const [dataSurv, loadingSurv] = useFetch(
    "https://raw.githubusercontent.com/Aquite/lis570/main/data/survey.csv"
  );

  const [focMethod, setFocMethod] = useState("collections");
  const handleSelectMethod = (eventKey) => {
    setFocMethod(eventKey);
  };

  const [focLib, setFocLib] = useState(
    "Click a marker on the map to show library-specifc results!"
  );

  const covers = importAll(
    require.context("./img/bks", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <div className="App">
      <Header />
      <main
        style={{ margin: "0 auto", maxWidth: "50em", paddingInline: "1em" }}
      >
        <h1>LIS 570 Sex Education and Libraries</h1>
        <h2>Description</h2>
        <p>
          Only 28 states and DC require that both sex and HIV education be
          taught in public schools; Only eighteen states require that curriculum
          be medically accurate. While public libraries could offer a solution
          to lack of sex ed resources, they are faced with the same social and
          political environment that prevents comprehensive sex education from
          being a mandatory part of public education. Family Planning education
          services in libraries can lose federal and local funding for
          referencing politicized information such as abortion or transgender
          healthcare. Libraries — and librarians — may be faced with increased
          patron or parent complaints in response to the inclusion of certain
          sex education materials.
        </p>
        <p>
          What do the sex education materials in public library collections look
          like? What are they missing? What do patrons think of their library's
          offerings on the subject? Are they even turning to the library for
          this information? And what have librarians discovered about this
          sensitive topic in the public sphere as they try to both provide
          accurate and current information as well as mitigate complaints and
          censorship?
        </p>
        <p>
          Below is a US map with 30 library systems across the country; their
          catalogs have been searched to see if they have particular sex
          education materials recommended by collection development guides and
          library reading lists. There are further insights from respondents of
          a questionnaire and librarian interviewees. These center around four
          issues found in the topic of sex ed and libraries: library use,
          materials use, librarian confidence, and internet use. Patrons
          indicate that libraries are not where they immediately turn for this
          information; librarians echo this sentiment.
        </p>
        <h2>View Our Raw Quantitative Data</h2>
        {loadingLoc || loadingLib ? (
          <p>Loading raw data...</p>
        ) : (
          <React.Fragment>
            <Nav
              variant="tabs"
              defaultActiveKey="collections"
              onSelect={handleSelectMethod}
            >
              <Nav.Item>
                <Nav.Link eventKey="collections">Library Collections</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="questionnaire">Questionnaire</Nav.Link>
              </Nav.Item>
            </Nav>
            {focMethod == "collections" ? (
              <React.Fragment>
                <MapChart
                  dataLoc={dataLoc}
                  dataLib={dataLib}
                  focLib={focLib}
                  setFocLib={setFocLib}
                  focMethod={focMethod}
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
              </React.Fragment>
            ) : focMethod == "questionnaire" ? (
              <iframe
                width="100%"
                height="600"
                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTVfGFHbWmuD9jYWhSdvNPHPfjXdovjTFBiVm4V-x3xbLEaFBEHQxf4vhWPZBFV7ee3nhECP4LNy1y6/pubhtml?gid=29074251&amp;single=true&amp;widget=true&amp;headers=false"
              ></iframe>
            ) : null}
          </React.Fragment>
        )}
        <h2>View Our Findings</h2>
        <br />
        {loadingLoc || loadingLib || loadingSurv ? (
          <p>Loading Findings...</p>
        ) : (
          <Survey dataSurv={dataSurv} dataLib={dataLib} dataLoc={dataLoc} />
        )}
        <h2>Definitions</h2>
        <Definitions />
      </main>
    </div>
  );
};

export default App;

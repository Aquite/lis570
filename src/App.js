import { useFetch } from "./hooks/useFetch";
import "./App.css";
import Header from "./header/header-mini.js";
import MapChart from "./MapChart";
import TTest from "./TTest.js";
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
          We evaluated collections based on their sex education materials by
          searching 30 online public library catalogs; these were distributed
          geographically across the country as well as varying in size, with
          city-, county-, and statewide library systems. We cross-checked these
          catalogs with a list of core sex education materials (20 titles) that
          we developed based on booklists from multiple public libraries, the
          H.W. Wilson nonfiction core collection, and School Library Journal, as
          well as a keyword search list (10 keywords) to discover other sex
          education materials in each catalog. After conducting this collection
          analysis, we created a United States map with tagged geolocations for
          each collection. If you click on one of the location pins, there is a
          visual representation of which core collection books the library
          provides. If a book is not available, it is greyed out. We also input
          data about if the library is rural, conservative, and so on.
        </p>
        <p>
          Additionally, we surveyed a mixture of the public, library
          professionals, and educators to gain a nuanced perspective on the
          state of sex education materials, the obstacles people have faced when
          accessing them, and their impact. There were sections for library
          patrons, library professionals, and educators, with 6–10 questions
          each. We received 50 responses in total; the final website will also
          present some analysis of our survey findings. This code needs to be
          finalized, but we have included our preliminary findings for peer
          review in order to identify the strongest data for publishing on the
          site.
        </p>
        <p>
          Finally, we interviewed four public library professionals to determine
          public libraries’ culture regarding sex education materials and
          questions as well as public libraries’ typical response to external
          pressure regarding exclusion of sex education materials. We asked each
          librarian about their daily professional life, community demographics,
          robustness of their library collection, patron interactions
          (information-seeking, complaints, etc), and censorship. Our final
          website will also include key observations and quotes from these
          interviews. To recreate the interview experience, we would like to
          have sound files play these quotes aloud (with accessibility
          alt-text); to maintain the anonymity we promised our interviewees, we
          will record these soundbites with our voices. We have included some
          prospective quotes that we think are worth publishing on the site for
          peer review.
        </p>
        <h2>View Our Raw Data</h2>
        {loadingLoc || loadingLib ? (
          <p>Loading...</p>
        ) : (
          <React.Fragment>
            <Nav
              variant="tabs"
              defaultActiveKey="collections"
              onSelect={handleSelectMethod}
            >
              <Nav.Item>
                <Nav.Link eventKey="collections" href="#/home">
                  Library Collections
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="questionnaire">Questionnaire</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="interviews">Librarian Interviews</Nav.Link>
              </Nav.Item>
            </Nav>
            <MapChart
              dataLoc={dataLoc}
              dataLib={dataLib}
              focLib={focLib}
              setFocLib={setFocLib}
              focMethod={focMethod}
            />
            {focMethod == "collections" ? (
              <React.Fragment>
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
            ) : null}
          </React.Fragment>
        )}
        <h2>View Our Findings</h2>
        <br />
        {loadingSurv ? (
          <p>Loading Findings...</p>
        ) : (
          <Survey dataSurv={dataSurv} />
        )}
        {loadingLoc || loadingLib ? null : (
          <React.Fragment>
            <h2>Ask a Librarian</h2>
            <ul>
              <li>Collection Development</li>
              <li>Accessibility</li>
              <li>Censorship</li>
            </ul>
            <p>P-values:</p>
            <TTest dataLib={dataLib} dataLoc={dataLoc} metric={"Taught"} />
            <TTest dataLib={dataLib} dataLoc={dataLoc} metric={"Rural"} />
            <TTest dataLib={dataLib} dataLoc={dataLoc} metric={"LGBT"} />
            <TTest dataLib={dataLib} dataLoc={dataLoc} metric={"Homophobic"} />
            <TTest
              dataLib={dataLib}
              dataLoc={dataLoc}
              metric={"Conservative"}
            />
            <TTest dataLib={dataLib} dataLoc={dataLoc} metric={"TrumpWin"} />
          </React.Fragment>
        )}
        <h2>Definitions</h2>
        <Definitions />
      </main>
    </div>
  );
};

export default App;

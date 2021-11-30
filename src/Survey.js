import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Title,
} from "recharts";

const Survey = ({ dataSurv }) => {
  console.log(dataSurv);
  const seekMap = new Map();
  dataSurv.forEach((r) => {
    r["Where do you seek sex education?"].split(";").forEach((e) => {
      if (seekMap.has(e)) {
        seekMap.set(e, seekMap.get(e) + 1);
      } else {
        seekMap.set(e, 1);
      }
    });
  });
  const seek = [];
  seekMap.forEach(function (val, key) {
    if (val > 1) {
      seek.push({ source: key, "Number of Responses": val });
    }
  });

  return (
    <React.Fragment>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link className="uwlink" eventKey="first">
                  Internet Use
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Library Materials</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Library Use</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Librarian Confidence</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <p>
                  The internet is preferred over all other sources of sex
                  education information:
                  <ul>
                    <li>
                      78% of respondents included “Website” under “Where do you
                      seek sex education?”
                    </li>
                    <li>
                      Book was second most popular, with 50% of respondents
                      including “Book”
                    </li>
                  </ul>
                </p>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart
                      width={500}
                      height={300}
                      data={seek}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="source" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Number of Responses" fill="#4b2e83" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <p>
                  Students are not confident in their ability to find relevant
                  materials and information from their local library:
                  <ul>
                    <li>
                      Only respondents 18 and 24 responded with a Likert “5” to
                      the question “How often were those books in your library?”
                      Respondent 18 is a Queer educator from Virginia now living
                      in Oregon, and respondent 24 is a library professional who
                      specified no additional demographic information.
                    </li>
                    <li>
                      57.8% of respondents rated themselves at a Likert “1” or
                      “2” for the same question (26.7% at “1”, 31.1% at “2”).
                    </li>
                  </ul>
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <p>
                  Students are unlikely to go to the library for sex education
                  materials:
                  <ul>
                    <li>
                      46% of respondents rated themselves a Likert “1” for “How
                      likely are you to go to the library for sex education
                      materials?”
                    </li>
                    <li>
                      Of the 6% (3) respondents who rated themselves a Likert
                      “5” for the same question (respondents 7, 17, and 20),
                      only one self-identified as a student. The student,
                      respondent 20, also identified as a library professional.
                      Respondent 17 was the only respondent with a Likert “5”
                      for this question who was from a conservative state
                      (Virginia).
                      <ul>
                        <li>
                          Respondent 20 was also the only respondent rated at a
                          Likert “5” for this question who otherwise seemed
                          confident in their library’s collection of sex
                          education materials, respondents 7 & 17 both rated
                          their confidence in their collections rather low.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <p>There is consistent confidence in librarians:</p>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </React.Fragment>
  );
};

export default Survey;

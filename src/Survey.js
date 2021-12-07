import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TTest from "./TTest.js";
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
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Survey = ({ dataSurv, dataLib, dataLoc }) => {
  console.log(dataSurv);
  const seekMap = new Map();
  const oftenMap = new Map();
  const goMap = new Map();
  dataSurv.forEach((r) => {
    r["Where do you seek sex education?"].split(";").forEach((e) => {
      if (seekMap.has(e)) {
        seekMap.set(e, seekMap.get(e) + 1);
      } else {
        seekMap.set(e, 1);
      }
    });
    let val = r["How often were those books in your library? "];
    if (val != "") {
      if (oftenMap.has(val)) {
        oftenMap.set(val, oftenMap.get(val) + 1);
      } else {
        oftenMap.set(val, 1);
      }
    }
    let val2 =
      r[
        "How likely are you to go to the library for sex education materials? "
      ];
    if (val2 != "") {
      if (goMap.has(val2)) {
        goMap.set(val2, goMap.get(val2) + 1);
      } else {
        goMap.set(val2, 1);
      }
    }
  });
  const seek = [];
  seekMap.forEach(function (val, key) {
    if (val > 1) {
      seek.push({ source: key, "Number of Responses": val });
    }
  });
  const often = [];
  oftenMap.forEach(function (val, key) {
    if (val > 1) {
      often.push({ Rating: key, "Number of Responses": val });
    }
  });
  often.sort((e1, e2) => {
    return e1.Rating > e2.Rating;
  });

  const go = [];
  goMap.forEach(function (val, key) {
    if (val > 1) {
      go.push({ Rating: key, "Number of Responses": val });
    }
  });
  go.sort((e1, e2) => {
    return e1.Rating > e2.Rating;
  });
  console.log(go);

  return (
    <React.Fragment>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row style={{ margin: "0px" }}>
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
                <Nav.Link eventKey="fourth">Rural Libraries</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">Conservativeness</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sixth">Patron Complaints</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="seventh">Librarian Confidence</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <h3>
                  Patrons would rather use the internet than find sexual
                  education materials at the public library.
                </h3>
                <p>
                  The internet is preferred over all other sources of sex
                  education information:
                </p>
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
                <br />
                <h3>
                  Interview with Paula, a Public Librarian from a liberal city
                  in the Pacific Northwest
                </h3>
                <AudioPlayer src="https://github.com/Aquite/lis570/blob/main/data/audio/paulaInternet.mp3?raw=true" />
                <p>Transcript:</p>
                <blockquote style={{ paddingLeft: "4vw" }}>
                  <p>
                    The Internet, I think, would predominate over probably
                    anything we have here. And, because especially on the
                    subject of sexuality it's anonymity. It's so personal. To
                    leave your house, go to a library, and go find a book and
                    carry it around. I mean, you'd have to be pretty confident
                    in yourself, especially if it were a subject of like, you
                    know, a gender identity change or something like that to -
                    you know what I mean? It would be much more private to just
                    search online, And not, you know, involve us.
                  </p>
                </blockquote>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <h3>
                  Sex education materials are often readily available in public
                  libraries, yet patrons are not confident in their ability to
                  find them
                </h3>
                <p>
                  Students are not confident in their ability to find relevant
                  materials and information from their local library:
                </p>
                <ul>
                  <li>
                    Only respondents 18 and 24 responded with a Likert “5” to
                    the question “How often were those books in your library?”
                    Respondent 18 is a Queer educator from Virginia now living
                    in Oregon, and respondent 24 is a library professional who
                    specified no additional demographic information.
                  </li>
                  <li>
                    57.8% of respondents rated themselves at a Likert “1” or “2”
                    for the same question (26.7% at “1”, 31.1% at “2”).
                  </li>
                </ul>

                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart
                      width={500}
                      height={300}
                      data={often}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Rating" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Number of Responses" fill="#4b2e83" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p>
                  Despite this, library collections on average contained 12.1 of
                  our 20 curated titles, or around 60% of them. Additionally,
                  three of our interviewed librarians actively monitored and
                  curated their collections to include sex education and LGBT
                  materials:
                </p>
                <h3>
                  Interview with Amy, a Librarian from a liberal city in the
                  Pacific Northwest
                </h3>
                <AudioPlayer src="https://github.com/Aquite/lis570/blob/main/data/audio/amyPatrons.mp3?raw=true" />
                <p>Transcript:</p>
                <blockquote style={{ paddingLeft: "4vw" }}>
                  <p>
                    When I interact with teens who come to me and they want
                    something to read and I start asking about what they like to
                    read and what they’re into or whatever. If I get any sense
                    that they are secretly asking for materials that feature
                    queer characters, then I will start grabbing a bunch of
                    these in addition to everything else and will go “here you
                    go, take a look at these” because a lot of these twelve,
                    thirteen, fourteen years olds will not come out and say that
                    that is what they’re looking for.
                  </p>
                </blockquote>
                <br />
                <h3>
                  Interview with Amy, a Public Librarian from a liberal city in
                  the Pacific Northwest
                </h3>
                <AudioPlayer src="https://github.com/Aquite/lis570/blob/main/data/audio/amyPatrons.mp3?raw=true" />
                <p>Transcript:</p>
                <blockquote style={{ paddingLeft: "4vw" }}>
                  <p>
                    When I interact with teens who come to me and they want
                    something to read and I start asking about what they like to
                    read and what they’re into or whatever. If I get any sense
                    that they are secretly asking for materials that feature
                    queer characters, then I will start grabbing a bunch of
                    these in addition to everything else and will go “here you
                    go, take a look at these” because a lot of these twelve,
                    thirteen, fourteen years olds will not come out and say that
                    that is what they’re looking for.
                  </p>
                </blockquote>
                <h3>
                  Interview with Sally, a Community College Librarian from a
                  liberal city in New England
                </h3>
                <AudioPlayer src="https://github.com/Aquite/lis570/blob/main/data/audio/sallyCollection.mp3?raw=true" />
                <p>Transcript:</p>
                <blockquote style={{ paddingLeft: "4vw" }}>
                  <p>
                    We do have materials, but not a lot. And I don't think we
                    would have materials for every identity within the
                    community. And when I searched for the materials, we have a
                    lot from the biological and nursing point of view, but not
                    as many from the sociological point of view ... In my search
                    I found that there were more fiction materials in that area,
                    and I think our students and adults, and we do serve adults,
                    can probably access information that way.
                  </p>
                </blockquote>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <h3>
                  How Patrons Use the library for sexual education materials
                </h3>
                <p>
                  Students are unlikely to go to the library for sex education
                  materials:
                </p>
                <ul>
                  <li>
                    46% of respondents rated themselves a Likert “1” for “How
                    likely are you to go to the library for sex education
                    materials?”
                  </li>
                  <li>
                    Of the 6% (3) respondents who rated themselves a Likert “5”
                    for the same question (respondents 7, 17, and 20), only one
                    self-identified as a student. The student, respondent 20,
                    also identified as a library professional. Respondent 17 was
                    the only respondent with a Likert “5” for this question who
                    was from a conservative state (Virginia).
                    <ul>
                      <li>
                        Respondent 20 was also the only respondent rated at a
                        Likert “5” for this question who otherwise seemed
                        confident in their library’s collection of sex education
                        materials, respondents 7 & 17 both rated their
                        confidence in their collections rather low.
                      </li>
                    </ul>
                  </li>
                </ul>

                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart
                      width={500}
                      height={300}
                      data={go}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Rating" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Number of Responses" fill="#4b2e83" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <br />
                <h3>
                  Interview with Paula, a Public Librarian from a liberal city
                  in the Pacific Northwest
                </h3>
                <AudioPlayer src="https://github.com/Aquite/lis570/blob/main/data/audio/paulaPatrons.mp3?raw=true" />
                <p>Transcript:</p>
                <blockquote style={{ paddingLeft: "4vw" }}>
                  <p>
                    I will tell you that I have never been asked for books on
                    sexual education by teens. I don't think I've been ever
                    asked for a book on sex, that is something that it's so
                    personal and private that as a rule, teens find that
                    material on their own and now that we have computers, books
                    are just one avenue. There's so much material available to
                    them that they would have to come to a library and ask
                    anybody for help with that. The people that will ask us for
                    books on sexuality and all those kinds of things are
                    parents, helping their younger teen, say tween with that
                    material so that's another kind of group of people to help
                    is parents who are trying to describe those kinds of
                    difficult discussions, or, you know, conversations with
                    their children that's another audience that we serve with
                    the sexuality materials.
                  </p>
                </blockquote>
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <h3>
                  Rural Libraries consistently underperform when compared to
                  non-rural libraries
                </h3>
                <p>
                  When we administered our collection analysis on 35 libraries,
                  we noted whether or not the library was in a 'rural' area
                  according to the Census Bureau. Dividing the libraries into
                  these two groups and performing a T-Test on the average number
                  of titles in each library resulted in a p-value of{" "}
                  <TTest dataLib={dataLib} dataLoc={dataLoc} metric={"Rural"} />
                  . This was the only correlation we could confidently assert
                  exists through our quantitative methods.
                </p>
                <p>
                  The reason for this discrepancy may result from the fact that
                  rural libraries serve less people than city libraries, and
                  thus have smaller budgets to purchase books across the board.
                  Further research is required to see whether there is a
                  specific lack of sex education titles, or just a lack of
                  titles in general in rural libraries.
                </p>
                <p>
                  Even if it's the latter, this is still a red flag. Look at
                  internet access, for example. The federal government provided
                  subsidies to telecommunications companies to build rural
                  infrustructure, because they felt it was imporant that all
                  citizens have internet access (the telecom companies pocketed
                  the money without building the infrastructure but that's
                  besides the point). If we want equitable access to sex
                  education materials, then we may need to provide additional
                  funding to rural libraries or implement some sort of free ILL
                  program to ensure access.
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="fifth">
                <h3>
                  The state a library is located in and the Conservativeness of
                  the community has an inconclusive effect on the robustness of
                  sex education titles
                </h3>
                <p>
                  Determining whether or not a state is 'conservative' is
                  difficult, because there's no clear definiton. We decided to
                  use multiple metrics to see whether any of them had an effect.
                </p>
                <p>
                  First, we looked at whether states mandated sex education in
                  public schools, and if the schools choose to teach sex
                  education, whether they mandate including LGBT education. Both
                  of these had no effect. Whether states mandate sex education
                  held a p-value of{" "}
                  <TTest
                    dataLib={dataLib}
                    dataLoc={dataLoc}
                    metric={"Taught"}
                  />
                  , and whether they require LGBT inclusion with sex education
                  held a p-value of{" "}
                  <TTest dataLib={dataLib} dataLoc={dataLoc} metric={"LGBT"} />,
                  just barely above 0.05. Whether or not a state mandates sex
                  education likely has no effect on the sex education titles
                  available at the libraries in that state. We didn't look at
                  every state, and randomly sampling resulted in only 1-2
                  libraries per state, so we cannot come to any conclusion about
                  specific states.
                </p>
                <p>
                  The State's conservativeness may not have an effect on
                  libraries because it is broad enough that it may contain
                  diverse regions within a staunchly partisan state government.
                  An additional test we conducted was whether the library is
                  located in a county that was won by Donald Trump in the 2020
                  presidental election. Through this metric, we found a p-value
                  of{" "}
                  <TTest
                    dataLib={dataLib}
                    dataLoc={dataLoc}
                    metric={"TrumpWin"}
                  />
                  , just barely above the 0.05 threshold. This may also be
                  confounded because Trump won the majority of the rural vote.
                  So conservative counties may have less sex education books
                  because overall, they are simply more rural.
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="sixth">
                <h3>
                  Patrons routinely and consistently request censorship of
                  Public Library materials, but these requests rarely come to
                  fruition
                </h3>
                <p>Info info info</p>
                <br />
                <h3>
                  Interview with Paula, a Public Librarian from a liberal city
                  in the Pacific Northwest
                </h3>
                <AudioPlayer src="https://github.com/Aquite/lis570/blob/main/data/audio/paulaComplaint.mp3?raw=true" />
                <p>Transcript:</p>
                <blockquote style={{ paddingLeft: "4vw" }}>
                  <p>
                    Yes, you know, when I was a new librarian, I think It was
                    like the first year I was a librarian, there was a book that
                    was about lesbian sex, and it was called something like
                    Making Out, and it had, like, really vivid pictures of sex,
                    you know, of women and sex. A patron brought it to me and
                    opened it to a page that she found completely provocative
                    and just said "Why do you have this in the library?" so, you
                    know, I fortunately remained calm and I just said, "you
                    know, we try to have something for everyone. We want to have
                    materials, representing things that everybody needs, this
                    may not be something you need, but we will have a patron who
                    does want to check that out so I recommend that you not" and
                    and it's kind of the nature of things that people, you know,
                    something that they themselves haven't come to understand or
                    gotten comfortable with. They will, like, their first
                    reaction is of course very negative, can be very negative,
                    and like, “I want to get rid of this book because I'm not,
                    you know, comfortable with this material.” And so yeah, I
                    think it happens. I don't know what to say. It happens all
                    the time but I think it's fairly common for people to act on
                    their own fears, like{" "}
                    <a href="https://www.washingtonpost.com/opinions/2021/10/29/schools-are-banning-my-book-queer-kids-need-queer-stories/">
                      Maia Kobabe's Gender Queer thing.
                    </a>
                  </p>
                </blockquote>
                <br />
                <h3>
                  Interview with Rachel, a former Public Librarian from a
                  liberal city in New England
                </h3>
                <AudioPlayer src="https://github.com/Aquite/lis570/blob/main/data/audio/rachelComplaints.mp3?raw=true" />
                <p>Transcript:</p>
                <blockquote style={{ paddingLeft: "4vw" }}>
                  <p>
                    I was more front-facing so I dealt with a lot of patron
                    complaints all the time. It's interesting because, a lot of
                    times, what I would do is I would offer them an outlet for
                    their complaint “oh, well, if you have this idea or if you
                    have this, you know, complaints about the library, we have
                    this form that you can fill out. And it goes directly to
                    people who are actually making these decisions. So that's
                    the way that, you know, if you're, if you've got complaints,
                    you can actually make a, you know, make a difference and
                    make your voice heard.” And people wouldn't take me up on
                    it. All they wanted was to yell at someone, you know, they
                    just wanted to, you know, they just wanted that moment of
                    catharsis. And I thought that was really interesting because
                    that kind of proved to me that people just wanted that
                    moment of catharsis more than they wanted something gone or
                    changed.
                  </p>
                </blockquote>
              </Tab.Pane>
              <Tab.Pane eventKey="seventh">
                <h3>Librarians blah blah blah</h3>
                <p>Info info info</p>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </React.Fragment>
  );
};

export default Survey;

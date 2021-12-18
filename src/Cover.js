import React from "react";
import Card from "react-bootstrap/Card";
import Overlay from "react-bootstrap/Overlay";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Popover from "react-bootstrap/Popover";

const Cover = ({ img, title, author, em, foc }) => {
  return (
    <OverlayTrigger
      key={title}
      placement="top"
      overlay={
        <Popover id={`tooltip-${title}}`}>
          {foc !=
          "Click a marker on the map to show library-specifc results!" ? (
            <Popover.Header
              style={!em ? { backgroundColor: "lightgreen" } : null}
              as="h2"
            >
              {em ? "Missing" : "Included"}
            </Popover.Header>
          ) : null}
          <Popover.Body>
            <i>{title}</i>
            <br />
            {author}
          </Popover.Body>
        </Popover>
      }
    >
      <Card style={{ width: "auto" }}>
        {em ? (
          <Card.Img src={img} alt={"not included: " + title} className="gs" />
        ) : (
          <Card.Img src={img} alt={"included: " + title} />
        )}
      </Card>
    </OverlayTrigger>
  );
};

export default Cover;

/*<Card style={{ width: "auto" }}>
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
                          </Card> */

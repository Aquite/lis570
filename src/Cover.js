import React from "react";
import Card from "react-bootstrap/Card";
import Overlay from "react-bootstrap/Overlay";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Cover = ({ img, title, author, em }) => {
  return (
    <OverlayTrigger
      key={title}
      placement="top"
      overlay={
        <Tooltip id={`tooltip-${title}}`}>
          Title: {title}
          <br />
          Author: {author}
        </Tooltip>
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

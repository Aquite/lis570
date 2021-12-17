import React from "react";
import Card from "react-bootstrap/Card";
import Overlay from "react-bootstrap/Overlay";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Popover from "react-bootstrap/Popover";

const Cover = ({ img, title, author, em }) => {
  return (
    <OverlayTrigger
      key={title}
      placement="top"
      overlay={
        <Popover id={`tooltip-${title}}`}>
          <Popover.Header as="h2">{title}</Popover.Header>
          <Popover.Body>
            Author: {author}
            <br />
            {em ? "Not Included" : "Included"}
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

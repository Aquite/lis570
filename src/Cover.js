import {
  useTooltip,
  useTooltipInPortal,
  TooltipWithBounds,
} from "@visx/tooltip";
import { localPoint } from "@visx/event";
import React from "react";

const Cover = ({ img, title, author, em }) => {
  return (
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
  );
};

export default Cover;

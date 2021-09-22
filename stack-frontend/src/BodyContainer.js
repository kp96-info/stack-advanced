import React from "react";
import { Container } from "react-bootstrap";

export default function BodyContainer(props) {
  return <Container>{props.children}</Container>;
}

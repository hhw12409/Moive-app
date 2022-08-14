import React from "react";
import styled from "styled-components/native";

export const Seperator = styled.View<React.CSSProperties>`
  width: ${(props) => props.width ?? 0};
  height: ${(props) => props.height ?? 0};
`;

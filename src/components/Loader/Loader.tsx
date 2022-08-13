import React from "react";
import { Wrapper } from "./Loader.styles";
import { ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <Wrapper>
      <ActivityIndicator size="large" />
    </Wrapper>
  );
};

export default Loader;

import React from "react";
import styled from "styled-components/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  return (
    <Btn onPress={() => navigate("Stack", { screen: "One" })}>
      <Title>Movies</Title>
    </Btn>
  );
};

export default Movies;

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
  color: ${(props) => props.theme.textColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

import styled from "styled-components/native";
import { FlatList } from "react-native";

export const TrendingScroll = styled.FlatList`
  margin-top: 20px;
` as unknown as typeof FlatList;

export const VSeperator = styled.View`
  height: 20px;
`;

export const HSeperator = styled.View`
  width: 20px;
`;

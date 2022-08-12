import styled from "styled-components/native";
import { FlatList } from "react-native";

export const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ListContainer = styled.View`
  margin-bottom: 40px;
`;

export const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const TrendingScroll = styled.FlatList`
  margin-top: 20px;
` as unknown as typeof FlatList;

export const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

export const VSeperator = styled.View`
  height: 20px;
`;

export const HSeperator = styled.View`
  width: 20px;
`;

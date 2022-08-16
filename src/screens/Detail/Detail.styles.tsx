import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

export const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

export const Background = styled.Image``;

export const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

export const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  width: 80%;
  margin-left: 15px;
  font-weight: 500;
`;

export const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0px;
`;

export const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

export const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

export const Data = styled.View`
  padding: 0px 20px;
`;

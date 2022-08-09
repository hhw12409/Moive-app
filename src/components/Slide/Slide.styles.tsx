import styled from "styled-components/native";

export const BgImg = styled.Image``;

export const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

export const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

export const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"};
`;

export const Votes = styled(Overview)`
  margin-top: 5px;
`;

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Container } from './Detail.styles';

const Detail = ({
  navigation: { setOptions },
  route: {
    params: { originalTitle },
  },
}: any) => {
  useEffect(() => {
    setOptions({
      title: originalTitle,
    });
  }, []);
  console.log(originalTitle);
  return (
    <Container>
      <Text>Detail</Text>
    </Container>
  );
};

export default Detail;

import React from 'react';
import { BlurView } from 'expo-blur';
import { makeImagePath } from '../../utils/utils';
import { TouchableWithoutFeedback, useColorScheme } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { BgImg, Title, Wrapper, Column, Overview, Votes } from './Slide.styles';
import Poster from '../Poster/Poster';
import { useNavigation } from '@react-navigation/native';

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {
        originalTitle,
      },
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg style={StyleSheet.absoluteFill} source={{ uri: makeImagePath(backdropPath) }} />
        <BlurView tint={isDark ? 'dark' : 'light'} intensity={20} style={StyleSheet.absoluteFill}>
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title isDark={isDark}>{originalTitle}</Title>
              <Votes isDark={isDark}>
                {voteAverage > 0 ? `⭐️ ${voteAverage} / 10` : 'Coming soon'}
              </Votes>
              <Overview isDark={isDark}>
                {overview.length > 90 ? overview.slice(0, 90) + '...' : overview}
              </Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;

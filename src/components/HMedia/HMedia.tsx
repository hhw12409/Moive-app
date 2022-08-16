import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { Movie, TV } from '../../apis/apis';
import Poster from '../Poster/Poster';
import Votes from '../Votes/Votes';
import { Container, Title } from './HMedia.styles';

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  fullData: Movie | TV;
}

const HMedia: React.FC<HMediaProps> = ({ posterPath, originalTitle, voteAverage, fullData }) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 12)}
          {originalTitle.length > 12 ? '...' : null}
        </Title>
        <Votes votes={voteAverage} />
      </Container>
    </TouchableOpacity>
  );
};

export default memo(HMedia);

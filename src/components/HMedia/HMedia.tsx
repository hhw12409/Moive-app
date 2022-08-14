import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import Poster from '../Poster/Poster';
import Votes from '../Votes/Votes';
import { Movie, Title } from './HMedia.styles';

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

const HMedia: React.FC<HMediaProps> = ({ posterPath, originalTitle, voteAverage }) => {
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
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 12)}
          {originalTitle.length > 12 ? '...' : null}
        </Title>
        <Votes votes={voteAverage} />
      </Movie>
    </TouchableOpacity>
  );
};

export default memo(HMedia);

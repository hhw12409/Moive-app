import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Movie, moviesApi, TV, tvApi } from '../../apis/apis';
import Poster from '../../components/Poster/Poster';
import { makeImagePath } from '../../utils/utils';
import { Container, Header, Background, Column, Title, Overview, VideoBtn, BtnText, Data } from './Detail.styles';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../../constants/colors';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loader/Loader';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

type RootStackParamList = {
  // screen이름 : Params
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Detail: React.FC<DetailScreenProps> = ({ navigation: { setOptions }, route: { params } }) => {
  const isMovie = 'original_title' in params;
  const { isLoading, data } = useQuery(
    [isMovie ? 'movies' : 'tv', params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );
  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV Show',
    });
  }, []);

  const openYoutubeLink = async (videoId: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  return (
    <Container>
      <Header>
        <Background style={StyleSheet.absoluteFill} source={{ uri: makeImagePath(params.backdrop_path || '') }} />
        <LinearGradient colors={['transparent', COLORS.BLACK_COLOR]} style={StyleSheet.absoluteFill} />
        <Column>
          <Poster path={params.poster_path || ''} />
          <Title>{'original_title' in params ? params.original_title : params.original_name}</Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video: any) => (
          <VideoBtn key={video.key} onPress={() => openYoutubeLink(video.key)}>
            <Ionicons name="logo-youtube" color="white" size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;

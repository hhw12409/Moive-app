import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, Share, Platform } from 'react-native';
import { Movie, MovieDetails, TVDetails, moviesApi, TV, tvApi } from '../../apis/apis';
import Poster from '../../components/Poster/Poster';
import { makeImagePath } from '../../utils/utils';
import { Container, Header, Background, Column, Title, Overview, VideoBtn, BtnText, Data } from './Detail.styles';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../../constants/colors';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loader/Loader';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import SharedButton from '../../components/@shared/SharedButton/SharedButton';

type RootStackParamList = {
  // screen이름 : Params
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Detail: React.FC<DetailScreenProps> = ({ navigation: { setOptions }, route: { params } }) => {
  const isMovie = 'original_title' in params;
  const { isLoading, data } = useQuery<MovieDetails | TVDetails>(
    [isMovie ? 'movies' : 'tv', params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );
  const shareMedia = async () => {
    const isAndroid = Platform.OS === 'android';
    const homepage = isMovie && 'imdb_id' in data! ? `https://www.imdb.com/title/${data.imdb_id}` : data!.homepage;
    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\n Check it out : ${homepage}`,
        title: 'original_title' in params ? params.original_title : params.original_name,
      });
    } else {
      await Share.share({
        url: homepage,
        title: 'original_title' in params ? params.original_title : params.original_name,
      });
    }
  };
  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV Show',
      headerRight: () => <SharedButton onPress={shareMedia} />,
    });
  }, []);
  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <SharedButton onPress={shareMedia} />,
      });
    }
  }, [data]);

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
        {data?.videos?.results?.map((video) => (
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

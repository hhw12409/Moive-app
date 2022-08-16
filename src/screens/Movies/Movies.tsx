import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions, FlatList, View } from 'react-native';
import Slide from '../../components/Slide/Slide';
import VMedia from '../../components/VMedia/VMedia';
import { QueryClient, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { MovieResponse, moviesApi } from '../../apis/apis';
import Loader from '../../components/Loader/Loader';
import { ListContainer } from '../../components/@shared/ListContainer/ListContainer.styles';
import { ComingSoonTitle } from '../../components/@shared/ComingSoonTitle/ComingSoonTitle.styles';
import { Seperator } from '../../components/@shared/Seperator/Seperator.styles';
import HList from '../../components/HList/HList';

const queryClinet = new QueryClient();

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery<MovieResponse>(
    ['movies', 'nowPlaying'],
    moviesApi.getNowPlaying
  );
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<MovieResponse>(['movies', 'upcoming'], moviesApi.getUpComing, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });
  const { isLoading: trendingLoading, data: trendingData } = useQuery<MovieResponse>(
    ['movies', 'trending'],
    moviesApi.getTrending
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClinet.refetchQueries(['movies']);
    setRefreshing(false);
  };

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderFooterComponent = (isFetchingNextPage: boolean) => {
    return isFetchingNextPage ? <Loader /> : null;
  };

  return loading ? (
    <Loader />
  ) : (
    <FlatList
      onEndReached={loadMore}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={(item) => String(item.id)}
      data={upcomingData!.pages.map((page) => page.results).flat()}
      ItemSeparatorComponent={() => <Seperator height="20px" />}
      ListFooterComponent={renderFooterComponent(isFetchingNextPage)}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsPagination={false}
            containerStyle={{
              marginBottom: 30,
              width: '100%',
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData!.results.map((movie) => {
              return (
                <Slide
                  key={movie.id}
                  backdropPath={movie.backdrop_path || ''}
                  posterPath={movie.poster_path || ''}
                  originalTitle={movie.original_title}
                  voteAverage={movie.vote_average}
                  overview={movie.overview}
                  fullData={movie}
                />
              );
            })}
          </Swiper>
          <ListContainer>
            {trendingData ? <HList title="Trending Movies" data={trendingData?.results} /> : null}
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      // 첫번째 && 가장 바깥의 FlatList의 renderItem
      renderItem={({ item }) => (
        <>
          <VMedia
            posterPath={item.poster_path || ''}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
            fullData={item}
          />
        </>
      )}
    />
  );
};

export default Movies;

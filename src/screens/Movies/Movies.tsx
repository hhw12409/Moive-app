import React from "react";
import Swiper from "react-native-swiper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, ActivityIndicator, FlatList } from "react-native";
import Slide from "../../components/Slide/Slide";
import HMedia from "../../components/HMedia/HMedia";
import VMedia from "../../components/VMedia/VMedia";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { MoiveResponse, moviesApi } from "../../apis/apis";
import {
  Loader,
  ListContainer,
  ListTitle,
  TrendingScroll,
  ComingSoonTitle,
  VSeperator,
  HSeperator,
} from "./Movie.style";

const queryClinet = new QueryClient();

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MoiveResponse>(
    ["movies", "nowPlaying"],
    moviesApi.getNowPlaying
  );
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpComing,
  } = useQuery<MoiveResponse>(["movies", "upcoming"], moviesApi.getUpComing);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MoiveResponse>(["movies", "trending"], moviesApi.getTrending);

  const onRefresh = async () => {
    await queryClinet.refetchQueries(["movies"]);
  };

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpComing || isRefetchingTrending;
  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
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
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData!.results.map((movie) => {
              return (
                <Slide
                  key={movie.id}
                  backdropPath={movie.backdrop_path || ""}
                  posterPath={movie.poster_path || ""}
                  originalTitle={movie.original_title}
                  voteAverage={movie.vote_average}
                  overview={movie.overview}
                />
              );
            })}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              horizontal
              contentContainerStyle={{ paddingHorizontal: 30 }}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={HSeperator}
              keyExtractor={(item) => String(item.id)}
              data={trendingData!.results}
              renderItem={({ item }) => (
                <HMedia
                  posterPath={item.poster_path || ""}
                  originalTitle={item.original_title}
                  voteAverage={item.vote_average}
                />
              )}
            />
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      keyExtractor={(item) => String(item.id)}
      data={upcomingData!.results}
      ItemSeparatorComponent={VSeperator}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path || ""}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  );
};

export default Movies;

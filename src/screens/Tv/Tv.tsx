import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ScrollView, FlatList } from "react-native";
import { tvApi } from "../../apis/apis";
import HList from "../../components/HList/HList";
import HMedia from "../../components/HMedia/HMedia";
import Loader from "../../components/Loader/Loader";

const Tv = () => {
  const { isLoading: todayLoading, data: todayData } = useQuery(
    ["tv", "today"],
    tvApi.getAiringToday
  );
  const { isLoading: topLoading, data: topData } = useQuery(
    ["tv", "top"],
    tvApi.getTopRated
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["tv", "trending"],
    tvApi.getTrending
  );
  const loading = todayLoading || topLoading || trendingLoading;
  if (loading) {
    return <Loader />;
  }
  return (
    <ScrollView>
      <HList title="Trending Tv">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={trendingData.results}
          renderItem={({ item }) => (
            <HMedia
              posterPath={item.poster_path}
              originalTitle={item.original_name}
              voteAverage={item.vote_average}
            />
          )}
        />
      </HList>
      <HList title="Airing Today">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={todayData.results}
          renderItem={({ item }) => (
            <HMedia
              posterPath={item.poster_path}
              originalTitle={item.original_name}
              voteAverage={item.vote_average}
            />
          )}
        />
      </HList>
      <HList title="Top Rated TV">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={topData.results}
          renderItem={({ item }) => (
            <HMedia
              posterPath={item.poster_path}
              originalTitle={item.original_name}
              voteAverage={item.vote_average}
            />
          )}
        />
      </HList>
    </ScrollView>
  );
};

export default Tv;

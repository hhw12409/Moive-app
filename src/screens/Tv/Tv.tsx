import { QueryClient, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { tvApi } from '../../apis/apis';
import HList from '../../components/HList/HList';
import Loader from '../../components/Loader/Loader';

const Tv = () => {
  const queryClinet = new QueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: todayLoading, data: todayData } = useQuery(['tv', 'today'], tvApi.getAiringToday);
  const { isLoading: topLoading, data: topData } = useQuery(['tv', 'top'], tvApi.getTopRated);
  const { isLoading: trendingLoading, data: trendingData } = useQuery(['tv', 'trending'], tvApi.getTrending);
  const loading = todayLoading || topLoading || trendingLoading;
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClinet.refetchQueries(['tv']);
    setRefreshing(false);
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 30 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <HList title="Trending TV" data={trendingData!.results} />
      <HList title="Airing Today" data={todayData!.results} />
      <HList title="Top Rated TV" data={topData!.results} />
    </ScrollView>
  );
};

export default Tv;

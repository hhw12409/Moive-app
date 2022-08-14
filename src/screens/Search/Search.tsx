import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { moviesApi, tvApi } from '../../apis/apis';
import HList from '../../components/HList/HList';
import Loader from '../../components/Loader/Loader';
import { Container, SearchInput } from './Search.style';

const Search = () => {
  const [query, setQuery] = useState('');
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(['searchMoives', query], moviesApi.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(['searchTv', query], tvApi.search, {
    enabled: false,
  });
  const onChangeText = (text: string) => {
    setQuery(text);
  };
  const onSubmit = () => {
    if (query === '') {
      return;
    }
    searchMovies();
    searchTv();
  };
  // const loading = moviesLoading || tvLoading;
  return (
    <Container>
      <SearchInput
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesData ? <HList title="Movie Results" data={moviesData.results} /> : null}
      {tvData ? <HList title="TV Results" data={tvData.results} /> : null}
    </Container>
  );
};

export default Search;

import React, { memo } from 'react';
import { FlatList, VirtualizedList } from 'react-native';
import { ListContainer } from '../@shared/ListContainer/ListContainer.styles';
import { ListTitle } from '../@shared/ListTitle/ListTitle.styles';
import { Seperator } from '../@shared/Seperator/Seperator.styles';
import HMedia from '../HMedia/HMedia';
import { Movie, TV } from '../../apis/apis';

interface HListProps {
  title: string;
  data: Movie[] | TV[];
}

const HList: React.FC<HListProps> = ({ title, data }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        ItemSeparatorComponent={() => <Seperator width="20px" />}
        data={data}
        keyExtractor={(item: Movie | TV) => String(item.id)}
        renderItem={({ item }: { item: Movie | TV }) => (
          <HMedia
            posterPath={item.poster_path || ''}
            originalTitle={'original_title' in item ? item.original_title : item.original_name}
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};

export default memo(HList);

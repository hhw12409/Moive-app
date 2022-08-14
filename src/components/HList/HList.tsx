import React, { memo } from "react";
import { FlatList } from "react-native";
import { ListContainer } from "../@shared/ListContainer/ListContainer.styles";
import { ListTitle } from "../@shared/ListTitle/ListTitle.styles";
import { Seperator } from "../@shared/Seperator/Seperator.styles";
import HMedia from "../HMedia/HMedia";

// interface Tv {
//   backdrop_path: string | null;
//   first_air_date?: string;
//   genre_ids: number[];
//   id: number;
//   name?: string;
//   origin_country?: string[];
//   original_language: string;
//   original_name?: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string | null;
//   vote_average: number;
//   vote_count: number;
// }
interface HListProps {
  title: string;
  data: any[];
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
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <HMedia
            posterPath={item.poster_path || ""}
            originalTitle={item.original_title ?? item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
    </ListContainer>
  );
};

export default memo(HList);

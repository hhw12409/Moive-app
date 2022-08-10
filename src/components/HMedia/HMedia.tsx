import React, { memo } from "react";
import Poster from "../Poster/Poster";
import Votes from "../Votes/Votes";
import { Movie, Title } from "./HMedia.styles";

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  return (
    <Movie>
      <Poster path={posterPath} />
      <Title>
        {originalTitle.slice(0, 12)}
        {originalTitle.length > 12 ? "..." : null}
      </Title>
      <Votes votes={voteAverage} />
    </Movie>
  );
};

export default memo(HMedia);

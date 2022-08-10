import React, { memo } from "react";
import Poster from "../Poster/Poster";
import Votes from "../Votes/Votes";
import { VMovie, VColumn, Overview, Release, Title } from "./VMedia.styles";

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
  voteAverage,
}) => {
  return (
    <VMovie>
      <Poster path={posterPath} />
      <VColumn>
        <Title>
          {originalTitle.length > 30
            ? `${originalTitle.slice(0, 30)}...`
            : originalTitle}
        </Title>
        {releaseDate ? (
          <Release>
            {new Date(releaseDate).toLocaleDateString("ko", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Release>
        ) : null}
        {voteAverage ? <Votes votes={voteAverage} /> : null}
        <Overview>
          {overview !== "" && overview.length > 140
            ? `${overview.slice(0, 140)}...`
            : overview}
        </Overview>
      </VColumn>
    </VMovie>
  );
};

export default memo(VMedia);

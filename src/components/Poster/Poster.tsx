import React from "react";
import { makeImagePath } from "../../utils/utils";
import { Image } from "./Poster.styles";

interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => {
  return <Image source={{ uri: makeImagePath(path) }} />;
};

export default Poster;

import React from "react";
import { Text } from "./Votes.styles";

interface VotesProps {
  votes: number;
}

const Votes: React.FC<VotesProps> = ({ votes }) => (
  <Text>{votes > 0 ? `⭐️ ${votes.toFixed(1)} / 10` : `Coming soon`}</Text>
);
export default Votes;

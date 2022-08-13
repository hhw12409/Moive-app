import React from "react";
import { ListContainer } from "../@shared/ListContainer/ListContainer.styles";
import { ListTitle } from "../@shared/ListTitle/ListTitle.styles";

interface HListProps {
  title: string;
  children: HTMLElement;
}

const HList: React.FC<HListProps> = ({ title, children }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      {children}
    </ListContainer>
  );
};

export default HList;

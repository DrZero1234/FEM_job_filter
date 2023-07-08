import { styled } from "styled-components";
import { ActiveFilterButton } from "./ActiveFilterButton";



const FilterWrapper = styled.div`
  display: ${(props) => props.$currentFilters.length > 0 ? "flex" : "none"};
  justify-content: space-between;
  padding: 2rem;
  border: 3px solid black;
  width: 100%;
  align-items: center;
  background-color: white;
`;

const FilterButtonList = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 1rem;
`;

const ClearAllText = styled.a`
  color: ${(props) => props.theme.primary_500};
  font-weight: ${(props) => props.theme.fw_bold};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const FilterTab = ({currentFilters,clearFilters}) => {
  return (
    <FilterWrapper $currentFilters = {currentFilters}>
      <FilterButtonList>
        {currentFilters.map((filter) => (
          <ActiveFilterButton text={filter} />
        ))}
      </FilterButtonList>
      <ClearAllText
        href="#"
        onClick={(e) => clearFilters(e)}
      >
        Clear
      </ClearAllText>
    </FilterWrapper>
  );
};

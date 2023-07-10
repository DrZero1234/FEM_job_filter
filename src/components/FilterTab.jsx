import { isStyledComponent, styled } from "styled-components";
import { ActiveFilterButton } from "./ActiveFilterButton";



const FilterWrapper = styled.div`
  display: flex;
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
  justify-self: flex-end;
  &:hover {
    text-decoration: underline;
  }
`;

export const FilterTab = ({currentFilters,clearFilters,removeFilter}) => {
  const current_filter_keys = Object.keys(currentFilters);
  // Checks if every key is empty in the currentFilters state

  const isEmpty = current_filter_keys.every((key) => currentFilters[key].length < 1);


  return(
  <>
  {/* Only renders the FilterTab if there is an activeFilter */}

  {/* Currently cant remove languages or tools key so its buggy */}
    {!isEmpty && 
      <FilterWrapper>
        <FilterButtonList>
          {current_filter_keys.map((key) => (
            <ActiveFilterButton
              value={currentFilters[key]}
              filter_key={key}
              removeFilter={removeFilter}
            />
          ))}
        </FilterButtonList>
        <ClearAllText href="#" onClick={(e) => clearFilters(e)}>
          Clear
        </ClearAllText>
      </FilterWrapper>
    }
  </>
  )
}

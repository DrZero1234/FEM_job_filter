import { isStyledComponent, styled } from "styled-components";
import ActiveFilterButton from "./ActiveFilterButton";
import { PropTypes } from "prop-types";



const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  width: 100%;
  align-items: center;
  background-color: white;
`;

const FilterButtonList = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ClearAllText = styled.a`

  color: ${(props) => props.theme.primary_500};
  font-size: ${(props) => props.theme.fs_title};
  text-decoration: none;
  justify-self: flex-end;
  &:hover {
    text-decoration: underline;
  }
`;

const FilterTab = ({currentFilters,clearFilters,removeFilter}) => {
  const current_filter_keys = Object.keys(currentFilters);
  // Checks if every key is empty in the currentFilters state

  // Checks if the current Filter object dont have any value in it
  const isEmpty = current_filter_keys.every((key) => currentFilters[key].length < 1);


  return (
    <>
      {/* Only renders the FilterTab if there is an activeFilter */}
      {!isEmpty && (
        <FilterWrapper>
          <FilterButtonList>
            {current_filter_keys.map((key) => (
              <>
                <ActiveFilterButton
                  value={currentFilters[key]}
                  filter_key={key}
                  removeFilter={removeFilter}
                />
              </>
            ))}
          </FilterButtonList>
          <ClearAllText href="#" onClick={(e) => clearFilters(e)}>
            Clear
          </ClearAllText>
        </FilterWrapper>
      )}
    </>
  );
}

FilterTab.propTypes = {
  currentFilters: PropTypes.object.isRequired,
  clearFilters: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
}

export default FilterTab

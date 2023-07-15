import { styled } from "styled-components";
import { PropTypes } from "prop-types";

const FilterButton = styled.button`
  background-color: ${(props) => props.theme.neutral[800]};
  color: ${(props) => props.theme.primary_500};
  padding: ${(props) => props.theme.padding_btn_lg};
  font-weight: ${(props) => props.theme.fw_bold};
  font-size: ${(props) => props.theme.fs_status_btn};
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background-color: ${(props) => props.theme.primary_500};
    color: ${(props) => props.theme.neutral[800]};
  }
  @media (max-width: 40em) {
    white-space: pre-wrap;
  }
`;



// Generates a button from the position,role,languages,roles keys
// By clicking these button the key value will be added to the filters
const JobFilterButton =  ({btn_key,value,addFilter }) =>  {
  return(
    <>
      {typeof value !== "object" ? <li><FilterButton onClick={() => addFilter(btn_key,value)}>{value}</FilterButton> </li> :
      value.map(val => (
        <li><FilterButton onClick={() => addFilter(btn_key,val)}>{val}</FilterButton></li>
      ))
      }
    </>
  )
}

JobFilterButton.propTypes =  {
  btn_key: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  addFilter: PropTypes.func.isRequired
};


export default JobFilterButton

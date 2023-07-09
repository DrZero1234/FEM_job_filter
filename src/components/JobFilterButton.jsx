import { styled } from "styled-components";

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
`;


const addFilter = (e) => {
  console.log(e.target)
};


export const JobFilterButton = ({btn_key,value }) => {


  return(
    <>
      {typeof value !== "object" ? <li><FilterButton onClick={(e) => addFilter(e)}>{value}</FilterButton> </li> :
      value.map(val => (
        <li><FilterButton onClick={(e) => addFilter(e)}>{val}</FilterButton></li>
      ))
      }
    </>
  )
};

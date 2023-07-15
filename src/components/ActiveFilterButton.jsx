import removeFilterImg from "../assets/icon-remove.svg";
import { styled } from "styled-components";
import {PropTypes} from "prop-types";



const ActiveFilterWrapper = styled.div`
    display: flex;
    font-weight: ${(props) => props.theme.fw_bold};
    font-size: ${(props) => props.theme.fs_status_btn};
  `;

const ActiveFilterDiv = styled.div`
    background-color: ${(props) => props.theme.neutral[800]};
    color: ${(props) => props.theme.primary_500};
    padding: ${(props) => props.theme.padding_btn_lg};
  `;

const ActiveFilterCloseBtn = styled.button`
    background-color: ${(props) => props.theme.primary_500};
    padding: ${(props) => props.theme.padding_btn_lg};
    border: none;
    &:hover {
      background-color: ${(props) => props.theme.neutral[200]};
      cursor: pointer;
    }
  `;



function ActiveFilterButton ({filter_key,value,removeFilter})  {


  // Only returns the filters that has at least one character as a value
  if (value.length) {
    return (
      <>
        {/* If the value is string (this case the key is role or position) */}
        {typeof value === "string" ? (
          <ActiveFilterWrapper>
            <ActiveFilterDiv>{value}</ActiveFilterDiv>
            <ActiveFilterCloseBtn
              onClick={() => removeFilter(filter_key)}
            >
              <img src={removeFilterImg} alt="remove filter" />
            </ActiveFilterCloseBtn>
          </ActiveFilterWrapper>
        ) : (
          // Returns a button of every value of the languages or roles key
          value.map((val) => (
            <ActiveFilterWrapper>
              <ActiveFilterDiv>{val}</ActiveFilterDiv>
              <ActiveFilterCloseBtn
                onClick={() => removeFilter(filter_key,val)}
              >
                <img src={removeFilterImg} alt="remove filter" />
              </ActiveFilterCloseBtn>
            </ActiveFilterWrapper>
          ))
        )}
      </>
    );
  }
}

ActiveFilterButton.propTypes = {
  filter_key: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  removeFilter: PropTypes.func.isRequired

}

export default ActiveFilterButton;
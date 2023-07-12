import removeFilterImg from "../assets/icon-remove.svg";
import { styled } from "styled-components";


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

export const ActiveFilterButton = ({filter_key,value,removeFilter}) => {


  
  if (value.length) {
    return (
      <>
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
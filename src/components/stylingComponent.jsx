import styled from "styled-components";
import Card from "@mui/material/Card";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

export const StyledCard = styled(Card)`
  margin: auto;
  text-align: left;
  width: 15rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: white;
`;

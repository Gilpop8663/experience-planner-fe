import { gql } from "@apollo/client";

export const GET_USER_COUNT = gql`
  query {
    getUserCount {
      ok
      error
      count
    }
  }
`;

export const GET_ACTIVE_USER_COUNT = gql`
  query {
    getActiveUserCount {
      ok
      error
      count
    }
  }
`;

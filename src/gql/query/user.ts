import { gql } from "@apollo/client";

export const CREATE_ACCOUNT = gql`
  mutation ($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }
`;

// 내 정보 조회
export const ME = gql`
  query {
    me {
      id
      email
      nickname
      point
      createdAt
      updatedAt
    }
  }
`;

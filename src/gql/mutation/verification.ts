import { gql } from "@apollo/client";

export const SEND_VERIFY_EMAIL = gql`
  mutation ($input: SendVerifyEmailInput!) {
    sendVerifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation ($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

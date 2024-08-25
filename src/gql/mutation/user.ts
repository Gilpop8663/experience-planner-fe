import { gql } from "@apollo/client";

export const CREATE_ACCOUNT = gql`
  mutation ($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }
`;

export const CHECK_EMAIL = gql`
  mutation ($input: CheckEmailInput!) {
    checkEmail(input: $input) {
      ok
      error
    }
  }
`;

export const CHECK_NICKNAME = gql`
  mutation ($input: CheckNicknameInput!) {
    checkNickname(input: $input) {
      ok
      error
    }
  }
`;

export const LOGIN = gql`
  mutation ($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation ($input: DeleteAccountInput!) {
    deleteAccount(input: $input) {
      ok
      error
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      ok
      error
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      ok
      error
    }
  }
`;

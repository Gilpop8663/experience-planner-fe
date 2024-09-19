import { gql } from "@apollo/client";

// 캠페인 링크로 생성
export const CREATE_CAMPAIGN_FROM_LINK = gql`
  mutation ($input: CreateCampaignFromLinkInput!) {
    createCampaignFromLink(input: $input) {
      ok
      error
      campaignId
    }
  }
`;

// 캠페인 직접 생성
export const CREATE_CAMPAIGN_DIRECTLY = gql`
  mutation ($input: CreateCampaignDirectlyInput!) {
    createCampaignDirectly(input: $input) {
      ok
      error
      campaignId
    }
  }
`;

// 강남맛집 본문 캠페인 생성
export const CREATE_GANGNAM_CAMPAIGN = gql`
  mutation ($input: CreateGangnamCampaignInput!) {
    createGangnamCampaign(input: $input) {
      ok
      error
      campaignId
    }
  }
`;

// 캠페인 수정
export const EDIT_CAMPAIGN = gql`
  mutation ($input: EditCampaignInput!) {
    editCampaign(input: $input) {
      ok
      error
    }
  }
`;

// 캠페인 삭제
export const DELETE_CAMPAIGN = gql`
  mutation ($input: DeleteCampaignInput!) {
    deleteCampaign(input: $input) {
      ok
      error
    }
  }
`;

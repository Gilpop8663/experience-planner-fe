import { gql } from "@apollo/client";

// 캠페인 리스트 조회 (캘린더 기준)
export const GET_CALENDAR_CAMPAIGN_LIST = gql`
  query ($input: GetCalendarCampaignListInput!) {
    getCalendarCampaignList(input: $input) {
      ok
      error
      data {
        id
        title
        platformName
        thumbnailUrl
        isReserved
        reservationDate
        reviewDeadline
        serviceDetails
        serviceAmount
        extraAmount
        location
        detailedViewLink
        updatedAt
        createdAt
      }
    }
  }
`;

// 남은 마감기한으로 정렬된 캠페인 리스트 조회
export const GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE = gql`
  query {
    getCampaignListSortedByDeadline {
      ok
      error
      data {
        id
        title
        platformName
        thumbnailUrl
        isReserved
        reservationDate
        reviewDeadline
        serviceDetails
        serviceAmount
        extraAmount
        location
        detailedViewLink
        updatedAt
        createdAt
      }
    }
  }
`;

// 마감기한이 지난 캠페인 리스트 조회
export const GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE = gql`
  query {
    getExpiredCampaignListSortedByDeadline {
      ok
      error
      data {
        id
        title
        platformName
        thumbnailUrl
        isReserved
        reservationDate
        reviewDeadline
        serviceDetails
        serviceAmount
        extraAmount
        location
        detailedViewLink
        updatedAt
        createdAt
      }
    }
  }
`;

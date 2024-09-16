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

export const GET_CAMPAIGN_DETAIL = gql`
  query ($input: GetCampaignDetailInput!) {
    getCampaignDetail(input: $input) {
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

export const GET_SPONSORSHIP_COST_AND_CONSUMPTION = gql`
  query ($input: GetSponsorshipCostAndConsumptionInput!) {
    getSponsorshipCostAndConsumption(input: $input) {
      ok
      error
      sponsorshipCost
      consumptionCost
    }
  }
`;

// 총 협찬 비용과 소비한 금액 가져오기
export const GET_TOTAL_SPONSORSHIP_COST_AND_CONSUMPTION = gql`
  query {
    getTotalSponsorshipCostAndConsumption {
      ok
      error
      totalSponsorshipCost
      totalConsumptionCost
    }
  }
`;

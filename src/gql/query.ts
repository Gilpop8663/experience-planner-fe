import { gql } from "@apollo/client";

export const GET_COMMENT_BY_ID = gql`
  query ($videoId: Float!, $sortingType: String!) {
    getCommentsByVideoId(videoId: $videoId, sortingType: $sortingType) {
      id
      content
      createdAt
      dislikes
      likes
      nickname
      updatedAt
      replies {
        id
        nickname
        content
        createdAt
        dislikes
        likes
        updatedAt
      }
    }
  }
`;

export const GET_ALL_VIDEOS = gql`
  query {
    getAllVideos {
      id
      videoUrl
      createdAt
      updatedAt
      likes
      dislikes
      comments {
        id
        content
        nickname
      }
    }
  }
`;

export const GET_VIDEO_DETAIL = gql`
  query ($videoId: Float!) {
    getVideoDetailById(videoId: $videoId) {
      id
      createdAt
      updatedAt
      likes
      dislikes
      videoUrl
    }
  }
`;

export const HEALTH_CHECK = gql`
  query {
    healthCheck {
      ok
    }
  }
`;

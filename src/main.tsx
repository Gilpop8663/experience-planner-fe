import "./input.css";
import "@/styles/embla.css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/calendar.css"; // 커스텀 스타일 적용

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink,
  ApolloLink,
  Observable,
  FetchResult,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";
import { ACCESS_TOKEN } from "./constants/localStorage.ts";
import { onError } from "@apollo/client/link/error";
import PortalToastContainer from "./components/Toast/PortalToastContainer.tsx";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary.tsx";
import InstallPwaPrompt from "./components/InstallPwaPrompt.tsx";

interface RefreshTokenResult {
  data: {
    refreshToken: {
      ok: boolean;
      error?: string;
      token?: string;
    };
  };
}

const fetchUrl = process.env.VITE_DB_URL || "http://localhost:3000/graphql";

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === "UNAUTHENTICATED") {
        // Apollo Server sets code to UNAUTHENTICATED
        // when an AuthenticationError is thrown in a resolver
        return new Observable<FetchResult>((observer) => {
          fetch(fetchUrl, {
            // GraphQL 엔드포인트에 요청
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`, // 기존 토큰
            },
            body: JSON.stringify({
              query: `
                mutation RefreshToken {
                  refreshToken {
                    ok
                    error
                    token
                  }
                }
              `,
            }),
            credentials: "include",
          })
            .then((response) => response.json())
            .then((result: RefreshTokenResult) => {
              if (!result.data.refreshToken.ok) {
                window.location.href = "/login";
                return;
              }

              const newAccessToken = result.data.refreshToken.token ?? "";

              localStorage.setItem(ACCESS_TOKEN, newAccessToken);

              // 새로운 액세스 토큰으로 헤더 설정
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });

              // 원래의 요청을 새로운 토큰으로 재시도
              forward(operation).subscribe({
                next: (result) => observer.next(result),
                error: (err) => observer.error(err),
                complete: () => observer.complete(),
              });
            })
            .catch((refreshError) => {
              console.error("Refresh token request failed:", refreshError);
              window.location.href = "/login";
            });
        });
        // Retry the request, returning the new observable
      }
    }

    return forward(operation);
  }
});

const httpLink = new HttpLink({
  uri: fetchUrl,
  credentials: "include",
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "", // 올바른 헤더 설정
    },
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
      <InstallPwaPrompt />
      <PortalToastContainer />
    </React.StrictMode>
  </ApolloProvider>,
);

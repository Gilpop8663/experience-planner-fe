import { makeVar } from "@apollo/client";

export type SortingType = "popular" | "newest";

export const sortOrderVar = makeVar<SortingType>("popular");

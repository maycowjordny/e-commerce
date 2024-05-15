import { Theme } from "@mui/material";
import merge from 'lodash/merge';
import { cssBaseline } from "./css-baseline";

export function componentsOverrides(theme: Theme) {
  const components = merge(
    cssBaseline(theme),
  );

  return components;
}

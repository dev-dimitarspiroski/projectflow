export const classCombiner = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

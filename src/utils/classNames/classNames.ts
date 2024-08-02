type Mods = Record<string, boolean | string>;

export default function classNames(
  mainClass: string,
  mods: Mods = {},
  additionalClasses: string[] = []
): string {
  return [
    mainClass,
    ...additionalClasses.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(" ");
}

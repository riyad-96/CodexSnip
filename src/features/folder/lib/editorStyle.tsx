import type { CSSProperties } from 'react';
// Theme imports
import {
  dracula,
  okaidia,
  nightOwl,
  darcula,
  coy,
  solarizedlight,
  materialLight,
  atomDark,
  base16AteliersulphurpoolLight,
  coldarkCold,
  coldarkDark,
  gruvboxDark,
  gruvboxLight,
  materialDark,
  materialOceanic,
  nord,
  oneDark,
  oneLight,
  prism,
  solarizedDarkAtom,
  tomorrow,
  twilight,
  vscDarkPlus,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

export type SupportedThemesType = {
  name: string;
  import: unknown;
  value: string;
};

export const supportedThemes: SupportedThemesType[] = [
  { name: 'Coy', value: 'coy', import: coy },
  { name: 'Material Light', value: 'materialLight', import: materialLight },
  { name: 'One Light', value: 'oneLight', import: oneLight },
  {
    name: 'Base16 Atelier Sulphurpool Light',
    value: 'base16AteliersulphurpoolLight',
    import: base16AteliersulphurpoolLight,
  },
  { name: 'Coldark Cold', value: 'coldarkCold', import: coldarkCold },
  { name: 'Gruvbox Light', value: 'gruvboxLight', import: gruvboxLight },
  { name: 'Solarized Light', value: 'solarizedlight', import: solarizedlight },
  { name: 'Dracula', value: 'dracula', import: dracula },
  { name: 'Atom Dark', value: 'atomDark', import: atomDark },
  { name: 'Darcula', value: 'darcula', import: darcula },
  { name: 'Material Dark', value: 'materialDark', import: materialDark },
  { name: 'Okaidia', value: 'okaidia', import: okaidia },
  { name: 'One Dark', value: 'oneDark', import: oneDark },
  { name: 'Night Owl', value: 'nightOwl', import: nightOwl },
  { name: 'Coldark Dark', value: 'coldarkDark', import: coldarkDark },
  { name: 'Gruvbox Dark', value: 'gruvboxDark', import: gruvboxDark },
  {
    name: 'Material Oceanic',
    value: 'materialOceanic',
    import: materialOceanic,
  },
  { name: 'Nord', value: 'nord', import: nord },
  { name: 'Prism', value: 'prism', import: prism },
  {
    name: 'Solarized Dark Atom',
    value: 'solarizedDarkAtom',
    import: solarizedDarkAtom,
  },
  { name: 'Tomorrow', value: 'tomorrow', import: tomorrow },
  { name: 'Twilight', value: 'twilight', import: twilight },
  { name: 'VSC Dark Plus', value: 'vscDarkPlus', import: vscDarkPlus },
];

export type PrismTheme = { [key: string]: CSSProperties };

export function getStyle(style: string | undefined): PrismTheme {
  const requestedStyle = supportedThemes.find((t) => t.value === style);
  return (requestedStyle?.import as PrismTheme) || dracula;
}

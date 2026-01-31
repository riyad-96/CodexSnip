import html from 'react-syntax-highlighter/dist/esm/languages/prism/xml-doc';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import sass from 'react-syntax-highlighter/dist/esm/languages/prism/sass';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import md from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import regex from 'react-syntax-highlighter/dist/esm/languages/prism/regex';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import php from 'react-syntax-highlighter/dist/esm/languages/prism/php';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import kotlin from 'react-syntax-highlighter/dist/esm/languages/prism/kotlin';
import swift from 'react-syntax-highlighter/dist/esm/languages/prism/swift';
import dart from 'react-syntax-highlighter/dist/esm/languages/prism/dart';
import ruby from 'react-syntax-highlighter/dist/esm/languages/prism/ruby';
import r from 'react-syntax-highlighter/dist/esm/languages/prism/r';
import haskell from 'react-syntax-highlighter/dist/esm/languages/prism/haskell';
import zig from 'react-syntax-highlighter/dist/esm/languages/prism/zig';
import lua from 'react-syntax-highlighter/dist/esm/languages/prism/lua';
import docker from 'react-syntax-highlighter/dist/esm/languages/prism/docker';

export type SupportedLanguagesType = {
  name: string;
  import: unknown;
  value: string;
};

export const supportedLanguages: SupportedLanguagesType[] = [
  { name: 'Text', import: 'text', value: 'plaintext' },
  { name: 'HTML', import: html, value: 'html' },
  { name: 'CSS', import: css, value: 'css' },
  { name: 'Sass', import: sass, value: 'sass' },
  { name: 'JavaScript', import: js, value: 'javascript' },
  { name: 'JSX', import: jsx, value: 'jsx' },
  { name: 'TypeScript', import: ts, value: 'typescript' },
  { name: 'TSX', import: tsx, value: 'tsx' },
  { name: 'JSON', import: json, value: 'json' },
  { name: 'Bash', import: bash, value: 'bash' },
  { name: 'SQL', import: sql, value: 'sql' },
  { name: 'Markdown', import: md, value: 'markdown' },
  { name: 'YAML', import: yaml, value: 'yaml' },
  { name: 'Regex', import: regex, value: 'regex' },
  { name: 'Python', import: python, value: 'python' },
  { name: 'Java', import: java, value: 'java' },
  { name: 'C', import: c, value: 'c' },
  { name: 'C++', import: cpp, value: 'cpp' },
  { name: 'C#', import: csharp, value: 'csharp' },
  { name: 'PHP', import: php, value: 'php' },
  { name: 'Go', import: go, value: 'go' },
  { name: 'Rust', import: rust, value: 'rust' },
  { name: 'Kotlin', import: kotlin, value: 'kotlin' },
  { name: 'Swift', import: swift, value: 'swift' },
  { name: 'Dart', import: dart, value: 'dart' },
  { name: 'Ruby', import: ruby, value: 'ruby' },
  { name: 'R', import: r, value: 'r' },
  { name: 'Haskell', import: haskell, value: 'haskell' },
  { name: 'Zig', import: zig, value: 'zig' },
  { name: 'Lua', import: lua, value: 'lua' },
  { name: 'Dockerfile', import: docker, value: 'docker' },
];

export function getLanguage(lang: string) {
  const requestedLang = supportedLanguages.find((l) => l.value === lang);
  return requestedLang;
}

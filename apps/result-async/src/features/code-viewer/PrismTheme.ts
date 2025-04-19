export interface PrismThemeStyles {
  background: string;
  text: string;
  selection: string;
  selectionMatch: string;
  lineHighlight: string;
  lineNumber: string;
  lineNumberGutter: string;
  
  comment: string;
  punctuation: string;
  property: string;
  operator: string;
  keyword: string;
  string: string;
  number: string;
  boolean: string;
  variable: string;
  function: string;
  className: string;
  tag: string;
  attrName: string;
  attrValue: string;
  deleted: string;
  inserted: string;
  changed: string;
  regex: string;
}

export interface PrismTheme {
  light: PrismThemeStyles;
  dark: PrismThemeStyles;
}

export const defaultTheme: PrismTheme = {
  light: {
    background: '#ffffff',
    text: '#383a42',
    selection: '#e5e5e6',
    selectionMatch: '#e5e5e6',
    lineHighlight: 'rgba(0, 0, 0, 0.05)',
    lineNumber: '#9d9d9f',
    lineNumberGutter: '#fafafa',
    
    comment: '#a0a1a7',
    punctuation: '#383a42',
    property: '#4078f2',
    operator: '#a626a4',
    keyword: '#a626a4',
    string: '#50a14f',
    number: '#986801',
    boolean: '#986801',
    variable: '#e45649',
    function: '#4078f2',
    className: '#c18401',
    tag: '#e45649',
    attrName: '#986801',
    attrValue: '#50a14f',
    deleted: '#e45649',
    inserted: '#50a14f',
    changed: '#c18401',
    regex: '#50a14f',
  },
  dark: {
    background: '#282c34',
    text: '#abb2bf',
    selection: '#3e4451',
    selectionMatch: '#3e4451',
    lineHighlight: 'rgba(255, 255, 255, 0.1)',
    lineNumber: '#636d83',
    lineNumberGutter: '#2c313a',
    
    comment: '#5c6370',
    punctuation: '#abb2bf',
    property: '#61afef',
    operator: '#c678dd',
    keyword: '#c678dd',
    string: '#98c379',
    number: '#d19a66',
    boolean: '#d19a66',
    variable: '#e06c75',
    function: '#61afef',
    className: '#e5c07b',
    tag: '#e06c75',
    attrName: '#d19a66',
    attrValue: '#98c379',
    deleted: '#e06c75',
    inserted: '#98c379',
    changed: '#e5c07b',
    regex: '#98c379',
  }
}; 
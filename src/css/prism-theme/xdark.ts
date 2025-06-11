import {PrismTheme} from 'prism-react-renderer';

export const darkTheme: PrismTheme = {
  plain: {
    color: '#eee',
    backgroundColor: '#2f2f2f',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {color: '#616161'},
    },
    {
      types: ['namespace'],
      style: {opacity: 0.7},
    },
    {
      types: [
        'string',
        'attr-value',
        'attribute',
        'pseudo-class',
        'pseudo-element',
      ],
      style: {color: '#a5e844'},
    },
    {
      types: ['hexcode', 'number', 'unit'],
      style: {color: '#fd9170'},
    },
    {
      types: [
        'boolean',
        'constant',
        'keyword',
        'atrule',
        'function',
        'symbol',
        'id',
        'important',
      ],
      style: {color: '#c792ea', fontWeight: 'bold'},
    },
    {
      types: ['attr-name', 'builtin', 'char', 'class', 'property'],
      style: {color: '#ffcb6b'},
    },
    {
      types: ['class-name', 'regex'],
      style: {color: '#f2ff00'},
    },
    {
      types: ['entity', 'deleted', 'tag', 'selector', 'url', 'variable'],
      style: {color: '#ff6666'},
    },
    {
      types: ['operator', 'punctuation'],
      style: {color: '#89ddff'},
    },
    {
      types: ['inserted'],
      style: {color: '#80cbc4'},
    },
    {
      types: ['cdata', 'char'],
      style: {color: '#80cbc4'},
    },
    {
      types: ['prolog'],
      style: {color: '#616161'},
    },
  ],
};

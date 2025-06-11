import {PrismTheme, themes} from 'prism-react-renderer';

export const lightTheme: PrismTheme = {
  plain: {
    color: 'var(--color-text-2)',
    backgroundColor: '#fafafa',
  },
  styles: [
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['comment', 'doctype', 'prolog'],
      style: {
        color: '#aabfc9',
      },
    },
    {
      types: [
        'atrule',
        'boolean',
        'constant',
        'function',
        'id',
        'important',
        'keyword',
        'symbol',
      ],
      style: {
        color: '#7c4dff',
      },
    },
    {
      types: [
        'attr-name',
        'builtin',
        'cdata',
        'char',
        'class',
        'operator',
        'property',
      ],
      style: {
        color: '#39adb5',
      },
    },
    {
      types: [
        'attr-value',
        'attribute',
        'pseudo-class',
        'pseudo-element',
        'string',
      ],
      style: {
        color: '#f6a434',
      },
    },
    {
      types: ['class-name', 'regex'],
      style: {
        color: '#6182b8',
      },
    },
    {
      types: ['deleted', 'entity', 'selector', 'tag', 'url', 'variable'],
      style: {
        color: '#e53935',
      },
    },
    {
      types: ['hexcode', 'number', 'unit'],
      style: {
        color: '#f76d47',
      },
    },
    {
      types: ['inserted'],
      style: {
        color: '#39adb5',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#39adb5',
      },
    },
    {
      types: ['id', 'important'],
      style: {
        fontWeight: 'bold',
      },
    },
  ],
};

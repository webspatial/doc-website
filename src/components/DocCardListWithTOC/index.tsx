import React from 'react';
import DocCardWithTOC from '@site/src/components/DocCardWithTOC';

// Create a require-context for all .md files in docs/api/classes
// directory: (directory, useSubdirectories, regex)

//@ts-ignore
const req = require.context(
  // relative to this file, adjust path if necessary
  '../../../docs/api/classes',
  false,
  /\.md$/,
);

const reqObj = {
  //@ts-ignore
  Classes: require.context(
    // relative to this file, adjust path if necessary
    '../../../docs/api/classes',
    false,
    /\.md$/,
  ),
  //@ts-ignore
  Interfaces: require.context(
    // relative to this file, adjust path if necessary
    '../../../docs/api/interfaces',
    false,
    /\.md$/,
  ),
  //@ts-ignore
  TypeAliases: require.context(
    // relative to this file, adjust path if necessary
    '../../../docs/api/type-aliases',
    false,
    /\.md$/,
  ),
};

export default function CardList({path}: {path: keyof typeof reqObj}) {
  // req.keys() returns an array of matching file paths

  const modules = reqObj[path].keys().map((filePath) => reqObj[path](filePath));
  return (
    <div className="myDocCardGrid">
      {modules.map((mod, idx) => (
        // `mod` is the module object; default export is the MDX component
        <DocCardWithTOC key={idx} item={mod} />
      ))}
    </div>
  );
}

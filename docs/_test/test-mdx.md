---
sidebar_position: 0
# Display h2 to h5 headings
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import TOCInline from '@theme/TOCInline';
import CodeBlock from '@theme/CodeBlock';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import icon1024 from '@site/static/assets/logo.png';

# My Test Cases for MDX

## Globals

<TOCInline toc={toc} />

<CodeBlock className="language-json">{JSON.stringify(toc, null, 2)}</CodeBlock>

<ul>
  {Object.entries(frontMatter).map(([key, value]) => <li key={key}><b>{key}</b>: {value}</li>)}
</ul>
<p>The title of this page is: <b>{contentTitle}</b></p>

## Links

[Code](#code)

[Quote](#quote)

## Assets

<img src={icon1024} alt="Logo" />
<img src={icon1024} alt="Logo" width="100" />

<Image src="/assets/logo.png" alt="Logo" />
<Image src="/assets/logo.png" alt="Logo" />

import Image from '@theme/IdealImage';

<Image img={require("/assets/logo.png")} alt="Logo" decoding="async" loading="lazy" className="img" />
<Image img={require("/assets/logo.png")} alt="Logo" />

## Tabs

<Tabs groupId="operating-systems">
  <TabItem value="win" label="Windows">Use Ctrl + C to copy.</TabItem>
  <TabItem value="mac" label="macOS">Use Command + C to copy.</TabItem>
</Tabs>

<Tabs groupId="operating-systems">
  <TabItem value="win" label="Windows">Use Ctrl + V to paste.</TabItem>
  <TabItem value="mac" label="macOS">Use Command + V to paste.</TabItem>
</Tabs>

<Tabs queryString="current-os">
  <TabItem value="android" label="Android">
    Android
  </TabItem>
  <TabItem value="ios" label="iOS">
    iOS
  </TabItem>
</Tabs>

## Admonitions {#quote}

> Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::note

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::tip

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::info

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::warning

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::danger

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::note[Your Title **with** some _Markdown_ `syntax`!]

Some **content** with some _Markdown_ `syntax`.

:::

:::::info[Parent]

Parent content

::::danger[Child]

Child content

:::tip[Deep Child]

Deep child content

:::

::::

:::::

:::tip[Use tabs in admonitions]

<Tabs>
  <TabItem value="apple" label="Apple">This is an apple 🍎</TabItem>
  <TabItem value="orange" label="Orange">This is an orange 🍊</TabItem>
  <TabItem value="banana" label="Banana">This is a banana 🍌</TabItem>
</Tabs>

:::

<details>
  <summary>Some details containing headings</summary>
  <h2 id="#heading-id">I'm a heading that will not show up in the TOC</h2>

Some content...

</details>

## Code

```javascript {.line-numbers}
function add(x, y) {
  return x + y;
}
```

```javascript {highlight=2-3} showLineNumbers
function add(x, y) {
  return x + y;
}
```

```javascript
function add(x, y) {
  // highlight-start
  return x + y;
  // highlight-end
}
```

```jsx {1,4-6,11} showLineNumbers
import React from "react";

function MyComponent(props) {
  if (props.isBar) {
    return <div>Bar</div>;
  }

  return <div>Foo</div>;
}

export default MyComponent;
```

<pre>
  <b>Input: </b>1 2 3 4{'\n'}
  <b>Output: </b>"366300745"{'\n'}
</pre>

<Tabs>
<TabItem value="js" label="JavaScript">

```js
function helloWorld() {
  console.log("Hello, world!");
}
```

</TabItem>
<TabItem value="py" label="Python">

```py
def hello_world():
  print("Hello, world!")
```

</TabItem>
<TabItem value="java" label="Java">

```java
class HelloWorld {
  public static void main(String args[]) {
    System.out.println("Hello, World");
  }
}
```

</TabItem>
</Tabs>

```bash npm2yarn
npm install @docusaurus/remark-plugin-npm2yarn
```

## List

- [x] @mentions, #refs, **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item

## Table

| First Header                | Second Header                |
| --------------------------- | ---------------------------- |
| Content from cell 1         | Content from cell 2          |
| Content in the first column | Content in the second column |

---

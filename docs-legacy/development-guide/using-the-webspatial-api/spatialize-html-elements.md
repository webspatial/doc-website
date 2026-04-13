---
sidebar_position: 2
---

# Spatialize HTML Elements

:::info
Basic concept: [Spatialized Elements and 3D Container Elements](/docs/core-concepts/spatialized-elements-and-3d-container-elements)
:::

:::note

Because the [WebSpatial SDK](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-sdk) currently offers only a [React SDK](/docs/development-guide/enabling-webspatial-in-web-projects/step-1-install-the-webspatial-sdk#react-sdk), all examples in this document use React.

APIs covered in this section:

- `enable-xr`, `__enableXr__`, `enableXr`
- `cursor: pointer`

:::

## Enable spatialization {#spatialize}

With the current WebSpatial SDK, an HTML element must be marked with a temporary flag before you can use any [spatial APIs](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-api).

:::note
In a future W3C specification, we hope that HTML elements won't need to be explicitly marked as spatial to use spatial APIs - just using a spatial API should implicitly make them [spatialized HTML elements](/docs/core-concepts/spatialized-elements-and-3d-container-elements). For now the flag is required for performance and other practical reasons.
:::

You can apply the flag in three ways:

1. Add the attribute `enable-xr` to the element.

```jsx
<div className="card" enable-xr>
```

2. Add `__enableXr__` to the element's class name.

```jsx
<div className="card __enableXr__">
```

3. Add `enableXr: true` in the element's inline style.

```jsx
<div className="card" style={{ enableXr: true, marginTop: '10px' }}>
```

Supporting all three options lets you work with a wide range of third-party component libraries.

Most component libraries let you customize things like attributes, className, or style on internal HTML elements for styling. As long as you have access to any of these, you can pass in the special marker to spatialize the element inside the component.

Example 1:

```jsx showLineNumbers {15,16,18}
// third-party component
const Button = ({ children, className, style, ...rest }) => {
  return (
    <button
      className={`default-button ${className || ""}`}
      style={{ backgroundColor: "blue", color: "white", ...style }}
      {...rest}>
      {children}
    </button>
  );
};

// usage
<Button
  className="custom-btn __enableXr__"
  style={{ fontSize: "14px", enableXr: true }}
  data-testid="submit-btn"
  enable-xr>
  Submit
</Button>;
```

Example 2:

```jsx showLineNumbers {18,19,20}
// third-party component
const Card = ({ children, headerClassName, headerStyle, headerProps }) => {
  return (
    <div className="card">
      <div
        className={`card-header ${headerClassName || ""}`}
        style={headerStyle}
        {...headerProps}>
        Card Title
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

// usage
<Card
  headerClassName="custom-header  __enableXr__"
  headerStyle={{ backgroundColor: "gray", enableXr: true }}
  headerProps={{ "aria-label": "Card Title", "enable-xr": true }}>
  Card Content
</Card>;
```

After the flag is applied, the element keeps all of its original capabilities and also gains access to the [spatial APIs](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-api) provided by the WebSpatial SDK, including the [CSS APIs](#css) and [DOM APIs](#dom) described below.

## Cross-platform {#cross-platform}

A spatialized element has spatial capabilities only when running inside the [WebSpatial App Shell](/docs/core-concepts/unique-concepts-in-webspatial#webspatial-sdk).

On desktop/mobile platforms and regular browsers, [the build output does not include the WebSpatial SDK implementation](/docs/development-guide/enabling-webspatial-in-web-projects/step-3-integrate-webspatial-sdk-into-web-build-tools/generate-a-webspatial-specific-website). Calls to the WebSpatial API are removed automatically, and the elements remain ordinary HTML elements in the React DOM.

So when you enable spatialization for an HTML element, you **do not need to write any if-else logic**, this API is designed to work cross-platform by default.

## CSS Capabilities {#css}

On a spatialized element, you can use WebSpatial APIs in all common CSS authoring styles, including:

1. Embedded Global CSS

```jsx
import React from 'react';

function App() {
  return (
    <div>
      <style>{`
        h1 {
        // diff-add
          --xr-background-material: translucent;
        }
      `}</style>
      <h1
              // diff-add
        enable-xr
      >Hello World</h1>
```

2. Linked Global CSS

```jsx
import React from 'react';
import './styles.css';

function App() {
  return (
    <div>
      <h1
              // diff-add
        enable-xr
      >Hello World</h1>
```

```css
h1 {
  // diff-add
  --xr-background-material: translucent;
}
```

3. Inline CSS

```jsx
import React from 'react';

function App() {
  return (
    <div>
      <h1
        style={{
                  // diff-add
          '--xr-background-material': 'translucent'
        }}
                // diff-add
        enable-xr
      >Hello World</h1>
```

4. CSS-in-JS solutions that dynamically change global styles, like styled-components.

```jsx
const StyledTitle = styled.h1`
        // diff-add
  --xr-background-material: translucent;
`
function App() {
  return (
    <div>
      <StyledTitle
              // diff-add
        enable-xr
      >Hello World</h1>
```

CSS Modules, PostCSS, and other pre-compiled CSS pipelines work as well.

## DOM Capabilities {#dom}

If you bypass React and manipulate the spatialized element directly through `querySelector` or similar DOM APIs, the [WebSpatial API will not work correctly](/docs/development-guide/web-projects-that-support-webspatial/).

Instead, obtain the DOM node of the spatialized element via React's Ref API, for example:

```jsx
import React from 'react';

function App() {
  const ref = useRef(null)
  return (
    <div>
      <h1
              // diff-add
        ref={ref}
        className="title"
        style={{
          position: 'relative',
          '--xr-back': '100'
        }}
                // diff-add
        enable-xr
      >Hello World</h1>
```

You can then read or write [`--xr-back`](/docs/development-guide/using-the-webspatial-api/elevate-2d-elements) through `ref.current.style`, or remove it with `ref.current.style.removeProperty`.

You can also modify `ref.current.className` as needed.

## Animation Capabilities {#animation}

The WebSpatial SDK does not yet support using spatial APIs inside pure CSS animations.

You can create animations with JS animations. For example, using the Ref API and DOM API [mentioned earlier](#dom) to update WebSpatial styles frame by frame.

The following JS animation libraries have been tested:

- Popmotion
- React Spring
- GSAP
- Tween.js
- Anime.js

## Internal Content Interaction {#content-interaction}

Whether or not an element itself is spatialized, its child-element interactions on spatial-computing platforms such as visionOS are based on [natural interaction](/docs/core-concepts/spatialized-elements-and-3d-container-elements#nature-interaction).

Most of the natural interactions work like touch interactions. One key difference is that during [indirect interaction (eye-hand interaction)](/docs/core-concepts/spatialized-elements-and-3d-container-elements#nature-interaction) an element must qualify as an **Interaction Region** to receive the system-provided **Hover Effect**.

### Hover Effect {#hover-effect}

During the [Select (Navigation)](/docs/core-concepts/spatialized-elements-and-3d-container-elements#nature-interaction) phase - indirect or direct - no JS events fire and no CSS state changes (such as `:hover`) occur, just like on a touch screen.

So web code can't show any interaction cues at all. Basically, the page has no idea what the user is trying to do at that moment.

> For privacy reasons only the operating system knows which element the user's gaze is on or which element the finger is approaching, the web page itself does not.

Instead the operating system (including the browser engine) shows **native visual feedback**:

- In direct interaction, the motion of the user's finger itself serves as feedback.
- In indirect interaction, the system renders a **Hover Effect** (for example, a glowing outline floating in front of the element under gaze). This is not the CSS `:hover` state; it is a native effect.

Only elements recognized as **Interaction Regions** can be targeted and will display the Hover Effect.

An element becomes an Interaction Region if any of the following is true:

- It is a native HTML button, link, or menu element, or any element with an equivalent ARIA role.
- It is an input or form element.
- Otherwise add the CSS property `cursor: pointer` to mark any element as an Interaction Region.

<Image img={require("/assets/guide/hand-1.jpg")} alt="Scene Example 1" />

### JavaScript events {#js-events}

After the [Confirm (Activate)](/docs/core-concepts/spatialized-elements-and-3d-container-elements#nature-interaction) phase, indirect and direct interactions fire the same JavaScript events as touch screens:

<p className="row">
  <div className="col col--6">
    <Image img={require("/assets/guide/hand-2.jpg")} alt="" />
  </div>
  <div className="col col--6">
    <Image img={require("/assets/guide/hand-3.jpg")} alt="" />
  </div>
</p>

For indirect interaction the sequence is:

1. At the moment of the pinch gesture, the system dispatches `pointerover`, `pointerenter`, and `pointerdown`.
2. A `touchstart` event is dispatched (touch emulation).
3. If the fingers stay pinched, moving the hand dispatches:
   1. `pointermove`
   2. `touchmove` (touch emulation)
4. When the fingers release, the system dispatches `pointerout`, `pointerleave`, and `pointerup`.
5. A `touchend` event follows (touch emulation).
6. For desktop compatibility a series of mouse events is then emulated: `mouseover`, `mouseenter`, `mousemove`, `mousedown`, `mouseup`, and the CSS `:hover` state (cleared when interacting elsewhere).
7. Finally a `click` event signifies the confirmed action.

You can build higher-level gestures such as drag-and-drop on top of these low-level events.

Example:

<div style={{ width: '100%', maxWidth: '860px', textAlign: 'center', position: 'relative' }}>
  <a href="https://youtu.be/d8RcEiV-WM4?si=MyfgPKQ4qGZN80lw" target="_blank">
    <img src="/assets/guide/hand-4.jpg" style={{ width: '100%' }} />
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer'
    }}>Watch Video</div>
  </a>
</div>

## Self interaction {#self-interaction}

> To be added

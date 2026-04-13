---
sidebar_position: 1
---

# JSX 标记

[WebSpatial SDK](../../../introduction/getting-started.md#webspatial-sdk) 支持把大部分普通 HTML 元素转变成[空间化 HTML 元素](../../../concepts/spatialized-html-elements.md)，但出于性能、开源生态兼容性等方面的考虑，现阶段需要开发者在 JSX 代码中给这些 HTML 元素加上特殊标记。

## `enable-xr`

这个特殊标记表示把一个 HTML 元素转变成空间化 HTML 元素。

为了兼容第三方开源库，SDK 支持三种标记方式：

1. 将属性 `enable-xr` 作为 HTML 属性传给元素：

   ```html
   <div className="card" enable-xr></div>
   ```

2. 将 `__enableXr__` 添加到元素的 `className` 中：

   ```html
   <div className="card __enableXr__"></div>
   ```

3. 在元素的内联样式中添加 `enableXr: true`:

   ```js
   <div className="card" style={{ enableXr: true, marginTop: "10px" }}></div>
   ```

> 在 [`<Model>`](./Model.md) 上使用这个标记，会让这个元素从 web 标准里只能在平面画布中渲染 3D 模型的 model element 增强为可以在空间中渲染 3D 模型的[静态 3D 容器元素](../../../concepts/3d-content-containers.md)。

## `enable-xr-monitor`

把这个特殊标记添加到一个[空间化 HTML 元素](../../../concepts/spatialized-html-elements.md)的某个父元素上，可以让 WebSpatial SDK 监听这个父元素中内容的变化，如果这些变化会影响到了空间化 HTML 元素的[尺寸和在 X/Y 轴上的布局位置](../../../concepts/spatialized-html-elements.md)，就可以及时同步到空间化 HTML 元素上。

```js
function CardList() {
  const [showFirstCard, setShowFirstCard] = useState(true);

  const onClick = () => {
    setShowFirstCard(prevState => !prevState);
  };

  return (
    <div enable-xr-monitor>
      {showFirstCard && <div>first card</div>}
      <div enable-xr>second card</div>
      <button onClick={onClick}>toggle</button>
    </div>
  );
}
```

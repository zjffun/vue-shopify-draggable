[![jsdelivr][jsdelivr-badge]][jsdelivr-link]
[![npm version][fury-badge]][fury-link]
[![test CI][test-badge]][test-link]

# vue-shopify-draggable

[English](./README.md) | 简体中文

Shopify draggable 的 Vue 组件。

## 目录

- [安装](#installation)
- [使用](#usage)
  - [注册组件](#register-components)
  - [`vue-sortable`](#vue-sortable)
  - [`vue-swappable`](#vue-swappable)
  - [`vue-droppable`](#vue-droppable)
  - [`vue-draggable`](#vue-draggable)
  - [`vue-draggable-container`](#vue-draggable-container)
- [API](#api)
  - [Props](#properties)
    - [options](#options)
    - [tag](#tag)
    - [pluginEvents](#pluginevents)
  - [事件](#events)

## 安装

npm:

```bash
npm install vue-shopify-draggable
# peer dependencies
npm install vue @shopify/draggable
```

CDN:

```html
<script src="//cdn.jsdelivr.net/npm/vue-shopify-draggable/lib/index.js"></script>
```

## 使用

ES6:

```js
import Vue from 'vue';
import VueShopifyDraggable from 'vue-shopify-draggable';
Vue.use(VueShopifyDraggable);
```

CDN:

```html
<script src="//cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/draggable.bundle.js"></script>
<script src="//cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/vue-shopify-draggable/lib/index.js"></script>
<script>
  Vue.use(VueShopifyDraggable);
</script>
```

### 注册组件

注册全部组件:

```js
Vue.use(VueShopifyDraggable);
```

注册单个组件:

```js
Vue.use(VueShopifyDraggable.DraggableContainer);
Vue.use(VueShopifyDraggable.Sortable);
Vue.use(VueShopifyDraggable.Swappable);
Vue.use(VueShopifyDraggable.Droppable);
Vue.use(VueShopifyDraggable.Draggable);

// or

Vue.component('CustomName', VueShopifyDraggable.Swappable);
```

### `vue-sortable`

`vue-sortable` 支持为 [Sortable](https://github.com/Shopify/draggable/tree/master/src/Sortable) 设置选项和监听事件。

<details>
<summary>
示例代码
</summary>

```html
<div id="VueEl"></div>

<script type="text/template" id="VueTemplate">
  <vue-sortable :options="options" @sortable:sorted="sorted">
    <vue-draggable-container tag="ul">
      <li class="item">sortable-item1</li>
      <li class="item">sortable-item2</li>
    </vue-draggable-container>
    <hr />
    <vue-draggable-container tag="ul">
      <li class="item">sortable-item3</li>
    </vue-draggable-container>
  </vue-sortable>
</script>

<script src="//cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/draggable.bundle.js"></script>
<script src="//cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/vue-shopify-draggable/lib/index.js"></script>

<script>
  Vue.use(VueShopifyDraggable);
  new Vue({
    el: VueEl,
    template: VueTemplate.innerHTML,
    data: function () {
      return {
        options: {
          draggable: '.item',
          sortAnimation: {
            duration: 200,
            easingFunction: 'ease-in-out',
          },
          plugins: [Draggable.Plugins.SortAnimation],
        },
      };
    },
    methods: {
      sorted: function (e) {
        console.log(e);
      },
    },
  });
</script>
```

</details>

### `vue-swappable`

`vue-swappable` 支持为 [Swappable](https://github.com/Shopify/draggable/tree/master/src/Swappable) 设置选项和监听事件。

<details>
<summary>
示例代码
</summary>

```html
<div id="VueEl"></div>

<script type="text/template" id="VueTemplate">
  <vue-swappable :options="options" @swappable:swapped="swapped">
    <vue-draggable-container tag="ul">
      <li class="item">draggable-item1</li>
      <li class="item">draggable-item2</li>
    </vue-draggable-container>
    <hr />
    <vue-draggable-container tag="ul">
      <li class="item">draggable-item3</li>
    </vue-draggable-container>
  </vue-swappable>
</script>

<script src="//cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/draggable.bundle.js"></script>
<script src="//cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/vue-shopify-draggable/lib/index.js"></script>

<script>
  Vue.use(VueShopifyDraggable);
  new Vue({
    el: VueEl,
    template: VueTemplate.innerHTML,
    data: function () {
      return {
        options: {
          draggable: '.item',
        },
      };
    },
    methods: {
      swapped: function (e) {
        console.log(e);
      },
    },
  });
</script>
```

</details>

### `vue-droppable`

`vue-droppable` 支持为 [Droppable](https://github.com/Shopify/draggable/tree/master/src/Droppable) 设置选项和监听事件。

<details>
<summary>
示例代码
</summary>

```html
<style>
  .dropzone {
    height: 30px;
    border: 2px solid aqua;
  }
</style>

<div id="VueEl"></div>

<script type="text/template" id="VueTemplate">
  <vue-droppable :options="options" @droppable:start="start" @droppable:dropped="dropped">
    <vue-draggable-container>
      <div class="dropzone draggable-dropzone--occupied"><div class="item">droppable-item1</div></div>
      <div class="dropzone draggable-dropzone--occupied"><div class="item">droppable-item2</div></div>
      <div class="dropzone draggable-dropzone--occupied"><div class="item">droppable-item3</div></div>
    </vue-draggable-container>
    <hr />
    <vue-draggable-container>
      <div class="dropzone"></div>
    </vue-draggable-container>
  </vue-droppable>
</script>

<script src="//cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/draggable.bundle.js"></script>
<script src="//cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/vue-shopify-draggable/lib/index.js"></script>

<script>
  Vue.use(VueShopifyDraggable);
  new Vue({
    el: VueEl,
    template: VueTemplate.innerHTML,
    data: function () {
      return {
        options: {
          draggable: '.item',
          dropzone: '.dropzone',
        },
      };
    },
    methods: {
      dropped: function (e) {
        console.log(e);
      },
      start: function (e) {
        console.log(e);
      },
    },
  });
</script>
```

</details>

### `vue-draggable`

`vue-draggable` 支持为 [Draggable](https://github.com/Shopify/draggable/tree/master/src/Draggable) 设置选项和监听事件。

<details>
<summary>
示例代码
</summary>

```html
<div id="VueEl"></div>

<script type="text/template" id="VueTemplate">
  <vue-draggable :options="options" @drag:start="dragStart">
    <vue-draggable-container tag="ul">
      <li class="item">draggable-item1</li>
      <li class="item">draggable-item2</li>
    </vue-draggable-container>
    <hr />
    <vue-draggable-container tag="ul">
      <li class="item">draggable-item3</li>
    </vue-draggable-container>
  </vue-draggable>
</script>

<script src="//cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/draggable.bundle.js"></script>
<script src="//cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/vue-shopify-draggable/lib/index.js"></script>

<script>
  Vue.use(VueShopifyDraggable);
  new Vue({
    el: VueEl,
    template: VueTemplate.innerHTML,
    data: function () {
      return {
        options: {
          draggable: '.item',
        },
      };
    },
    methods: {
      dragStart: function (e) {
        console.log(e);
      },
    },
  });
</script>
```

</details>

### `vue-draggable-container`

`vue-draggable-container` 总是作为 `vue-sortable`、 `vue-swappable`、 `vue-droppable` 和 `vue-draggable` 的子元素使用。

## API

### properties

#### options

`options` 参数可以设置到 `vue-sortable`, `vue-swappable`, `vue-droppable` 和 `vue-draggable` 上。

<details>
<summary>
示例代码
</summary>

```vue
<vue-sortable :options="options"></vue-sortable>
<vue-swappable :options="options"></vue-swappable>
<vue-droppable :options="options"></vue-droppable>
<vue-draggable :options="options"></vue-draggable>
```

</details>

#### tag

`tag` 参数可以设置到 `vue-draggable-container`, `vue-sortable`, `vue-swappable`, `vue-droppable` 和 `vue-draggable` 上。

如果您不想生成包裹的 DOM 元素，请将 `tag` 设置为空字符串. 注意: 将组件的 `tag` 设置为空字符串是只会渲染组件内的第一个元素。

<details>
<summary>
示例代码
</summary>

```vue
<vue-draggable-container tag="div"></vue-draggable-container>
<vue-sortable tag="ul"></vue-sortable>
<vue-swappable tag="div"></vue-swappable>
<vue-droppable tag="section"></vue-droppable>
<vue-draggable tag="main"></vue-draggable>
```

Empty string:

```vue
<vue-draggable-container tag="">
  <div>rendered</div>
  <div>not rendered</div>
</vue-draggable-container>
```

</details>

#### pluginEvents

Shopify draggable 创建插件很容易，这些插件可能有自定义事件。您可以在 `pluginEvents` 中设置监听它们。

vue-shopify-draggable 已经监听了全部官方插件的事件，所以只有第三方的插件的事件需要设置在 `pluginEvents` 中。

<details>
<summary>
示例代码
</summary>

```vue
<vue-draggable pluginEvents="['eventName']"></vue-draggable>
```

</details>

### Events

Draggable:

- `draggable:initialize`
- `draggable:destroy`
- `drag:start`
- `drag:move`
- `drag:over`
- `drag:over:container`
- `drag:out`
- `drag:out:container`
- `drag:stop`
- `drag:stopped` (添加于 `@shopify/draggable@1.0.0-beta.12`)
- `drag:pressure`

Sortable:

- `sortable:start`
- `sortable:sort`
- `sortable:sorted`
- `sortable:stop`

Swappable:

- `swappable:start`
- `swappable:swap`
- `swappable:swapped`
- `swappable:stop'`

Droppable:

- `droppable:start`
- `droppable:dropped`
- `droppable:returned`
- `droppable:stop`

Plugins:

- `mirror:create`
- `mirror:created`
- `mirror:attached`
- `mirror:move`
- `mirror:destroy`
- `collidable:in`
- `collidable:out`
- `snap:in`
- `snap:out`

[fury-link]: https://badge.fury.io/js/vue-shopify-draggable
[fury-badge]: https://badge.fury.io/js/vue-shopify-draggable.svg
[jsdelivr-link]: https://www.jsdelivr.com/package/npm/vue-shopify-draggable
[jsdelivr-badge]: https://data.jsdelivr.com/v1/package/npm/vue-shopify-draggable/badge
[test-badge]: https://github.com/zjffun/vue-shopify-draggable/workflows/test%20CI/badge.svg
[test-link]: https://github.com/zjffun/vue-shopify-draggable/actions

[![jsdelivr][jsdelivr-badge]][jsdelivr-link]
[![npm version][fury-badge]][fury-link]
[![test CI][test-badge]][test-link]

# vue-shopify-draggable

English | [简体中文](./README.zh-CN.md)

Vue component of Shopify draggable.

## TOC

- [Installation](#installation)
- [Usage](#usage)
  - [Register components](#register-components)
  - [`vue-sortable`](#vue-sortable)
  - [`vue-swappable`](#vue-swappable)
  - [`vue-droppable`](#vue-droppable)
  - [`vue-draggable`](#vue-draggable)
  - [`vue-draggable-container`](#vue-draggable-container)
- [API](#api)
  - [Props](#props)
    - [options](#options)
    - [tag](#tag)
    - [pluginEvents](#pluginevents)
  - [Events](#events)

## Installation

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

## Usage

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

### Register components

Register all components:

```js
Vue.use(VueShopifyDraggable);
```

Separately register components:

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

`vue-sortable` support set options and listen events of [Sortable](https://github.com/Shopify/draggable/tree/master/src/Sortable).

<details>
<summary>
Example
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

`vue-swappable` support set options and listen events of [Swappable](https://github.com/Shopify/draggable/tree/master/src/Swappable).

<details>
<summary>
Example
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

`vue-droppable` support set options and listen events of [Droppable](https://github.com/Shopify/draggable/tree/master/src/Droppable).

<details>
<summary>
Example
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

`vue-draggable` support set options and listen events of [Draggable](https://github.com/Shopify/draggable/tree/master/src/Draggable).

<details>
<summary>
Example
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

`vue-draggable-container` is always use as children of `vue-sortable`, `vue-swappable`, `vue-droppable` and `vue-draggable`.

## API

### Props

#### options

`options` property can set to `vue-sortable`, `vue-swappable`, `vue-droppable` and `vue-draggable`.

<details>
<summary>
Example
</summary>

```vue
<vue-sortable :options="options"></vue-sortable>
<vue-swappable :options="options"></vue-swappable>
<vue-droppable :options="options"></vue-droppable>
<vue-draggable :options="options"></vue-draggable>
```

</details>

#### tag

`tag` property can set to `vue-draggable-container`, `vue-sortable`, `vue-swappable`, `vue-droppable` and `vue-draggable`.

If you not want to generate a wrapper dom, you can set an empty string for the `tag`. Notice: If you set an empty string for the `tag` of a component, this component will only render the first slot node.

<details>
<summary>
Example
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

Shopify draggable is easy to create plugins, those plugins may emit custom events. You can listen those events by set `pluginEvents`.

vue-shopify-draggable is already listened all official plugins' events, so only events of third plugins need push in `pluginEvents`.

<details>
<summary>
Example
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
- `drag:stopped` (added in `@shopify/draggable@1.0.0-beta.12`)
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

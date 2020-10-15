# vue-shopify-draggable

Vue component of Shopify draggable.

## TOC

- [vue-shopify-draggable](#vue-shopify-draggable)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Init componnet](#init-componnet)
    - [`vue-sortable`](#vue-sortable)
    - [`vue-swappable`](#vue-swappable)
    - [`vue-droppable`](#vue-droppable)
    - [`vue-draggable`](#vue-draggable)
    - [vue-draggable-container](#vue-draggable-container)
  - [API](#api)
    - [properties](#properties)
      - [options](#options)
      - [tag](#tag)
      - [pluginEvents](#pluginevents)

## Installation

npm:

```bash
npm install vue-shopify-draggable
```

## Usage

ES6:

```js
import VueShopifyDraggable from 'vue-shopify-draggable';
```

CDN:

```html
<script src="//cdn.jsdelivr.net/npm/vue-shopify-draggable@latest/lib/vue-shopify-draggable.umd.js"></script>
```

### Init componnet

install all:

```js
Vue.use(VueShopifyDraggable);
```

install separately:

```js
Vue.use(VueShopifyDraggable.Sortable);

// or

Vue.component('custom-name', VueShopifyDraggable.Swappable);
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
<script src="./lib/vue-shopify-draggable.umd.js"></script>

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
<script src="./lib/vue-shopify-draggable.umd.js"></script>

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
  <vue-droppable :options="options" @swappable:swapped="swapped">
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
<script src="./lib/vue-shopify-draggable.umd.js"></script>

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
      swapped: function (e) {
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
<script src="./lib/vue-shopify-draggable.umd.js"></script>

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

### properties

#### options

`options` propority can set to `vue-sortable`, `vue-swappable`, `vue-droppable` and `vue-draggable`.

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

`options` propority can set to `vue-draggable-container`, `vue-sortable`, `vue-swappable`, `vue-droppable` and `vue-draggable`.

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

@shopify/draggable is easy to create plugins, those plugins may need emit events. You can listen those events by set `pluginEvents`.

We already listened all official plugins' evnents.

<details>
<summary>
Example
</summary>

```vue
<vue-draggable pluginEvents="['eventName']"></vue-draggable>
```

</details>

## events

TODO

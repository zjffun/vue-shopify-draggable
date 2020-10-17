import * as Swappable from '@shopify/draggable/lib/swappable';
import VueShopifyDraggable from '../../../lib/index.common';
import { drag } from '../../../scripts/test/helper';
import propTag from '../../tests/prop-tag';
import propOptions from '../../tests/prop-options';

Vue.use(VueShopifyDraggable);

describe('Swappable', () => {
  const env = {
    componentTagName: 'vue-swappable',
  };

  let vueInstance;
  let el;

  beforeEach(() => {
    el = document.createElement('div');
    env.el = el;
    document.body.appendChild(el);
  });

  afterEach(() => {
    if (vueInstance) {
      vueInstance.$destroy();
    }
  });

  describe('props', () => {
    describe('options', () => {
      propOptions(env);
    });

    describe('tag', () => {
      propTag(env);
    });
  });

  describe('events', () => {
    it('swappable:start', async () => {
      const spy = jasmine.createSpy('swappable:start');
      vueInstance = new Vue({
        el,
        template: `
          <vue-swappable @swappable:start="func" ref="swappable">
            <vue-draggable-container>
              <li class="draggable-source" ref="item">swappable</li>
            </vue-draggable-container>
          </vue-swappable>
        `,
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Swappable.SwappableStartEvent.name);
            spy();
          },
        },
      });

      await drag({
        from: vueInstance.$refs.item,
        to: document.body,
      });

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('swappable:swap', async () => {
      const spy = jasmine.createSpy('swappable:swap');
      vueInstance = new Vue({
        el,
        template: `
          <vue-swappable @swappable:swap="func" ref="swappable">
            <vue-draggable-container>
              <li class="draggable-source" ref="item1">swappable1</li>
              <li class="draggable-source" ref="item2">swappable2</li>
            </vue-draggable-container>
          </vue-swappable>
        `,
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Swappable.SwappableSwapEvent.name);
            spy();
          },
        },
      });

      await drag({
        from: vueInstance.$refs.item1,
        to: vueInstance.$refs.item2,
      });

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('swappable:swapped', async () => {
      const spy = jasmine.createSpy('swappable:swapped');
      vueInstance = new Vue({
        el,
        template: `
          <vue-swappable @swappable:swapped="func" ref="swappable">
            <vue-draggable-container>
              <li class="draggable-source" ref="item1">swappable1</li>
              <li class="draggable-source" ref="item2">swappable2</li>
            </vue-draggable-container>
          </vue-swappable>
        `,
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Swappable.SwappableSwappedEvent.name);
            spy();
          },
        },
      });

      await drag({
        from: vueInstance.$refs.item1,
        to: vueInstance.$refs.item2,
      });

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('swappable:stop', async () => {
      const spy = jasmine.createSpy('swappable:stop');
      vueInstance = new Vue({
        el,
        template: `
          <vue-swappable @swappable:stop="func" ref="swappable">
            <vue-draggable-container>
              <li class="draggable-source" ref="item">swappable</li>
            </vue-draggable-container>
          </vue-swappable>
        `,
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Swappable.SwappableStopEvent.name);
            spy();
          },
        },
      });

      await drag({
        from: vueInstance.$refs.item,
        to: document.body,
      });

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

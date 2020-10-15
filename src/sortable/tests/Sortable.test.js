import * as Sortable from '@shopify/draggable/lib/sortable';
import VueShopifyDraggable from '../../../lib/vue-shopify-draggable.umd';
import { drag } from '../../../scripts/test/helper';
import propsTag from '../../tests/props-tag';
import propsOptions from '../../tests/props-options';

Vue.use(VueShopifyDraggable);

describe('Sortable', () => {
  const env = {
    componentTagName: 'vue-sortable',
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
      propsOptions(env);
    });

    describe('tag', () => {
      propsTag(env);
    });
  });

  describe('events', () => {
    it('sortable:start', async () => {
      const spy = jasmine.createSpy('sortable:start');
      vueInstance = new Vue({
        el,
        template: `
          <vue-sortable @sortable:start="func" ref="sortable">
            <vue-draggable-container>
              <li class="draggable-source" ref="item">sortable</li>
            </vue-draggable-container>
          </vue-sortable>
        `,
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Sortable.SortableStartEvent.name);
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

    it('sortable:sort', async () => {
      const spy = jasmine.createSpy('sortable:sort');
      vueInstance = new Vue({
        el,
        template: `
          <vue-sortable @sortable:sort="func" ref="sortable">
            <vue-draggable-container>
              <li class="draggable-source" ref="item1">sortable1</li>
              <li class="draggable-source" ref="item2">sortable2</li>
            </vue-draggable-container>
          </vue-sortable>
        `,
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Sortable.SortableSortEvent.name);
            spy();
          },
        },
      });

      await drag({
        from: vueInstance.$refs.item1,
        to: vueInstance.$refs.item2,
      });

      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('sortable:sorted', async () => {
      const spy = jasmine.createSpy('sortable:sorted');
      vueInstance = new Vue({
        el,
        template: `
          <vue-sortable @sortable:sorted="func" ref="sortable">
            <vue-draggable-container>
              <li class="draggable-source" ref="item1">sortable1</li>
              <li class="draggable-source" ref="item2">sortable2</li>
            </vue-draggable-container>
          </vue-sortable>
        `,
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Sortable.SortableSortedEvent.name);
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

    it('sortable:stop', async () => {
      const spy = jasmine.createSpy('sortable:stop');
      vueInstance = new Vue({
        el,
        template: `
          <vue-sortable @sortable:stop="func" ref="sortable">
            <vue-draggable-container>
              <li class="draggable-source" ref="item">sortable</li>
            </vue-draggable-container>
          </vue-sortable>
        `,
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Sortable.SortableStopEvent.name);
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

import * as Droppable from '@shopify/draggable/lib/droppable';
import VueShopifyDraggable from '../../../lib/index.common';
import {
  clickMouse,
  drag,
  dragDelay,
  moveMouse,
  releaseMouse,
  requestAnimationFrameDelay,
} from '../../../scripts/test/helper';
import propTag from '../../tests/prop-tag';
import propOptions from '../../tests/prop-options';

Vue.use(VueShopifyDraggable);

describe('Droppable', () => {
  const env = {
    componentTagName: 'vue-droppable',
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
    it('droppable:start', async () => {
      const spy = jasmine.createSpy('droppable:start');
      vueInstance = new Vue({
        el,
        template: `
          <vue-droppable @droppable:start="func" :options="options" ref="droppable">
            <vue-draggable-container>
              <div class="dropzone draggable-dropzone--occupied" ref="dropzone1">
                <div class="item" ref="item">
                  draggable-source-1
                </div>
              </div>
            </vue-draggable-container>
            <vue-draggable-container>
              <div class="dropzone" ref="dropzone2"></div>
            </vue-draggable-container>
          </vue-droppable>
        `,
        data() {
          return {
            options: {
              draggable: '.item',
              dropzone: '.dropzone',
            },
          };
        },
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Droppable.DroppableStartEvent.name);
            spy();
          },
        },
      });

      await drag({
        from: vueInstance.$refs.item,
        to: vueInstance.$refs.dropzone2,
      });

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('droppable:dropped', async () => {
      const spy = jasmine.createSpy('droppable:dropped');
      vueInstance = new Vue({
        el,
        template: `
          <vue-droppable @droppable:dropped="func" :options="options" ref="droppable">
            <vue-draggable-container>
              <div class="dropzone draggable-dropzone--occupied" ref="dropzone1">
                <div class="item" ref="item">
                  draggable-source-1
                </div>
              </div>
            </vue-draggable-container>
            <vue-draggable-container>
              <div class="dropzone" ref="dropzone2"></div>
            </vue-draggable-container>
          </vue-droppable>
        `,
        data() {
          return {
            options: {
              draggable: '.item',
              dropzone: '.dropzone',
            },
          };
        },
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Droppable.DroppableDroppedEvent.name);
            spy();
          },
        },
      });

      await drag({
        from: vueInstance.$refs.item,
        to: vueInstance.$refs.dropzone2,
      });

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('droppable:returned', async () => {
      const spy = jasmine.createSpy('droppable:returned');
      vueInstance = new Vue({
        el,
        template: `
          <vue-droppable @droppable:returned="func" :options="options" ref="droppable">
            <vue-draggable-container>
              <div class="dropzone draggable-dropzone--occupied" ref="dropzone1">
                <div class="item" ref="item">
                  draggable-source-1
                </div>
              </div>
            </vue-draggable-container>
            <vue-draggable-container>
              <div class="dropzone" ref="dropzone2"></div>
            </vue-draggable-container>
          </vue-droppable>
        `,
        data() {
          return {
            options: {
              draggable: '.item',
              dropzone: '.dropzone',
            },
          };
        },
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Droppable.DroppableReturnedEvent.name);
            spy();
          },
        },
      });

      clickMouse(vueInstance.$refs.item);
      await dragDelay();
      await requestAnimationFrameDelay();
      moveMouse(vueInstance.$refs.dropzone2, { pageY: 1, pageX: 0 });
      moveMouse(document.body, { pageY: 1, pageX: 0 });
      releaseMouse(document.body);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('droppable:stop', async () => {
      const spy = jasmine.createSpy('droppable:stop');
      vueInstance = new Vue({
        el,
        template: `
          <vue-droppable @droppable:stop="func" :options="options" ref="droppable">
            <vue-draggable-container>
              <div class="dropzone draggable-dropzone--occupied" ref="dropzone1">
                <div class="item" ref="item">
                  draggable-source-1
                </div>
              </div>
            </vue-draggable-container>
            <vue-draggable-container>
              <div class="dropzone" ref="dropzone2"></div>
            </vue-draggable-container>
          </vue-droppable>
        `,
        data() {
          return {
            options: {
              draggable: '.item',
              dropzone: '.dropzone',
            },
          };
        },
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Droppable.DroppableStopEvent.name);
            spy();
          },
        },
      });

      await drag({
        from: vueInstance.$refs.item,
        to: vueInstance.$refs.dropzone2,
      });

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

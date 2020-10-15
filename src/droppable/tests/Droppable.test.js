import * as Droppable from '@shopify/draggable/lib/droppable';
import VueShopifyDraggable from '../../../lib/vue-shopify-draggable.umd';
import {
  clickMouse,
  drag,
  dragDelay,
  moveMouse,
  releaseMouse,
  requestAnimationFrameDelay,
} from '../../../scripts/test/helper';
import propsTag from '../../tests/props-tag';
import propsOptions from '../../tests/props-options';

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
      propsOptions(env);
    });

    describe('tag', () => {
      propsTag(env);
    });
  });

  describe('events', () => {
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
  });
});

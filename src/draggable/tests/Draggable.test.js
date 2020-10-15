import * as Draggable from '@shopify/draggable/lib/draggable';
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
import eventPlugin from '../../tests/event-plugin';

Vue.use(VueShopifyDraggable);

describe('Draggable', () => {
  const env = {
    componentTagName: 'vue-draggable',
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
    eventPlugin(env);

    it('draggable:initialize', () => {
      // can't test
    });

    it('draggable:destroy', async () => {
      const spy = jasmine.createSpy('draggable:destroy');
      vueInstance = new Vue({
        el,
        template: '<vue-draggable @draggable:destroy="func" ref="draggable"></vue-draggable>',
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Draggable.DraggableDestroyEvent.name);
            spy();
          },
        },
      });
      vueInstance.$destroy();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('drag:start', async () => {
      const spy = jasmine.createSpy('drag:start');
      vueInstance = new Vue({
        el,
        template: `
          <vue-draggable @drag:start="func" ref="draggable">
            <vue-draggable-container>
              <div class="draggable-source" ref="draggableSource1">draggable-source-1</div>
            </vue-draggable-container>
          </vue-draggable>
        `,
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Draggable.DragStartEvent.name);
            spy();
          },
        },
      });

      clickMouse(vueInstance.$refs.draggableSource1);
      await dragDelay();
      await requestAnimationFrameDelay();
      moveMouse(vueInstance.$refs.draggableSource1, { pageY: 1, pageX: 0 });
      releaseMouse(document.body);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('drag:move', async () => {
      const spy = jasmine.createSpy('drag:move');
      vueInstance = new Vue({
        el,
        template: `
          <vue-draggable @drag:move="func" ref="draggable">
            <vue-draggable-container>
              <div class="draggable-source" ref="draggableSource1">draggable-source-1</div>
            </vue-draggable-container>
          </vue-draggable>
        `,
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Draggable.DragMoveEvent.name);
            spy();
          },
        },
      });

      clickMouse(vueInstance.$refs.draggableSource1);
      await dragDelay();
      await requestAnimationFrameDelay();
      moveMouse(vueInstance.$refs.draggableSource1, { pageY: 1, pageX: 0 });
      releaseMouse(document.body);

      expect(spy).toHaveBeenCalled();
    });

    it('drag:over', async () => {
      const spy = jasmine.createSpy('drag:over');
      vueInstance = new Vue({
        el,
        template: `
          <vue-draggable @drag:over="func" ref="draggable">
            <vue-draggable-container>
              <div class="draggable-source" ref="draggableSource1">draggable-source-1</div>
              <div class="draggable-source" ref="draggableSource2">draggable-source-2</div>
            </vue-draggable-container>
          </vue-draggable>
        `,
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Draggable.DragOverEvent.name);
            spy();
          },
        },
      });

      await drag({
        from: vueInstance.$refs.draggableSource1,
        to: vueInstance.$refs.draggableSource2,
      });

      expect(spy).toHaveBeenCalled();
    });

    it('drag:over:container', async () => {
      const spy = jasmine.createSpy('drag:over:container');
      vueInstance = new Vue({
        el,
        template: `
          <vue-draggable @drag:over:container="func" ref="draggable">
            <vue-draggable-container>
              <div class="draggable-source" ref="draggableSource1">draggable-source-1</div>
            </vue-draggable-container>
            <vue-draggable-container ref="draggableContainer">
            </vue-draggable-container>
          </vue-draggable>
        `,
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Draggable.DragOverContainerEvent.name);
            spy();
          },
        },
      });

      await drag({
        from: vueInstance.$refs.draggableSource1,
        to: vueInstance.$refs.draggableContainer.$el,
      });

      expect(spy).toHaveBeenCalled();
    });

    it('drag:out', async () => {
      const spy = jasmine.createSpy('drag:out');
      vueInstance = new Vue({
        el,
        template: `
          <vue-draggable @drag:out="func" ref="draggable">
            <vue-draggable-container>
              <div class="draggable-source" ref="draggableSource1">draggable-source-1</div>
              <div class="draggable-source" ref="draggableSource2">draggable-source-2</div>
            </vue-draggable-container>
          </vue-draggable>
        `,
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Draggable.DragOutEvent.name);
            spy();
          },
        },
      });

      await drag({
        from: vueInstance.$refs.draggableSource1,
        to: vueInstance.$refs.draggableSource2,
      });

      expect(spy).toHaveBeenCalled();
    });

    it('drag:out:container', async () => {
      const spy = jasmine.createSpy('drag:out:container');
      vueInstance = new Vue({
        el,
        template: `
          <vue-draggable @drag:out:container="func" ref="draggable">
            <vue-draggable-container>
              <div class="draggable-source" ref="draggableSource1">draggable-source-1</div>
            </vue-draggable-container>
            <vue-draggable-container ref="draggableContainer">
            </vue-draggable-container>
          </vue-draggable>
        `,
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Draggable.DragOutContainerEvent.name);
            spy();
          },
        },
      });

      await drag({
        from: vueInstance.$refs.draggableSource1,
        to: vueInstance.$refs.draggableContainer.$el,
      });

      expect(spy).toHaveBeenCalled();
    });

    it('drag:stop', async () => {
      const spy = jasmine.createSpy('drag:stop');
      vueInstance = new Vue({
        el,
        template: `
          <vue-draggable @drag:stop="func" ref="draggable">
            <vue-draggable-container>
              <div class="draggable-source" ref="draggableSource1">draggable-source-1</div>
            </vue-draggable-container>
          </vue-draggable>
        `,
        methods: {
          func(e) {
            expect(e.constructor.name).toBe(Draggable.DragStopEvent.name);
            spy();
          },
        },
      });

      clickMouse(vueInstance.$refs.draggableSource1);
      await dragDelay();
      await requestAnimationFrameDelay();
      moveMouse(vueInstance.$refs.draggableSource1, { pageY: 1, pageX: 0 });
      releaseMouse(document.body);

      expect(spy).toHaveBeenCalled();
    });
    /**
      wait for beta-12

      it("drag:stopped", async () => {
        const spy = jasmine.createSpy("drag:stopped");
        vueInstance = new Vue({
          el,
          template: `
            <vue-draggable @drag:stopped="func" ref="draggable">
              <vue-draggable-container>
                <div class="draggable-source" ref="draggableSource1">draggable-source-1</div>
              </vue-draggable-container>
            </vue-draggable>
          `,
          methods: {
            func(e) {
              expect(e.constructor.name).toBe(Draggable.DragStoppedEvent.name);
              spy();
            },
          },
        });

        clickMouse(vueInstance.$refs.draggableSource1);
        await dragDelay();
        await requestAnimationFrameDelay();
        moveMouse(vueInstance.$refs.draggableSource1, { pageY: 1, pageX: 0 });
        releaseMouse(document.body);

        expect(spy).toHaveBeenCalled();
      });
    */
    it('drag:pressure', () => {
      // TODO
    });
  });
});

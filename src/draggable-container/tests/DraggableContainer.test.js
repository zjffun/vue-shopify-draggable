import VueShopifyDraggable from '../../../lib/index.common';
import propTag from '../../tests/prop-tag';

Vue.use(VueShopifyDraggable);

describe('DraggableContainer', () => {
  const env = {
    componentTagName: 'vue-draggable-container',
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

  it('should add container when mounted', () => {
    vueInstance = new Vue({
      el,
      template: `
        <vue-draggable ref="draggable">
          <vue-draggable-container ref="draggableContainer"></vue-draggable-container>
        </vue-draggable>
      `,
    });

    const { draggableInstance } = vueInstance.$refs.draggable;

    expect(draggableInstance.containers[0]).toBe(vueInstance.$refs.draggableContainer.$el);
  });

  it('should remove container before destroy', async () => {
    vueInstance = new Vue({
      el,
      template: `
        <vue-draggable ref="draggable">
          <vue-draggable-container v-for="d in arr" :key="d"></vue-draggable-container>
        </vue-draggable>
      `,
      data() {
        return {
          arr: [0, 1, 2],
        };
      },
    });

    const { draggableInstance } = vueInstance.$refs.draggable;

    expect(draggableInstance.containers.length).toBe(3);

    vueInstance.arr = [];

    await vueInstance.$nextTick();

    expect(draggableInstance.containers.length).toBe(0);
  });

  describe('props', () => {
    describe('tag', () => {
      propTag(env);
    });
  });
});

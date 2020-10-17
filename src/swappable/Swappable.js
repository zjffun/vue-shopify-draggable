import { Swappable } from '@shopify/draggable';
import draggableMixin from '../draggable-mixin';

const events = ['swappable:start', 'swappable:swap', 'swappable:swapped', 'swappable:stop'];

export default {
  name: 'VueSwappable',
  mixins: [draggableMixin],
  methods: {
    createInstance() {
      if (this.draggableInstance) {
        this.containers = this.draggableInstance.containers;
        this.draggableInstance.destroy();
        this.draggableInstance = null;
      }

      this.draggableInstance = new Swappable(this.containers, this.options);
      events.forEach((eventName) => {
        this.draggableInstance.on(eventName, (event) => {
          this.$emit(eventName, event);
        });
      });
    },
  },
  render(createElement) {
    if (this.tag === '') {
      return this.$slots.default[0];
    }
    return createElement(this.tag, this.$slots.default);
  },
};

import { Swappable } from '@shopify/draggable';
import draggableMixin, { render } from '../draggable-mixin';

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
  render(h) {
    return render({
      h,
      slots: this.$slots.default,
      tag: this.tag,
    });
  },
};

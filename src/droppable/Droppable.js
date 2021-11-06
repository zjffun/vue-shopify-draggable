import { Droppable } from '@shopify/draggable';
import draggableMixin, { render } from '../draggable-mixin';

const events = ['droppable:start', 'droppable:dropped', 'droppable:returned', 'droppable:stop'];

export default {
  name: 'VueDroppable',
  mixins: [draggableMixin],
  provide() {
    return {
      draggable: this,
    };
  },
  methods: {
    createInstance() {
      if (this.draggableInstance) {
        this.containers = this.draggableInstance.containers;
        this.draggableInstance.destroy();
        this.draggableInstance = null;
      }

      this.draggableInstance = new Droppable(this.containers, this.options);
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

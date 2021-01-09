import { Droppable } from '@shopify/draggable';
import draggableMixin from '../draggable-mixin';

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
  render(createElement) {
    if (this.tag === '') {
      return this.$slots.default[0];
    }
    return createElement(this.tag, this.$slots.default);
  },
};

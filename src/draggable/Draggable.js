import { Draggable } from '@shopify/draggable';
import draggableMixin, { render } from '../draggable-mixin';

export default {
  name: 'VueDraggable',
  mixins: [draggableMixin],
  data() {
    return {};
  },
  methods: {
    createInstance() {
      if (this.draggableInstance) {
        this.containers = this.draggableInstance.containers;
        this.draggableInstance.destroy();
      }

      this.draggableInstance = new Draggable(this.containers, this.options);
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

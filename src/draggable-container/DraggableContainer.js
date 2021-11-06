import { render } from '../draggable-mixin';

const errorMsg =
  "Can't get the injected object `draggable`, DraggableContainer only be used in Draggable, Droppable, Sortable or Swappable";

export default {
  name: 'VueDraggableContainer',
  inject: ['draggable'],
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
  mounted() {
    if (this.draggable) {
      this.draggable.draggableInstance.addContainer(this.$el);
    } else {
      // eslint-disable-next-line no-console
      console.error(errorMsg);
    }
  },
  beforeDestroy() {
    if (this.draggable) {
      this.draggable.draggableInstance.removeContainer(this.$el);
    } else {
      // eslint-disable-next-line no-console
      console.error(errorMsg);
    }
  },
  render(h) {
    return render({
      h,
      slots: this.$slots.default,
      tag: this.tag,
    });
  },
};

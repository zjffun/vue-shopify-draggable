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
    this.draggable.draggableInstance.addContainer(this.$el);
  },
  beforeDestroy() {
    this.draggable.draggableInstance.removeContainer(this.$el);
  },
  render(createElement) {
    return createElement(this.tag, this.$slots.default);
  },
};

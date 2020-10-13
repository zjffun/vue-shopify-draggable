import pluginEvents from './plugin-events';

const events = [
  'draggable:initialize',
  'draggable:destroy',
  'drag:start',
  'drag:move',
  'drag:over',
  'drag:over:container',
  'drag:out',
  'drag:out:container',
  'drag:stop',
  'drag:stopped',
  'drag:pressure',
];

export default {
  provide() {
    return {
      draggable: this,
    };
  },
  data() {
    this.draggableInstance = null;
    return {};
  },
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    pluginEvents: {
      type: Array,
      default() {
        return pluginEvents;
      },
    },
  },
  watch: {
    options() {
      this.createInstanceBindEvent();
    },
  },
  methods: {
    createInstance() {},
    createInstanceBindEvent() {
      this.createInstance();
      events.forEach((eventName) => {
        this.draggableInstance.on(eventName, (event) => {
          this.$emit(eventName, event);
        });
      });
      this.pluginEvents.forEach((eventName) => {
        this.draggableInstance.on(eventName, (event) => {
          this.$emit(eventName, event);
        });
      });
    },
  },
  created() {
    this.createInstanceBindEvent();
  },
  destroyed() {
    this.draggableInstance.destroy();
    this.draggableInstance = null;
  },
};

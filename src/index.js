import Draggable from './draggable';
import DraggableContainer from './draggable-container';
import Droppable from './droppable';
import Sortable from './sortable';
import Swappable from './swappable';
import pluginEvents from './plugin-events';

const components = [Draggable, DraggableContainer, Droppable, Sortable, Swappable];

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export default {
  verions: process.env.PACKAGE_VERSION,
  install,
  Draggable,
  DraggableContainer,
  Droppable,
  Sortable,
  Swappable,
  pluginEvents,
};

import Swappable from './Swappable';

Swappable.install = (Vue) => {
  Vue.component(Swappable.name, Swappable);
};

export default Swappable;

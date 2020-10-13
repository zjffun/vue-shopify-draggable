export default (env) => {
  let vueInstance;

  it('should be set default value when not provided', () => {
    vueInstance = new Vue({
      el: env.el,
      template: '<vue-draggable ref="draggable"></vue-draggable>',
    });
    const { options } = vueInstance.$refs.draggable.draggableInstance;

    expect(options.distance).toBe(0);
    expect(options.delay).toBe(100);
    expect(options.draggable).toBe('.draggable-source');
  });

  it('should be set provided value', () => {
    vueInstance = new Vue({
      el: env.el,
      template: '<vue-draggable :options="options" ref="draggable"></vue-draggable>',
      data() {
        return {
          options: {
            distance: 100,
          },
        };
      },
    });
    const { options } = vueInstance.$refs.draggable.draggableInstance;

    // provided
    expect(options.distance).toBe(100);
    // default
    expect(options.delay).toBe(100);
    expect(options.draggable).toBe('.draggable-source');
  });

  it('should be binding', async () => {
    vueInstance = new Vue({
      el: env.el,
      template: '<vue-draggable :options="options" ref="draggable"></vue-draggable>',
      data() {
        return {
          options: {
            distance: 100,
          },
        };
      },
    });
    let { options } = vueInstance.$refs.draggable.draggableInstance;

    expect(options.distance).toBe(100);

    // change value
    vueInstance.options = { distance: 200 };
    await vueInstance.$nextTick();
    options = vueInstance.$refs.draggable.draggableInstance.options;

    expect(options.distance).toBe(200);
  });
};

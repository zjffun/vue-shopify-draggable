export default (env) => {
  let vueInstance;

  it('should use default value when not provided', () => {
    vueInstance = new Vue({
      el: env.el,
      template: '<vue-draggable ref="draggable"></vue-draggable>',
    });
    const element = vueInstance.$el;

    expect(element.localName).toBe('div');
  });

  it('should user provided value', () => {
    vueInstance = new Vue({
      el: env.el,
      template: '<vue-draggable tag="ul" ref="draggable"></vue-draggable>',
    });
    const element = vueInstance.$el;

    expect(element.localName).toBe('ul');
  });

  it('should be binding', async () => {
    vueInstance = new Vue({
      el: env.el,
      template: '<vue-draggable :tag="tag" ref="draggable"></vue-draggable>',
      data() {
        return {
          tag: 'ul',
        };
      },
    });
    let element = vueInstance.$el;

    expect(element.localName).toBe('ul');

    // change value
    vueInstance.tag = 'span';
    await vueInstance.$nextTick();
    element = vueInstance.$el;

    expect(element.localName).toBe('span');
  });
};

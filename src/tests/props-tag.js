export default (env) => {
  let vueInstance;
  const { componentTagName } = env;

  it('should render first slot node when set an empty string', async () => {
    vueInstance = new Vue({
      el: env.el,
      template: `
        <${componentTagName} tag="" ref="draggable">
          <div ref="item1">item1</div>
          <div ref="item2">item2</div>
        </${componentTagName}>
      `,
    });
    const element = vueInstance.$el;

    expect(element).toBe(vueInstance.$refs.item1);
  });

  it('should use default value when not provided', () => {
    vueInstance = new Vue({
      el: env.el,
      template: `<${componentTagName} ref="draggable"></${componentTagName}>`,
    });
    const element = vueInstance.$el;

    expect(element.localName).toBe('div');
  });

  it('should user provided value', () => {
    vueInstance = new Vue({
      el: env.el,
      template: `<${componentTagName} tag="ul" ref="draggable"></${componentTagName}>`,
    });
    const element = vueInstance.$el;

    expect(element.localName).toBe('ul');
  });

  it('should be binding', async () => {
    vueInstance = new Vue({
      el: env.el,
      template: `<${componentTagName} :tag="tag" ref="draggable"></${componentTagName}>`,
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

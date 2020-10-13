import { clickMouse, dragDelay, moveMouse, releaseMouse, requestAnimationFrameDelay } from '../../scripts/test/helper';

export default (env) => {
  let vueInstance;

  it('mirror:create & mirror:created & mirror:attached & mirror:move & mirror:destroy', async () => {
    const events = [
      {
        name: 'mirror:create',
        event: 'MirrorCreateEvent',
      },
      {
        name: 'mirror:created',
        event: 'MirrorCreatedEvent',
      },
      {
        name: 'mirror:attached',
        event: 'MirrorAttachedEvent',
      },
      {
        name: 'mirror:move',
        event: 'MirrorMoveEvent',
      },
      {
        name: 'mirror:destroy',
        event: 'MirrorDestroyEvent',
      },
    ];

    const spies = {};
    events.forEach(({ name }) => {
      spies[name] = jasmine.createSpy(name);
    });

    const methods = {};
    events.forEach(({ name, event }) => {
      methods[event] = (e) => {
        expect(e.constructor.name).toBe(event);
        spies[name]();
      };
    });

    vueInstance = new Vue({
      el: env.el,
      template: `
        <vue-draggable ${events.map(({ name, event }) => `@${name}="${event}"`).join(' ')} ref="draggable">
          <vue-draggable-container>
            <div class="draggable-source" ref="draggableSource1">draggable-source-1</div>
          </vue-draggable-container>
        </vue-draggable>
      `,
      methods,
    });

    clickMouse(vueInstance.$refs.draggableSource1);
    await dragDelay();
    await requestAnimationFrameDelay();
    moveMouse(vueInstance.$refs.draggableSource1, { pageY: 1, pageX: 0 });
    releaseMouse(document.body);

    Object.values(spies).forEach((spy) => {
      expect(spy).toHaveBeenCalled();
    });
  });
};

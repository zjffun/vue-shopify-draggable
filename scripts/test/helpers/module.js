import {
  clickMouse,
  moveMouse,
  releaseMouse,
  touchStart,
  touchMove,
  touchRelease,
  dragDelay,
  requestAnimationFrameDelay,
} from './sensor';

export async function drag({ from, to, sensor = 'mouse' }) {
  if (sensor === 'mouse') {
    clickMouse(from);
    await dragDelay();
    await requestAnimationFrameDelay();
    moveMouse(to);
    releaseMouse(to);
  } else if (sensor === 'touch') {
    touchStart(from);
    await dragDelay();
    await requestAnimationFrameDelay();
    touchMove(to);
    touchRelease(to);
  } else {
    throw new Error(`Sensor '${sensor}' is not yet implemented`);
  }
}

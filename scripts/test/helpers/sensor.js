import {
  defaultTouchEventOptions,
  defaultMouseEventOptions,
  DRAG_DELAY,
  REQUEST_ANIMATION_FRAME_DELAY,
} from './constants';
import { triggerEvent } from './event';

export function dragDelay(ms = DRAG_DELAY + 10) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

export function requestAnimationFrameDelay(ms = REQUEST_ANIMATION_FRAME_DELAY + 10) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

export function clickMouse(element, options = {}) {
  return triggerEvent(element, 'mousedown', {
    ...defaultMouseEventOptions,
    ...options,
  });
}

export function moveMouse(element, options = {}) {
  return triggerEvent(element, 'mousemove', {
    ...defaultMouseEventOptions,
    ...options,
  });
}

export function releaseMouse(element, options = {}) {
  return triggerEvent(element, 'mouseup', {
    ...defaultMouseEventOptions,
    ...options,
  });
}

export function touchStart(element, options) {
  return triggerEvent(element, 'touchstart', {
    ...defaultTouchEventOptions,
    ...options,
  });
}

export function touchMove(element, options) {
  return triggerEvent(element, 'touchmove', {
    ...defaultTouchEventOptions,
    ...options,
  });
}

export function touchRelease(element, options) {
  return triggerEvent(element, 'touchend', {
    ...defaultTouchEventOptions,
    ...options,
  });
}

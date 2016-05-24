export const RESET = 'RESET';
export const ERROR = 'ERROR';
export const WAIT = 'WAIT';
export const WAIT_DONE = 'WAIT_DONE';

/**
 * Global actions like reset state, error, and wait
 */

export function reset() {
  return { type: RESET };
}
export function error(err) {
  return {
    type: ERROR,
    err
  };
}
export function wait() {
  return { type: WAIT };
}
export function waitDone() {
  return { type: WAIT_DONE };
}

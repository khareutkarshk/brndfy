/**
 * Tiny handshake between the preloader and the hero:
 * the hero reports when the 3D model is ready, the preloader reports when
 * its curtain has lifted, and the hero plays its intro after that.
 */
type Fn = () => void;

let modelReady = false;
let introDone = false;
const modelListeners: Fn[] = [];
const introListeners: Fn[] = [];

export function markModelReady() {
    if (modelReady) return;
    modelReady = true;
    modelListeners.splice(0).forEach((f) => f());
}

export function onModelReady(fn: Fn): Fn {
    if (modelReady) fn();
    else modelListeners.push(fn);
    return () => remove(modelListeners, fn);
}

export function finishIntro() {
    if (introDone) return;
    introDone = true;
    introListeners.splice(0).forEach((f) => f());
}

/** Returns an unsubscribe so a remounted component never runs a stale callback. */
export function onIntroDone(fn: Fn): Fn {
    if (introDone) fn();
    else introListeners.push(fn);
    return () => remove(introListeners, fn);
}

function remove(list: Fn[], fn: Fn) {
    const i = list.indexOf(fn);
    if (i >= 0) list.splice(i, 1);
}

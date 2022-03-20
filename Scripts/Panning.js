//Panning Code from Google Module Viewer Documentation 
//modelviewer.dev. Staging & Camera Control. [online] Available at: https://modelviewer.dev/examples/stagingandcameras/.

const modelViewer = document.querySelector('#main');
const tapDistance = 2;
let panning = false;
let panX, panY;
let startX, startY;
let lastX, lastY;
let metersPerPixel;

const startPan = () => {
  const orbit = modelViewer.getCameraOrbit();
  const { theta, phi, radius } = orbit;
  const psi = theta - modelViewer.turntableRotation;
  metersPerPixel = 0.75 * radius / modelViewer.getBoundingClientRect().height;
  panX = [-Math.cos(psi), 0, Math.sin(psi)];
  panY = [
    -Math.cos(phi) * Math.sin(psi),
    Math.sin(phi),
    -Math.cos(phi) * Math.cos(psi)
  ];
  modelViewer.interactionPrompt = 'none';
};

const movePan = (thisX, thisY) => {
  const dx = (thisX - lastX) * metersPerPixel;
  const dy = (thisY - lastY) * metersPerPixel;
  lastX = thisX;
  lastY = thisY;

  const target = modelViewer.getCameraTarget();
  target.x += dx * panX[0] + dy * panY[0];
  target.y += dx * panX[1] + dy * panY[1];
  target.z += dx * panX[2] + dy * panY[2];
  modelViewer.cameraTarget = `${target.x}m ${target.y}m ${target.z}m`;

  // This pauses turntable rotation
  modelViewer.dispatchEvent(new CustomEvent(
    'camera-change', { detail: { source: 'user-interaction' } }));
};

const recenter = (pointer) => {
  panning = false;
  if (Math.abs(pointer.clientX - startX) > tapDistance ||
    Math.abs(pointer.clientY - startY) > tapDistance)
    return;
  const hit = modelViewer.positionAndNormalFromPoint(pointer.clientX, pointer.clientY);
  modelViewer.cameraTarget =
    hit == null ? 'auto auto auto' : hit.position.toString();
};

modelViewer.addEventListener('mousedown', (event) => {
  startX = event.clientX;
  startY = event.clientY;
  panning = event.button === 2 || event.ctrlKey || event.metaKey ||
    event.shiftKey;
  if (!panning)
    return;

  lastX = startX;
  lastY = startY;
  startPan();
  event.stopPropagation();
}, true);

modelViewer.addEventListener('touchstart', (event) => {
  const { targetTouches, touches } = event;
  startX = targetTouches[0].clientX;
  startY = targetTouches[0].clientY;
  panning = targetTouches.length === 2 && targetTouches.length === touches.length;
  if (!panning)
    return;

  lastX = 0.5 * (targetTouches[0].clientX + targetTouches[1].clientX);
  lastY = 0.5 * (targetTouches[0].clientY + targetTouches[1].clientY);
  startPan();
}, true);

self.addEventListener('mousemove', (event) => {
  if (!panning)
    return;

  movePan(event.clientX, event.clientY);
  event.stopPropagation();
}, true);

modelViewer.addEventListener('touchmove', (event) => {
  if (!panning || event.targetTouches.length !== 2)
    return;

  const { targetTouches } = event;
  const thisX = 0.5 * (targetTouches[0].clientX + targetTouches[1].clientX);
  const thisY = 0.5 * (targetTouches[0].clientY + targetTouches[1].clientY);
  movePan(thisX, thisY);
}, true);

self.addEventListener('mouseup', (event) => {
  recenter(event);
}, true);

modelViewer.addEventListener('touchend', (event) => {
  if (event.targetTouches.length === 0) {
    recenter(event.changedTouches[0]);

    if (event.cancelable) {
      event.preventDefault();
    }
  }
}, true);
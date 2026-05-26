export const DEFAULT_MODEL_3D = {
  scale: 1.5,
  position: { x: 0, y: -1, z: 0 },
  rotation: { x: 0, y: 1.5, z: 0 },
  camera: { x: 0, y: 0, z: 4 },
};

export function buildModel3D(url, overrides = {}) {
  return {
    url,
    scale: overrides.scale ?? DEFAULT_MODEL_3D.scale,
    position: {
      x: overrides.position?.x ?? DEFAULT_MODEL_3D.position.x,
      y: overrides.position?.y ?? DEFAULT_MODEL_3D.position.y,
      z: overrides.position?.z ?? DEFAULT_MODEL_3D.position.z,
    },
    rotation: {
      x: overrides.rotation?.x ?? DEFAULT_MODEL_3D.rotation.x,
      y: overrides.rotation?.y ?? DEFAULT_MODEL_3D.rotation.y,
      z: overrides.rotation?.z ?? DEFAULT_MODEL_3D.rotation.z,
    },
    camera: {
      x: overrides.camera?.x ?? DEFAULT_MODEL_3D.camera.x,
      y: overrides.camera?.y ?? DEFAULT_MODEL_3D.camera.y,
      z: overrides.camera?.z ?? DEFAULT_MODEL_3D.camera.z,
    },
  };
}

export function mergeModel3D(stored) {
  if (!stored?.url) return null;
  return buildModel3D(stored.url, stored);
}

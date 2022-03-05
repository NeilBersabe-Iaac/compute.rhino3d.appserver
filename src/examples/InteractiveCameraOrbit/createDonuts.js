import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.127.0/build/three.module.js'

export default function createDonuts({ color, x, y }) {
  const geometry = new THREE.TorusGeometry(6, 3, 16, 100);
  const material = new THREE.MeshLambertMaterial({ color });
  const donut = new THREE.Mesh(geometry, material);
  donut.position.set(x, y, 0);

  return donut;
}

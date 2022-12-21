import { vec, vector } from "./vetores";

export function virtualToScreen(p: vector, c: vector) {
  let pminusc = vec().copy(p).sub(c).setMag(1);
  let scalar = Math.abs(c.z / pminusc.z);
  pminusc.mult(scalar);
  let pi = vec().copy(c).add(pminusc);
  return pi;
}

export function twobodies(
  center: vector,
  z: number,
  verticalSeparation: number,
  horizontalOffset: number,
  boxMainSize: number,
  boxCrossSize: number
) {
  let pcam = vec(center.x, center.y, z);
  let ac = vec().copy(center);
  let a = vec(0, verticalSeparation, 0);
  let b = vec(horizontalOffset, 0, 0);

  function rotate(theta: number) {
    b.rotate(theta);
  }

  function getCenterAndAxis() {
    let center1 = vec().copy(ac).add(a).add(b);
    let L1 = vec()
      .copy(a)
      .sub(b)
      .setMag(boxMainSize / 2);
    let center2 = vec().copy(ac).sub(a).sub(b);
    let L2 = vec().copy(L1).mult(-1);
    return {
      center1,
      L1,
      center2,
      L2,
    };
  }

  function getPoints() {
    let { center1, L1, center2, L2 } = getCenterAndAxis();

    let basis11 = vec()
      .copy(b)
      .cross(a)
      .setMag(boxCrossSize / 2);
    let basis12 = vec()
      .copy(L1)
      .cross(basis11)
      .setMag(boxCrossSize / 2);
    let positions1 = [
      vec().copy(center1).add(L1).add(basis11).add(basis12),
      vec().copy(center1).add(L1).add(basis11).sub(basis12),
      vec().copy(center1).add(L1).sub(basis11).sub(basis12),
      vec().copy(center1).add(L1).sub(basis11).add(basis12),
      vec().copy(center1).sub(L1).sub(basis11).add(basis12),
      vec().copy(center1).sub(L1).add(basis11).add(basis12),
      vec().copy(center1).sub(L1).add(basis11).sub(basis12),
      vec().copy(center1).sub(L1).sub(basis11).sub(basis12),
    ];

    let basis21 = vec()
      .copy(b)
      .mult(-1)
      .cross(vec().copy(a).mult(-1))
      .setMag(boxCrossSize / 2);
    let basis22 = vec()
      .copy(L2)
      .cross(basis21)
      .setMag(boxCrossSize / 2);
    let positions2 = [
      vec().copy(center2).add(L2).add(basis21).add(basis22),
      vec().copy(center2).add(L2).add(basis21).sub(basis22),
      vec().copy(center2).add(L2).sub(basis21).sub(basis22),
      vec().copy(center2).add(L2).sub(basis21).add(basis22),
      vec().copy(center2).sub(L2).sub(basis21).add(basis22),
      vec().copy(center2).sub(L2).add(basis21).add(basis22),
      vec().copy(center2).sub(L2).add(basis21).sub(basis22),
      vec().copy(center2).sub(L2).sub(basis21).sub(basis22),
    ];

    let positions1Screen = positions1.map((p) => virtualToScreen(p, pcam));
    let positions2Screen = positions2.map((p) => virtualToScreen(p, pcam));
    return [positions1Screen, positions2Screen];
  }

  return {
    rotate,
    getCenterAndAxis,
    getPoints,
  };
}

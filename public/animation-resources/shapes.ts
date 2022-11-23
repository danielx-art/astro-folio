import type { vector } from "./vetores";
import { vec } from "./vetores";

export interface Ishape {
  center: vector;
  x: number;
  y: number;
  z: number;
  contains: (point: any) => boolean;
  intersects: (other: Iparallelepiped) => boolean;
}

export interface Iparallelepiped extends Ishape {
  width: number;
  height: number;
  depth: number;
  w: number;
  h: number;
  d: number;
  hw: number;
  hh: number;
  hd: number;
  intersectsSphere: (sphere: Isphere) => boolean;
}

export interface Isphere extends Ishape {
  radius: number;
}

export function parallelepiped(
  center: vector,
  width: number,
  height: number,
  depth: number
): Iparallelepiped {
  let x = center.x;
  let y = center.y;
  let z = center.z;
  let w = width;
  let h = height;
  let d = depth;
  let hw = w / 2;
  let hh = h / 2;
  let hd = d / 2;

  let contains = (point: any) => {
    return (
      point.x >= x - hw &&
      point.x <= x + hw &&
      point.y >= y - hh &&
      point.y <= y + hh &&
      point.z >= z - hd &&
      point.z <= z + hd
    );
  };

  let intersects = (other: Iparallelepiped) => {
    let minX = x - hw;
    let maxX = x + hw;
    let minY = y - hh;
    let maxY = y + hh;
    let minZ = z - hd;
    let maxZ = z + hd;
    let ominX = other.x - other.hw;
    let omaxX = other.x + other.hw;
    let ominY = other.y - other.hh;
    let omaxY = other.y + other.hh;
    let ominZ = other.z - other.hd;
    let omaxZ = other.z + other.hd;

    return (
      minY <= omaxY &&
      maxY >= ominY &&
      minX <= omaxX &&
      maxX >= ominX &&
      minZ <= omaxZ &&
      maxZ >= ominZ
    );
  };

  let intersectsSphere = (sphere: Isphere) => {
    let minX = x - hw;
    let maxX = x + hw;
    let minY = y - hh;
    let maxY = y + hh;
    let minZ = z - hd;
    let maxZ = z + hd;

    // get box closest point to sphere center by clamping
    let cx = Math.max(minX, Math.min(sphere.x, maxX));
    let cy = Math.max(minY, Math.min(sphere.y, maxY));
    let cz = Math.max(minZ, Math.min(sphere.z, maxZ));

    // this is the same as isPointInsideSphere
    let distance = Math.sqrt(
      (cx - sphere.x) * (cx - sphere.x) +
        (cy - sphere.y) * (cy - sphere.y) +
        (cz - sphere.z) * (cz - sphere.z)
    );

    return distance < sphere.radius;
  };

  let self = {
    center,
    width,
    height,
    depth,
    x,
    y,
    z,
    w,
    h,
    d,
    hw,
    hh,
    hd,
    contains,
    intersects,
    intersectsSphere,
  };

  return self;
}

export function sphere(center: vector, radius: number) {
  let intersects = (aparallelepiped: Iparallelepiped) => {
    return aparallelepiped.intersectsSphere(sphere(center, radius));
  };

  let contains = (point: vector) => {
    let pointV3 = vec(point.x, point.y, point.z);
    let dr2 = pointV3.distanceToSquared(center);
    return dr2 <= radius;
  };

  return {
    center,
    radius,
    x: center.x,
    y: center.y,
    z: center.z,
    intersects,
    contains,
  };
}

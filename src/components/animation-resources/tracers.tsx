import type { Iparallelepiped } from "./shapes";
import type { Tparticle } from "./types";
import type { vector } from "./vetores";
import { vec } from "./vetores";

const trace = function (
  particles: Tparticle[],
  boundary: Iparallelepiped,
  physics: string,
  steps: number,
  detail: number,
  from: vector[],
  filter?: (particle: Tparticle) => Tparticle[]
) {
  let agents = filter ? particles.filter(filter) : particles;

  let tracing = [...from] as vector[];

  let randomVectorInBoundary = () => {
    let randomX = ((Math.random() - 1 / 2) * boundary.w + boundary.x) as number;
    let randomY = ((Math.random() - 1 / 2) * boundary.h + boundary.y) as number;
    let randomZ = ((Math.random() - 1 / 2) * boundary.d + boundary.z) as number;
    return vec(randomX, randomY, randomZ);
  };

  if (tracing.length === 0) {
    tracing = [randomVectorInBoundary()];
  }

  let stepsToGo = steps - tracing.length;

  for (let i = 1; i < stepsToGo; i++) {
    let lastPosition = tracing[tracing.length - 1];

    let totalField = vec();
    agents.forEach((particle) => {
      let field = particle["physics"][physics]
        ? (particle["physics"][physics].field(lastPosition, particle) as vector)
        : vec(0, 0, 0);
      totalField.add(field);
    });

    let newPosition = vec()
      .copy(lastPosition)
      .add(vec().copy(totalField).setMag(detail));

    tracing.push(newPosition);

    // if (boundary.contains(newPosition)) {
    //   tracing.push(newPosition);
    // } else {
    //   tracing.push(lastPosition);
    // }
  }
  return tracing;
};

export default trace;

import type { vector } from "./vetores";
import type { Tbehaviour, Tparticle } from "./types";
import { vec } from "./vetores";

export default function boids(): Tbehaviour {

  let intensity = [0.001, 100, 0.001, (2 * Math.PI)/3, 0.0001];

  let field = (pointInSpace: vector, from: Tparticle[]) => {
    return vec()
  }

  let forces = (agents: Tparticle[], particle: Tparticle) => {
    let Fres = vec();
    let rcm = vec(); //mean position for cohesion
    let sumWeights = 0; //to calculate rcm at the end
    let dir = vec().copy(particle.vel).setMag(1);
    let pos = particle.position;
    let C = intensity[0];
    let S = intensity[1];
    let A = intensity[2];
    let fov = intensity[3];
    let NoiseFactor = intensity[4];

    if(!(agents.length > 0)) return;

    agents.forEach(function (agent, i) {

      let viewDir = dir.angleBetween(vec().copy(agent.position).sub(pos));
      let fovFactor = Math.exp(-(viewDir * viewDir) / (fov * fov));
      //let fovFactor = viewDir < fov ? 1 : 0.1;
      let r = vec().copy(agent.position).sub(pos); //from this to agent (positive means attraction)
      let r2 = r.magSquared();

      //cohesion - part 1
      rcm.add(
        vec()
          .copy(agent.position).mult(fovFactor)
      );

      sumWeights += fovFactor;

      //separation
      let fs = vec()
        .copy(r)
        .setMag((-S * fovFactor) / r2);
      Fres.add(fs);

      //aligment
      let adir = vec().copy(agent.vel).setMag(1);
      let fa = adir.mult((A * fovFactor) / (agents.length * r2));
      Fres.add(fa);

      //ruido
      //let noise = vec().random2D(1).mult(NoiseFactor);
      let noiseTemp = Math.sin((particle.vel.heading()*(1+0.1+0.01+0.001) / Math.PI)**2);
      let noise = vec().copy(particle.vel).rotate(noiseTemp*Math.PI/3).mult(NoiseFactor);
      Fres.add(noise);

      //visão limpa
    });

    //cohesion - part 2
    rcm.div(sumWeights);
    let fc = vec().copy(rcm).sub(pos).mult(C);
    Fres.add(fc);

    particle.acl.add(Fres.div(particle.inertialMass));
  }

  let hasMoved = (particle: Tparticle) => {

  };

  return {
    name: "boids",
    intensity,
    field,
    forces,
    hasMoved,
  };
}

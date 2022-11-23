import type { vector } from "./vetores";
import type { Tbehaviour, Tparticle } from "./types";
import { vec } from "./vetores";

export default function magneticDipole(): Tbehaviour {
  let m = vec().random2D(10);

  let field = (pointInSpace: vector, from: Tparticle) => {
    let vecr = vec().copy(pointInSpace).sub(vec().copy(from.position));
    let versorr = vec().copy(vecr).setMag(1);
    let r = vecr.mag();
    if (r > 5) {
      /*note
        this is redundant since particle will only act on particles outside a "tooClose" or
        safeRadius as worked on the particleSystem and collisionDetection themselves
        */
      let B = vec().copy(versorr);
      B.mult(3 * vec().copy(m).dot(versorr));
      B.sub(m);
      B.div(r * r * r);
      return B;
    }
    return vec();
  };

  let forces = (agents: Tparticle[], particle: Tparticle) => {
    Array.isArray(agents) ? true : (agents = [agents]); //if only one is passed

    let Fmagres = vec();
    let Tmagres = vec();

    agents.forEach(function (agent, i) {
      let B = agent.physics.magnet.field(particle.position, agent);

      //translation, force
      //approximation of partial derivatives
      let dinf = 0.000000001;
      let Bx = agent.physics.magnet
        .field(
          vec(
            particle.position.x + dinf,
            particle.position.y,
            particle.position.z
          ),
          agent
        )
        .sub(B)
        .div(dinf)
        .mult(m.x);
      let By = agent.physics.magnet
        .field(
          vec(
            particle.position.x,
            particle.position.y + dinf,
            particle.position.z
          ),
          agent
        )
        .sub(B)
        .div(dinf)
        .mult(m.y);
      let Bz = agent.physics.magnet
        .field(
          vec(
            particle.position.x,
            particle.position.y,
            particle.position.z + dinf
          ),
          agent
        )
        .sub(B)
        .div(dinf)
        .mult(m.z);
      let Fmag = Bx.add(By).add(Bz);
      Fmagres.add(Fmag);

      //rotation, alignment, torque
      Tmagres.add(vec().copy(m).cross(B)).mult(100);
    });

    particle.acl.add(Fmagres.div(particle.inertialMass));
    particle.angacl.add(Tmagres.div(particle.momentInertia));
  };

  let hasMoved = (particle: Tparticle) => {
    let mmag = m.mag();
    m.copy(particle.direction).setMag(mmag);
  };

  return {
    name: "magnet",
    m,
    field,
    forces,
    hasMoved,
  };
}

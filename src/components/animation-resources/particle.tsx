import { vec } from "./vetores";
import type { Tbehaviour, Tparticle } from "./types";

/* --------------------------------------------------------------
-----------------------------------------------------------------
---------------------THE PARTICLE FACTORY------------------------
-----------------------------------------------------------------
-----------------------------------------------------------------*/

export default function createParticle({
  index = 0,
  position = vec(),
  direction = vec(0, -1),
  inertialMass = 0.1,
  momentInertia = 0.1,

  initialVelocity = vec(),
  initialAngularVelocity = vec(),

  maxForce = 0.3,
  maxTorque = 1,
  maxSpeed = 0.3,
  maxAngVel = 1,
  translationDamping = 0,
  rotationDamping = 0.9,

  behaviours = [] as (() => Tbehaviour)[],
}): Tparticle {
  let vel = initialVelocity;
  let angvel = initialAngularVelocity;
  let acl = vec();
  let angacl = vec();

  let physics = {} as { [name: string]: Tbehaviour };
  behaviours.forEach((behaviour) => {
    const phys = behaviour();
    physics[phys.name] = phys;
  });

  let self: Tparticle = {
    index,
    position,
    direction,
    inertialMass,
    momentInertia,
    vel,
    angvel,
    acl,
    angacl,
    maxForce,
    maxTorque,
    maxSpeed,
    maxAngVel,
    translationDamping,
    rotationDamping,
    physics,
    applyForces: (agents: Tparticle[]) => {
      Object.keys(physics).forEach((phenom) => {
        physics[phenom].forces(agents, self);
      });
    },
    move: function () {
      acl.limit(maxForce / inertialMass);
      vel.add(acl);
      vel.mult(translationDamping);
      vel.limit(maxSpeed);

      position.add(vel);
      acl.mult(0);

      //rotation
      angacl.limit(maxTorque / momentInertia);
      angvel.add(angacl);
      angvel.mult(rotationDamping);
      angvel.limit(maxAngVel);
      let deltadir = angvel.cross(direction);
      direction.add(deltadir).setMag(1);
      angacl.mult(0);

      //notify all behaviours
      Object.keys(physics).forEach((phenom) => {
        physics[phenom].hasMoved(self);
      });
    },
    get x() {
      return this.position.x;
    },

    get y() {
      return this.position.y;
    },

    get z() {
      return this.position.z;
    },
  };

  return self;
}

import { vec } from "./vetores";
import type { Tbehaviour, Tparticle } from "./types";
import type { RoughCanvas } from "roughjs/bin/canvas";

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
  maxTorque = 0.5,
  maxSpeed = 2,
  maxAngVel = 0.1,
  translationDamping = 1,
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
      //console.log("acl:", acl); //debugg
      acl.limit(maxForce / inertialMass);
      //console.log("acl:", acl); //debugg
      vel.add(acl);
      //console.log("vel:", vel); //debugg
      vel.mult(translationDamping);
      //console.log("vel:", vel); //debugg
      vel.limit(maxSpeed);
      //console.log("vel:", vel); //debugg

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
    show: function (
      canvasContext: RoughCanvas,
      particleSize: { x: number; y: number },
      magnetColor: string
    ) {
      let pos = this.position;
      let mainAxis = vec(this.direction.x, this.direction.y, 0).setMag(
        particleSize.y / 2
      );
      let crossAxis = vec(this.direction.x, this.direction.y, 0)
        .cross(vec(0, 0, 1))
        .setMag(particleSize.x / 2);
      let v1 = vec().copy(pos).sub(mainAxis).sub(crossAxis);
      let v2 = vec().copy(pos).sub(mainAxis).add(crossAxis);
      let v3 = vec().copy(pos).add(mainAxis).add(crossAxis);
      let v4 = vec().copy(pos).add(mainAxis).sub(crossAxis);
      // let particleHeading = this.direction.heading();
      // let v1 = vec()
      //   .copy(pos)
      //   .add(vec(-particleSize.x / 2, -particleSize.y / 2))
      //   .rotate(particleHeading, this.position)
      //   .add(this.position);
      // let v2 = vec()
      //   .copy(pos)
      //   .add(vec(-particleSize.x / 2, +particleSize.y / 2))
      //   .rotate(particleHeading, this.position)
      //   .add(this.position);
      // let v3 = vec()
      //   .copy(pos)
      //   .add(vec(+particleSize.x / 2, +particleSize.y / 2))
      //   .rotate(particleHeading, this.position)
      //   .add(this.position);
      // let v4 = vec()
      //   .copy(pos)
      //   .add(vec(+particleSize.x / 2, -particleSize.y / 2))
      //   .rotate(particleHeading, this.position)
      //   .add(this.position);

      canvasContext.polygon(
        [
          [v1.x, v1.y],
          [v2.x, v2.y],
          [v3.x, v3.y],
          [v4.x, v4.y],
        ],
        {
          stroke: "none",
          fill: magnetColor,
        }
      );
    },
  };

  return self;
}

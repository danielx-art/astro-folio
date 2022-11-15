import type { Iparallelepiped, Ishape } from "./shapes";
import type { vector } from "./vetores";

export interface IdefaultGenArgs {
  index: number;
  num: number;
  boundary: Iparallelepiped;
  positions: vector[];
}

export type Tposgeneratorfunction = (
  num: number,
  boundary: Iparallelepiped
) => vector[];

export type Tposgenerator = {
  function: Tposgeneratorfunction;
  name: string;
};

export type Tgeneratorfunction = ({}: IdefaultGenArgs) => any;

export type Tgenerator = {
  function: Tgeneratorfunction;
  name: string;
};

export type Twrapfunction = (
  particle: Tparticle,
  boundary: Iparallelepiped,
  ...other: any
) => void;

export type Twrap = {
  function: Twrapfunction;
  name: string;
};

export type parametersType = {
  num: number;
  boundary: Iparallelepiped;
  posGenerator: Tposgenerator;
  dirGenerator: Tgenerator;
  inertialMassGenerator: Tgenerator;
  momentInertiaGenerator: Tgenerator;
  movementGenerator: Tgenerator;
  initialVelocityGenerator: Tgenerator;
  initialAngularVelocityGenerator: Tgenerator;
  maxForceGenerator: Tgenerator;
  maxTorqueGenerator: Tgenerator;
  maxSpeedGenerator: Tgenerator;
  maxAngVelGenerator: Tgenerator;
  translationDampingGenerator: Tgenerator;
  rotationDampingGenerator: Tgenerator;
  wrapGenerator: Twrap;
  queryRadius: number;
  safeRadius: number;
  merge: boolean;
  behaviours: any[];
  tracingFields: any;
  displayGenerator: any;
};

export type Tparticle = {
  index: number;
  position: vector;
  direction: vector;
  inertialMass: number;
  momentInertia: number;
  vel: vector;
  acl: vector;
  angvel: vector;
  angacl: vector;
  maxForce: number;
  maxTorque: number;
  maxSpeed: number;
  maxAngVel: number;
  translationDamping: number;
  rotationDamping: number;
  physics: { [name: string]: Tbehaviour };
  applyForces: (agents: Tparticle[]) => void;
  move: () => void;
  x: number;
  y: number;
  z: number;
};

export type TparticleSystem = {
  num: number;
  boundary: Iparallelepiped;
  wrap: (particle: Tparticle, boundary: Iparallelepiped) => void;
  queryRadius: number;
  safeRadius: number;
  merge: boolean;
  particles: Tparticle[];
  physics: {
    title: { en: string; ptbr: string };
    description: { en: string; ptbr: string };
    [key: string]: any;
  };
  collisionDetection: Ttree;
  update: () => {};
  move: () => {};
  statistics?: any;
};

export type Ttree = {
  boundary: Iparallelepiped;
  capacity: number;
  points: Tparticle[];
  divided: boolean;
  subTrees: Ttree[];
  subdivide: () => void;
  insert: (p: Tparticle) => void;
  query: (range: Ishape, found: Tparticle[]) => Tparticle[];
  remove: (p: Tparticle) => void;
  count: () => number;
};

export type Tbehaviour = {
  name: string;
  field: (pointInSpace: vector, from: Tparticle) => vector;
  forces: (agents: Tparticle[], particle: Tparticle) => void;
  hasMoved: (newState: Tparticle) => void;
  [otherProperties: string]: any;
};

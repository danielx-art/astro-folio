import rough from "roughjs";
import { vec } from "../../public/animation-resources/vetores";
import createParticle from "../../public/animation-resources/particle";
import boids from "../../public/animation-resources/boids";
import type { Tparticle } from "../../public/animation-resources/types";
import {
  transformRGBtoRGBA,
  lerpStretchClamp,
} from "../../public/animation-resources/helpers";

export function initBoids() {
  /*----------------------------------------------------------
  --------------------0-GET DOM ELEMENTS----------------------
  ----------------------------------------------------------*/
  const oldCanvas = document.getElementById("hero-canvas");
  if (oldCanvas) {
    oldCanvas.remove();
  }

  let container = document.getElementById("canvas-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "canvas-container";
    container.className = "absolute -z-10 top-0 left-0 w-full h-full";
    document.body.appendChild(container);
  }

  const canvas = document.createElement("canvas");
  canvas.id = "hero-canvas";
  container.appendChild(canvas);

  const canvasContainer = document.querySelector(
    "#canvas-container"
  ) as HTMLElement;
  const herocanvas = document.getElementById(
    "hero-canvas"
  ) as HTMLCanvasElement;
  const listButtons = document.getElementsByTagName("a");

  /*----------------------------------------------------------
  --------------------1-GLOBAL VARIABLES----------------------
  ----------------------------------------------------------*/
  let isDragging = false;
  let isOnbutton = false;
  const bodyStyles = getComputedStyle(document.body);
  const colors = {
    calm: bodyStyles.getPropertyValue("--boids-calm").trim(),
    hover: bodyStyles.getPropertyValue("--boids-excited").trim(),
    drag: bodyStyles.getPropertyValue("--boids-agressive").trim(),
  };
  var ctx = herocanvas.getContext("2d") as CanvasRenderingContext2D;
  let gridFontSize: number;
  const num = 30;
  let particles = [] as Tparticle[];
  let w = window.innerWidth;
  let h = window.innerHeight;
  const safeRadius = 5;
  let rc = rough.canvas(herocanvas);
  let normalMaxSpeed = 2;
  let normalMaxForce = 0.001;
  let increasedSpeed = 3;
  let increasedForce = 0.002;

  let mouse = { x: 0, y: 0 };
  let start = { x: 0, y: 0 };

  let mouseMove = function (e: MouseEvent) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  };

  let mouseOverbutton = function (e: MouseEvent) {
    isOnbutton = true;
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  };

  let mouseDown = function (e: MouseEvent) {
    //e.preventDefault();
    start.x = e.pageX;
    start.y = e.pageY;
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    isDragging = true;
  };

  let mouseUp = function (e: MouseEvent | TouchEvent) {
    //e.preventDefault();
    isDragging = false;
  };

  window.onmousemove = mouseMove;
  window.onmousedown = (e) => mouseDown(e);
  window.onmouseup = (e) => mouseUp(e);

  let touchMove = function (e: TouchEvent) {
    mouse.x = e.changedTouches[0].pageX;
    mouse.y = e.changedTouches[0].pageY;

    if (isDragging) {
    }
  };

  let touchStart = function (e: TouchEvent) {
    //e.preventDefault();
    isDragging = true;
    start.x = e.changedTouches[0].pageX;
    start.y = e.changedTouches[0].pageY;
    mouse.x = start.x;
    mouse.y = start.y;
  };

  window.ontouchmove = (e) => touchMove(e);
  window.ontouchstart = (e) => touchStart(e);
  window.ontouchend = (e) => mouseUp(e);

  listButtons[1].onmouseover = mouseOverbutton;
  listButtons[1].onmouseleave = () => (isOnbutton = false);

  /*----------------------------------------------------------
  --------------------2-SETUP ON RESIZE----------------------
  ----------------------------------------------------------*/
  function setupCanvas() {
    w = herocanvas.width;
    h = herocanvas.height;
    w = window.innerWidth;
    h = canvasContainer.clientHeight;
    herocanvas.width = w;
    herocanvas.height = h;
    gridFontSize = parseInt(getComputedStyle(canvasContainer).fontSize, 10) || 10;

    //1.Initialize particles

    //b. instanciate and populate the particles
    particles = [];
    for (let n = 0; n < num; n++) {
      let randomPosition = vec(
        10 + Math.random() * (w - 20),
        10 + Math.random() * (h - 20),
        0
      );

      let newParticle = createParticle({
        index: n,
        position: randomPosition,
        direction: vec().random2D(1),
        initialVelocity: vec().random2D(1),
        behaviours: [boids],
      });
      particles.push(newParticle);
    }
  }

  /*----------------------------------------------------------
  --------------------3-FUNCTIONS FOR LOOP--------------------
  ----------------------------------------------------------*/
  let update = () => {
    for (let i = 0; i < num; i++) {
      let thisParticle = particles[i];
      let tooClose = particles.filter(
        (particle) =>
          vec()
            .copy(particle.position)
            .distanceToSquared(thisParticle.position) < safeRadius
      );
      let agents = particles.filter((x: any) => !tooClose.includes(x));
      particles[i].applyForces(agents);

      if (isDragging) {
        let Rpanic = vec()
          .copy(particles[i].position)
          .sub(vec(mouse.x, mouse.y));
        let Fpanic = vec()
          .copy(Rpanic)
          .setMag(100000000)
          .div(Rpanic.magSquared())
          .mult(-1);
        particles[i].acl.add(Fpanic.div(particles[i].inertialMass));
      } else {
      }
    }
  };

  let move = () => {
    for (let i = 0; i < num; i++) {
      if (isDragging || isOnbutton) {
        particles[i].move(increasedSpeed, increasedForce);
      } else {
        particles[i].move(normalMaxSpeed, normalMaxForce);
      }
      if (particles[i].position.x > w) particles[i].position.x = 1;
      if (particles[i].position.x < 0) particles[i].position.x = w - 1;
      if (particles[i].position.y > h) particles[i].position.y = 1;
      if (particles[i].position.y < 0) particles[i].position.y = h - 1;
    }
  };

  let show = () => {
    //let scl = Math.min(Math.max(w,h) / 60, gridFontSize);
    let scl = 9;

    particles.forEach((particle) => {
      //calcula os vertices do triangulo
      let speedStretchFactor = 1 + particle.vel.magSquared() / 10;
      let v1 = vec(1, 0, 0).setMag(scl * speedStretchFactor);
      let rotationCorrection = v1.angleBetween(particle.vel);
      v1.rotate(rotationCorrection);
      let v2 = v1
        .clone()
        .rotate(Math.PI / 3)
        .setMag(scl / 2);
      let v3 = v1
        .clone()
        .rotate(-Math.PI / 3)
        .setMag(scl / 2);
      v1.add(particle.position);
      v2.add(particle.position);
      v3.add(particle.position);

      //calcula a cor baseado em textColor
      let distFromEdges =
        1 / (vec().copy(particle.position).x ** 2 + 0.01) +
        1 / ((w - vec().copy(particle.position).x) ** 2 + 0.01) +
        1 / (vec().copy(particle.position).y ** 2 + 0.01) +
        1 / ((h - vec().copy(particle.position).y) ** 2 + 0.01);

      let alphaDeviceSclFactor = gridFontSize > 12 ? 0.0003 : 0.002;
      let alpha = lerpStretchClamp(
        distFromEdges,
        0,
        alphaDeviceSclFactor,
        1,
        0
      );

      let customColorCalm = transformRGBtoRGBA(colors.calm, alpha);
      let customColorAccent = transformRGBtoRGBA(colors.hover, alpha);
      let customColorDrag = transformRGBtoRGBA(colors.drag, alpha);

      rc.polygon(
        [
          [v1.x, v1.y],
          [v2.x, v2.y],
          [v3.x, v3.y],
        ],
        {
          //stroke: isDragging ? "rgb(255,0,0)" : "none",
          stroke: isDragging
            ? "none"
            : isOnbutton
            ? customColorAccent
            : customColorCalm,
          fill: isDragging ? customColorDrag : "transparent",
          fillStyle: "solid",
        }
      );
    });
    //console.log(textColor); //debugg
  };

  /*----------------------------------------------------------
  ---------------------4-DRAW LOOP----------------------------
  ----------------------------------------------------------*/
  let t = 0;

  function animate() {
    if (t > 1024) t = 0;
    requestAnimationFrame(animate);

    if (herocanvas.width != window.innerWidth) {
      setupCanvas();
    }

    ctx.clearRect(0, 0, herocanvas.width, herocanvas.height);
    update();
    move();
    //grid.show(rc); //test & fun

    show();
    t++;
  }

  animate();
}

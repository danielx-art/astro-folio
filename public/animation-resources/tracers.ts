import type { RoughCanvas } from "roughjs/bin/canvas";
import type { Tcell, Tgrid } from "./gridCells";
import type { Iparallelepiped } from "./shapes";
import type { Tparticle } from "./types";
import type { vector } from "./vetores";
import { vec } from "./vetores";

export type TtraceGrid = {
  traces: { life: number; t: number; arr: vector[] }[];
  update: () => void;
  showText: (sentence: string[], colorHigh: string, color: string) => void;
};

const traceGrid = function (
  numTracers: number,
  tracersLen: number,
  tracerLife: number,
  tracerLifeVariation: number,
  grid: Tgrid,
  ctx: CanvasRenderingContext2D | null,
  particles: Tparticle[],
  physics: string
): TtraceGrid {
  let traces = [] as { life: number; t: number; arr: vector[] }[];

  for (let n = 0; n < numTracers; n++) {
    //create the lifespan for each
    let life = Math.round(
      tracerLife * (1 + (Math.random() * 2 - 1) * tracerLifeVariation)
    );
    //initialize each with a random cell on the grid
    let rndCellPos =
      grid.cells[Math.floor(Math.random() * grid.cells.length)].pos;
    let trace = { life, t: 0, arr: [vec(...rndCellPos)] };
    traces.push(trace);
  }

  const update = function () {
    traces.forEach((trace, id) => {
      //if (id == 0) console.log(trace.t, trace.life); //debugg

      if (trace.t >= trace.life) {
        let rndCellPos =
          grid.cells[Math.floor(Math.random() * grid.cells.length)].pos;
        trace.arr.splice(0, trace.arr.length);
        trace.arr.push(vec(...rndCellPos));
        trace.t = 0;
      }

      let steps =
        (-4 * tracersLen * trace.t * (trace.t - trace.life)) /
        (trace.life * trace.life); //starts at 0 go to a peek of tracersLen at life/2 and goes back to 0 at life
      let stepsToGo = steps - trace.arr.length;

      for (let n = 0; n < Math.abs(stepsToGo); n++) {
        if (trace.t < trace.life / 2) {
          let lastPosition = trace.arr[trace.arr.length - 1];

          let totalField = vec();
          particles.forEach((particle) => {
            let field = particle["physics"][physics].field(
              lastPosition,
              particle
            ) as vector;
            totalField.add(field);
          });

          let newPosition = vec()
            .copy(lastPosition)
            .add(
              vec()
                .copy(totalField)
                .setMag(1.4 * grid.resx)
            );
          trace.arr.push(newPosition);
        } else {
          trace.arr.shift();
        }
      }

      trace.t = trace.t + 1;
    });
  };

  const computeGridPositions = function () {
    let gridPositions = [] as vector[];

    traces.forEach((trace) => {
      for (let n = 0; n < trace.arr.length; n++) {
        let pos = trace.arr[n];
        let candidate = vec(
          Math.floor(pos.x / grid.resx) * grid.resx,
          Math.floor(pos.y / grid.resy) * grid.resy
        );

        if (n == 0) {
          gridPositions.push(candidate);
          continue;
        }

        let previous = trace.arr[n - 1];
        let prevGridPos = vec(
          Math.floor(previous.x / grid.resx) * grid.resx,
          Math.floor(previous.y / grid.resy) * grid.resy
        );
        if (prevGridPos.x != candidate.x || prevGridPos.y != candidate.y) {
          gridPositions.push(candidate);
        }
      }
    });

    return gridPositions;
  };

  const showText = function (
    sentence: string[],
    colorHigh: string,
    color: string
  ) {
    if (!ctx) return;

    grid.setCellProp("visited", (cell) => false);

    let gridPositions = computeGridPositions();
    gridPositions.forEach((pos) => {
      let inWhichCell = grid.inWhich([pos.x, pos.y]);
      if (inWhichCell) {
        inWhichCell["visited"] = true;
      }
    });

    grid.cells.forEach((cell, index) => {
      ctx.font = `bold ${1 * grid.resx}px Monospace`;
      if (cell.visited) {
        ctx.fillStyle = colorHigh;
        let char = sentence[index];
        ctx.fillText(char, cell.pos[0], cell.pos[1]);
      } else {
        ctx.fillStyle = color;
        let char = sentence[index];
        ctx.fillText(char, cell.pos[0], cell.pos[1]);
      }
    });
  };

  return {
    traces,
    update,
    showText,
  };
};

// const trace = function (
//   particles: Tparticle[],
//   boundary: Iparallelepiped,
//   physics: string,
//   steps: number,
//   detail: number,
//   from: vector[],
//   filter?: (particle: Tparticle) => Tparticle[]
// ) {
//   let agents = filter ? particles.filter(filter) : particles;

//   let tracing = [...from] as vector[];

//   let randomVectorInBoundary = () => {
//     let randomX = ((Math.random() - 1 / 2) * boundary.w + boundary.x) as number;
//     let randomY = ((Math.random() - 1 / 2) * boundary.h + boundary.y) as number;
//     let randomZ = ((Math.random() - 1 / 2) * boundary.d + boundary.z) as number;
//     return vec(randomX, randomY, randomZ);
//   };

//   if (tracing.length === 0) {
//     tracing = [randomVectorInBoundary()];
//   }

//   let stepsToGo = steps - tracing.length;

//   for (let i = 1; i < stepsToGo; i++) {
//     let lastPosition = tracing[tracing.length - 1];

//     let totalField = vec();
//     agents.forEach((particle) => {
//       let field = particle["physics"][physics]
//         ? (particle["physics"][physics].field(lastPosition, particle) as vector)
//         : vec(0, 0, 0);
//       totalField.add(field);
//     });

//     let newPosition = vec()
//       .copy(lastPosition)
//       .add(vec().copy(totalField).setMag(detail));

//     tracing.push(newPosition);

//     // if (boundary.contains(newPosition)) {
//     //   tracing.push(newPosition);
//     // } else {
//     //   tracing.push(lastPosition);
//     // }
//   }
//   return tracing;
// };

// const traceGrid = function (
//   particles: Tparticle[],
//   boundary: Iparallelepiped,
//   physics: string,
//   steps: number,
//   detail: number,
//   from: vector[] = [],
//   grid: Tgrid
// ): vector[] {
//   let tracing = [...from] as vector[];

//   let randomInitialCell =
//     grid.cells[Math.floor(grid.cells.length * Math.random())];

//   if (tracing.length === 0) {
//     tracing = [vec(...randomInitialCell.pos)];
//   }

//   let stepsToGo = steps - tracing.length;

//   for (let i = 1; i < stepsToGo; i++) {
//     let lastPosition = tracing[tracing.length - 1];

//     let totalField = vec();
//     particles.forEach((particle) => {
//       let field = particle["physics"][physics]
//         ? (particle["physics"][physics].field(lastPosition, particle) as vector)
//         : vec(0, 0, 0);
//       totalField.add(field);
//     });

//     let newPosition = vec()
//       .copy(lastPosition)
//       .add(vec().copy(totalField).setMag(detail));

//     let nextBlock = grid.canvasToCell([newPosition.x, newPosition.y]);

//     tracing.push(vec(...nextBlock));

//     // if (boundary.contains(newPosition)) {
//     //   tracing.push(newPosition);
//     // } else {
//     //   tracing.push(lastPosition);
//     // }
//   }
//   return tracing;
// };

export { traceGrid };

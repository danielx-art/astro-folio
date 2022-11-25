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

export const traceGrid = function (
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

//I'm so proud of this function, this is a nice function:
export const trace = function <T, F>(
  field: (arg: T, data?: any) => F,
  initVal: T,
  inc: (point: T, field: F) => T,
  steps: number,
  data?: any
): T[] {
  let arr = [initVal];

  for (let n = 0; n < steps; n++) {
    let initField = field(initVal, data);
    let incrementedValue = inc(initVal, initField);
    arr.push(incrementedValue);
    initVal = incrementedValue;
  }

  return arr;
};

export const smoothstep = function (
  a: number = 0,
  b: number = 1,
  x: number
): number {
  let k = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return k * k * (3 - 2 * k);
};

export const easeWalkTruArray = function <T>(
  t: number,
  totalDuration: number,
  offset: number,
  arr: T[]
): T[] {
  if (offset > 1) offset = 1;
  if (offset < 0) offset = 0;

  let frontPercent = smoothstep(
    0,
    (totalDuration + offset * totalDuration) / 2,
    t
  );
  let frontIndex = Math.round(frontPercent * (arr.length - 1));

  let backPercent = smoothstep(
    (totalDuration - offset * totalDuration) / 2,
    totalDuration,
    t
  );
  let backIndex = Math.round(backPercent * (arr.length - 1));

  let result = [] as T[];

  for (let n = backIndex; n <= frontIndex; n++) {
    result.push(arr[n]);
  }

  return result;
};

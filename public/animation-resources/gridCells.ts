import type { RoughCanvas } from "roughjs/bin/canvas";

type Tcell = {
  index: number;
  pos: number[];
  data: any[];
  row: number;
  col: number;
  y: number;
  x: number;
  i: number;
  j: number;
  scl: number[];
  center: number[];
  [props: string]: any;
};

type Tgrid = {
  dimensions: number[];
  res: number[];
  number: number[];
  dx: number;
  dy: number;
  resx: number;
  resy: number;
  numx: number;
  numy: number;
  cols: number;
  rows: number;
  cells: Tcell[];
  cell: (j: number, i: number) => Tcell | null;
  inWhich: (apos: number[]) => Tcell;
  setCellProp: (name: string, callback: (arg: Tcell) => void) => void;
  canvasToCell: (args: number[]) => number[];
  getCellsInRange: (
    j: number,
    i: number,
    dj: number,
    di: number
  ) => (Tcell | null)[];
  show: (canvasContext: RoughCanvas) => void;
  setProp: (name: string, value: any) => void;
  [props: string]: any;
};

const createGrid = function (
  dimensions = [100, 100], //x and y
  res = [20, 20], //x and y
  number = [-1, -1] //cols and rows
): Tgrid {
  //initialize constants
  if (number[0] == -1) {
    number = [
      Math.ceil(dimensions[0] / res[0]),
      Math.ceil(dimensions[1] / res[1]),
    ];
  }

  //cell factory
  const createCell = function (pos: number[], index: number = 0): Tcell {
    return {
      index,
      pos,
      data: [],
      get row() {
        return pos[1] / res[1];
      },
      get col() {
        return pos[0] / res[0];
      },
      get y() {
        return pos[1];
      },
      get x() {
        return pos[0];
      },
      get i() {
        return pos[1] / res[1];
      },
      get j() {
        return pos[0] / res[0];
      },
      scl: dimensions,
      center: [pos[0] + res[0] / 2, pos[1] + res[1] / 2],
    };
  };

  const self = {
    dimensions,
    res,
    number,
    get dx() {
      return dimensions[0];
    },
    get dy() {
      return dimensions[1];
    },
    get resx() {
      return res[0];
    },
    get resy() {
      return res[1];
    },
    get numx() {
      return number[0];
    },
    get cols() {
      return number[0];
    },
    get numy() {
      return number[1];
    },
    get rows() {
      return number[1];
    },
  } as Tgrid;

  //initialize the cells
  self["cells"] = [];
  for (let i = 0; i < number[1]; i++) {
    for (let j = 0; j < number[0]; j++) {
      self.cells.push(createCell([j * res[0], i * res[1]], j + i * self.cols));
    }
  }

  //location helpers
  self["cell"] = function (j, i) {
    if (j < 0 || j > self.cols || i < 0 || i > self.rows) {
      return null;
    }
    let index = j + i * number[0];
    return self.cells[index];
  };

  self["inWhich"] = function (apos) {
    let i = Math.floor(apos[1] / res[1]);
    let j = Math.floor(apos[0] / res[0]);
    return self.cell(j, i) as Tcell;
  };

  //this will be used to set any property of a cell, like color, temperature, mass etc, including functions
  self["setCellProp"] = function (
    name,
    callback = (cell) => {
      /*do something*/
    }
  ) {
    self.cells.forEach((el) => {
      el[name] = callback(el);
    });
  };

  self["canvasToCell"] = function (pos) {
    return [Math.floor(pos[0] / self.res[0]), Math.floor(pos[1] / self.res[1])];
  };

  self["getCellsInRange"] = function (j, i, dj, di) {
    const cellsInRange = [];
    for (let c = j - dj; c < j + dj; c++) {
      for (let r = i - di; r < i + di; r++) {
        let theCell = self.cell(c, r);
        theCell ? cellsInRange.push(self.cell(c, r)) : null;
      }
    }
    return cellsInRange;
  };

  self["setProp"] = function (name, value) {
    self[name] = value;
  };

  self["show"] = function (canvasContext: RoughCanvas) {
    for (let i = 0; i < this.rows; i++) {
      canvasContext.line(
        0,
        i * this.res[1],
        this.dimensions[0],
        i * this.res[1],
        { fill: "blue" }
      );
    }

    for (let j = 0; j < this.cols; j++) {
      canvasContext.line(
        j * this.res[0],
        0,
        j * this.res[0],
        this.dimensions[1],
        { fill: "blue" }
      );
    }
  };

  return self;
};

export { createGrid };
export type { Tcell, Tgrid };

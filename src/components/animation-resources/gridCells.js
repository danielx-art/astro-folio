createGrid = function ({
  dimensions = [100, 100], //x and y
  res, //x and y
  number, //cols and rows
} = {}) {
  //initialize constants
  if (!res && !number) {
    res = [20, 20];
    number = dimensions.map((dim, i) => {
      return Math.ceil(dim / res[i]);
    });
  } else if (res) {
    number = dimensions.map((dim, i) => {
      return Math.ceil(dim / res[i]);
    });
  } else if (!res) {
    res = dimensions.map((dim, i) => {
      return dim / number[i];
    });
  }

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
  };

  //cell factory
  createCell = function (pos) {
    return {
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
      center: pos.map((item, i) => {
        return item + res[i] / 2;
      }),
    };
  };

  //initialize the cells
  self["cells"] = [];
  for (let i = 0; i < number[1]; i++) {
    for (let j = 0; j < number[0]; j++) {
      self.cells.push(createCell([j * res[0], i * res[1]]));
    }
  }
  //set the index prop
  self.cells.forEach((el, index) => {
    el["index"] = index;
  });

  //location helpers
  self["cell"] = function (j, i) {
    if (j < 0 || j > self.cols || i < 0 || i > self.rows) {
      return null;
    }
    let index = j + i * number[0];
    return self.cells[index];
  };

  self["inWhich"] = function (apos) {
    let i = Math.floor(apos.y / res[1]);
    let j = Math.floor(apos.x / res[0]);
    return self.cell(j, i);
  };

  //display the grid lines
  self["show2D"] = function (p5inst, color = [127, 127, 127], weight = 1) {
    p5inst.stroke(...color);
    p5inst.strokeWeight(weight);
    for (let i = 0; i < self.number[1]; i++) {
      p5inst.line(0, i * self.res[1], self.dimensions[0], i * self.res[1]);
    }
    for (let j = 0; j < self.number[0]; j++) {
      p5inst.line(j * self.res[0], 0, j * self.res[0], self.dimensions[1]);
    }
  };

  //this will be used to set any property of a cell, like color, temperature, mass etc, including functions
  self["setCellProp"] = function (
    name,
    callback = (/*cell*/) => {
      /*do something*/
    }
  ) {
    self.cells.forEach((el) => {
      el[name] = callback(el);
    });
  };

  self["canvasToCell"] = function (pos) {
    return [Math.floor(pos.x / self.res[0]), Math.floor(pos.y / self.res[1])];
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

  return self;
};

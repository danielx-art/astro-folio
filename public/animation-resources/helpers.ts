export function pickRandomItemsFromArray<Type>(
  array: Type[],
  num: number
): Type | Type[] {
  let copy = [...array];
  if (num == 1) {
    return copy[Math.floor(Math.random() * copy.length)];
  } else {
    let randomList = [];
    for (let i = 0; i < num; i++) {
      let index = Math.floor(Math.random() * copy.length);
      let newItem = copy.splice(index, 1);
      randomList.push(...newItem);
    }
    return randomList;
  }
}

export function lerpStretchClamp(
  value: number,
  fromMin: number,
  fromMax: number,
  min: number,
  max: number
): number {
  if (value < fromMin) {
    return min;
  }
  if (value > fromMax) {
    return max;
  }
  return ((max - min) / (fromMax - fromMin)) * (value - fromMin) + min;
}

export function transformRGBtoRGBA(rgbString: string, alpha: number): string {
  const rgbValues = rgbString.match(/\d+/g);

  if (rgbValues && rgbValues.length >= 3) {
    // Convert the alpha value to a valid range (0 to 1)
    alpha = Math.min(1, Math.max(0, alpha));

    //if(rgbValues[3]) console.log(rgbValues[3]); //debugg

    return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${rgbValues.length === 4 ? parseInt(rgbValues[3])*alpha*0.01 : alpha})`;
  } else {
    return "rgba(0,0,0,1)";
  }
}

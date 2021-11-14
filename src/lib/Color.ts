import { RgbaColor } from 'react-colorful';
import { RgbaString } from '../@types';

export const RGBA_STRING_RX = /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;

export const rgbaToRgbaString = (rgba: RgbaColor) => {
    const { r, g, b, a } = rgba;
    return `rgba(${r},${g},${b},${a.toFixed(2)})`;
}

export const rgbaStringToRgba = (rgbaString: RgbaString): RgbaColor => {
    const match = RGBA_STRING_RX.exec(rgbaString);
  
    if (match === null) 
        return { r: 0, g: 0, b: 0, a: 1 };
  
    return {
      r: Number(match[1]) / (match[2] ? 100 / 255 : 1),
      g: Number(match[3]) / (match[4] ? 100 / 255 : 1),
      b: Number(match[5]) / (match[6] ? 100 / 255 : 1),
      a: match[7] === undefined ? 1 : Number(match[7]) / (match[8] ? 100 : 1),
    };
};
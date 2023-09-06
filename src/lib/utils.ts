import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function to2dp(n:number){
  return (Math.round(n * 100) / 100).toFixed(2);
}

export function boundInclusive(value: number, min: number, max: number){
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
}
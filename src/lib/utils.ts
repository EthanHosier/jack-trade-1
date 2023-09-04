import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function to2dp(n:number){
  return (Math.round(n * 100) / 100).toFixed(2);
}
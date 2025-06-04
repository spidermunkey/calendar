import { spreadNumber } from "./spreadNum"
export function forEachNumber(number,cb){
  return spreadNumber(number).map((_,i) => cb(i))
}

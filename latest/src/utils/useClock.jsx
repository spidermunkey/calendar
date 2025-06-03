import { DateTime } from "./DateTime";
import { useState,useEffect } from "react";

export function useClock(){
  const [time,setTime] = useState(DateTime.clock);
  const {second,minute} = time

  useEffect(() => {
    const nextMinute = (60 - second) * 1000;
    const getTime = () => DateTime.clock;
    let intervalId;
    let timeoutId;
    const alignTime = () => {
      setTime(getTime)
      intervalId = setInterval(() => setTime(getTime),30000)
      return
    }
    timeoutId = setTimeout(() => alignTime(),nextMinute)
    return () => {
      console.log('timout cleared', typeof String(minute),minute)
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  },[])

  return time
}

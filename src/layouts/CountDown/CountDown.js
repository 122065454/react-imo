import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'

const CountDown = (props) => {

  let intervalHandler = -1

  const [content, setContent] = useState('')

  useEffect(() => {
    countDownFun()
    return () => {
      clearInterval(intervalHandler)
    }
  },[props.endTime])// eslint-disable-line react-hooks/exhaustive-deps

  const countDownFun = () => {
    if (intervalHandler !== -1) {
      clearInterval(intervalHandler)
    }
    parseDisplayTime()
    intervalHandler = setInterval(() => {
      parseDisplayTime()
    }, 1000)
  }

  const parseDisplayTime = () => {
    const currentTime  = new Date().getTime()
    const subtractTime = props.endTime*1000 -  currentTime
    if(subtractTime > 1000){
      setContent(timeContent(subtractTime)) 
    }else{
      clearInterval(intervalHandler)
    }
  }

  const timeContent = (millisecond) => {
    const second = millisecond / 1000
    let d = Math.floor(second / 86400)
    d = d < 10 ? `0${d}` : d
    let h = Math.floor((second % 86400) / 3600)
    h = h < 10 ? `0${h}` : h
    let m = Math.floor(((second % 86400) % 3600) / 60)
    m = m < 10 ? `0${m}` : m
    let s = Math.floor(((second % 86400) % 3600) % 60)
    s = s < 10 ? `0${s}` : s
    let countDownDOM
    if (d > 0) {
      countDownDOM = ` ${d}d ${h}h: ${m}m: ${s}s`
    } else {
      countDownDOM = ` ${h}h : ${m}m : ${s}s`
    }
    return countDownDOM
  }

  return (
    <span>{content}</span>
  )
  
}

export default observer(CountDown)

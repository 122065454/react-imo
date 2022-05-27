import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'

const CurrentCountDown = (props) => {

  let timer = -1

  const [content, setContent] = useState('')

  useEffect(() => {
    const time = props.endTime - props.nowTime
    const timeTransition = (ms) => {
      if (timer !== -1) {
        clearTimeout(timer)
      }
      let maxtime = ms
      timer = setInterval(() => {
        if (maxtime >= 0) {
          setContent(timeContent(maxtime))
          --maxtime
        } else {
          if(props.callback) props.callback()
          clearTimeout(timer)
        }
      },1000);
    }
    timeTransition(time)
    return () => {
      clearTimeout(timer)
    }
  },[props.endTime, props.nowTime])


  const timeContent = (millisecond) => {
    const second = millisecond
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
      countDownDOM = ` ${d}d: ${h}h: ${m}m: ${s}s`
    } else {
      if(h > 0) {
        countDownDOM = ` ${h}h : ${m}m : ${s}s`
      } else {
        countDownDOM = `${m}m : ${s}s`
      }
    }
    return countDownDOM
  }

  return (
    <span style={{fontFamily: 'Regular'}}>{content}</span>
  )
}

export default observer(CurrentCountDown)

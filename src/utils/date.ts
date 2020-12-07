import { fmt } from 'vma-assist/dist/static/js/utils'
import moment from 'moment'

export const getNowDay = () => {
  const now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  now.setMilliseconds(0)
  return now
}

export const getYesterDay = () => {
  const now = new Date()
  const nows = now.setTime(now.getTime() - 24 * 60 * 60 * 1000)
  const yester = new Date(nows)
  yester.setHours(0)
  yester.setMinutes(0)
  yester.setSeconds(0)
  yester.setMilliseconds(0)
  return yester
}

export const getBeforeDay = () => {
  const now = new Date()
  const nows = now.setTime(now.getTime() - 24 * 60 * 60 * 1000 * 2)
  const yester = new Date(nows)
  yester.setHours(0)
  yester.setMinutes(0)
  yester.setSeconds(0)
  yester.setMilliseconds(0)
  return yester
}

export const getNowMonth = () => {
  const nowDay = getNowDay()
  nowDay.setDate(0)
  return nowDay
}

export const getNowYear = () => {
  const nowMonth = getNowMonth()
  nowMonth.setMonth(0)
  return nowMonth
}

export const getTimeMSFromMoment = (m: any) => {
  return m.milliseconds() + m.seconds() * 1000 + m.minutes() * 60 * 1000 + m.hours() * 60 * 60 * 1000
}

export const formatDate = (timestamp: number): string => {
  if (!timestamp) {
    return String(timestamp)
  }
  const time = new Date(timestamp)
  const nowDay = getNowDay()
  if (time.getTime() >= nowDay.getTime()) {
    return `今天 ${fmt.date(time, 'hh:mm')}`
  }
  const nowYear = getNowYear()
  if (time.getTime() > nowYear.getTime()) {
    return fmt.date(time, 'MM-dd hh:mm')
  }
  return fmt.date(time, 'yyyy-MM-dd hh:mm')
}

export const formatDates = (timestamp: number): string => {
  if (!timestamp) {
    return String(timestamp)
  }
  const time = new Date(timestamp)
  const nowDay = getNowDay()
  const yesterDay = getYesterDay()
  const beforeDay = getBeforeDay()
  if (time.getTime() >= nowDay.getTime()) {
    return `今天`
  }
  if (time.getTime() < nowDay.getTime() && time.getTime() > yesterDay.getTime()) {
    return `昨天`
  }
  if (time.getTime() < yesterDay.getTime() && time.getTime() > beforeDay.getTime()) {
    return `前天`
  }
  const nowYear = getNowYear()
  if (time.getTime() > nowYear.getTime()) {
    return fmt.date(time, 'MM-dd')
  }
  return fmt.date(time, 'yyyy-MM-dd')
}

// 日期到天
export const blotToDay = (time: number) => {
  const date = new Date(Number(time))
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.getTime()
}

// 日期到分
export const blotToMinute = (time: number) => {
  return Number(time) - Number(time) % 1000
}

// 格式化时间 => hh:mm
export const formatTime = (time: number) => {
  if (Number(time)) {
    const nowDay = getNowDay()
    nowDay.setTime(nowDay.getTime() + Number(time))
    return fmt.date(nowDay, 'hh:mm')
  }
  return time
}

// 格式化时长
export const formatDuration = (duration: number, format = 'yMdhh:mm') => {
  if (Number(duration)) {
    const yearNow = getNowYear()
    const yearThen = getNowYear()
    yearThen.setTime(yearThen.getTime() + duration)
    const year = yearThen.getFullYear() - yearNow.getFullYear()
    const month = yearThen.getMonth() - yearNow.getMonth()
    const date = yearThen.getDate() - yearNow.getDate()
    const hour = yearThen.getHours() - yearNow.getHours()
    const minute = yearThen.getMinutes() - yearNow.getMinutes()
    const second = yearThen.getSeconds() - yearNow.getSeconds()
    return format.replace(/y/g, year > 0 ? (year + '年') : '')
      .replace(/M/g, month > 0 ? (month + '月') : '')
      .replace(/d/g, date > 0 ? (date + '天') : '')
      .replace(/hh/g, hour > 0 ? (hour < 10 ? `0${hour}` : String(hour)) : '00')
      .replace(/mm/g, minute > 0 ? (minute < 10 ? `0${minute}` : String(minute)) : '00')
      .replace(/ss/g, second > 0 ? (second < 10 ? `0${second}` : String(second)) : '00')
  }
  return duration
}

/**
 * 日期区间
 */
export const getDateRanges = () => {
  const today = moment().hours(0).minutes(0).seconds(0).milliseconds(0)
  const yesterday = today.clone().subtract(1, 'days')
  const monthday = today.clone().weekday(0)
  const curMonthStart = today.clone().startOf('month')
  const curMonthEnd = today.clone().endOf('month')
  const prevMonthStart = curMonthStart.clone().subtract(1, 'month')
  return {
    今天: [today, today],
    昨天: [yesterday, yesterday],
    过去7天: [today.clone().subtract(7, 'days'), yesterday],
    过去30天: [today.clone().subtract(30, 'days'), yesterday],
    本周: [monthday, getMinDate(today, monthday.clone().day(+7))],
    上周: [monthday.clone().subtract(7, 'days'), monthday.clone().subtract(1, 'days')],
    本月: [curMonthStart, getMinDate(today, curMonthEnd)],
    上月: [prevMonthStart, prevMonthStart.clone().endOf('month')],
  }
}

/**
 * 取较小的时间
 * @param d1
 * @param d2
 */
export const getMinDate = (d1: moment.Moment, d2: moment.Moment) => {
  return d1.isBefore(d2) ? d1 : d2
}

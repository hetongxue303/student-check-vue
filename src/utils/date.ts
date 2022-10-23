import { TimeUnit } from '../enums/TimeUnit'

const NANOSECONDS: number = 1 / 1000 / 1000
const MICROSECONDS: number = 1 / 1000
const MILLISECONDS = 1
const SECONDS = 1000
const MINUTES: number = 60 * 1000
const HOURS: number = 60 * 60 * 1000
const DAYS: number = 24 * 60 * 60 * 1000
const WEEKS: number = 7 * 24 * 60 * 60 * 1000
const MONTHS: number = 30 * 24 * 60 * 60 * 1000
const YEARS: number = 365 * 24 * 60 * 60 * 1000

export const expires = (timeout: number, unit: TimeUnit): Date => {
  let time = 0
  const now: number = new Date().getTime()
  switch (unit) {
    case 0:
      time = now + timeout * NANOSECONDS
      break
    case 1:
      time = now + timeout * MICROSECONDS
      break
    case 2:
      time = now + timeout * MILLISECONDS
      break
    case 3:
      time = now + timeout * SECONDS
      break
    case 4:
      time = now + timeout * MINUTES
      break
    case 5:
      time = now + timeout * HOURS
      break
    case 6:
      time = now + timeout * DAYS
      break
    case 7:
      time = now + timeout * WEEKS
      break
    case 8:
      time = now + timeout * MONTHS
      break
    case 9:
      time = now + timeout * YEARS
      break
  }
  return new Date(time)
}

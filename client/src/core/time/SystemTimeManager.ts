/**
 * 时间管理
 */
class SystemTimeManager
{
    /**
     * 某个时间点是否满足条件
    */
    public static IsInTime(timeId: number, startOffsetTime: number = 0, isGetDate: boolean = false): boolean | Date
    {
        if (timeId == 0)
        {
            return true;
        }
        let subDefList: Array<SystemTimeDefinition> = SystemTimeDefined.GetInstance().getSubListById(timeId);
        for (let i: number = 0; i < subDefList.length; i++)
        {
            if (SystemTimeManager.IsSystemTimeDefInTime(subDefList[i], startOffsetTime, isGetDate))
            {
                if (isGetDate)
                {
                    return SystemTimeManager.IsSystemTimeDefInTime(subDefList[i], startOffsetTime, isGetDate);
                } else
                {
                    return true;
                }
            }
        }
        if (isGetDate)
        {
            return TimeManager.Utc1970;
        } else
        {
            return false;
        }
    }

    private static IsSystemTimeDefInTime(def: SystemTimeDefinition, startOffsetTime: number = 0, isGetDate: boolean = false): boolean | Date
    {
        let serverTime: Date = TimeManager.GetServerLocalDateTime();
        let startTime: Date;
        let endTime: Date;
        switch (SystemTimeDefined.GetInstance().getSystemType(def))
        {
            case SystemTimeType.Week:
                let week: number = serverTime.getDay();
                if (week == 0)
                {
                    week = 7;//按计算习惯，用7表示周日
                }
                if (def.start[6] <= def.end[6]) //正常情况，不进行日期翻转
                {
                    if (week >= def.start[6] && week <= def.end[6])
                    {
                        startTime = SystemTimeManager.GetWeekDate(new Date(serverTime.getFullYear(), serverTime.getMonth(), serverTime.getDate(), def.start[3], def.start[4], def.start[5]), def.start[6], true);
                        endTime = SystemTimeManager.GetWeekDate(new Date(serverTime.getFullYear(), serverTime.getMonth(), serverTime.getDate(), def.end[3], def.end[4], def.end[5]), def.end[6], false);
                    }
                    else
                    {
                        if (isGetDate)  //不在星期范围之内
                        {
                            return TimeManager.Utc1970;
                        } else
                        {
                            return false;
                        }
                    }
                }
                else //分两段的
                {
                    if (week > def.end[6] && week < def.start[6])
                    {
                        if (isGetDate) //在中间
                        {
                            return TimeManager.Utc1970;
                        } else
                        {
                            return false;
                        }
                    }
                    else if (week <= def.end[6])//在第一段
                    {
                        startTime = SystemTimeManager.GetWeekDate(new Date(serverTime.getFullYear(), serverTime.getMonth(), serverTime.getDate(), 0, 0, 0), 1, true);
                        endTime = SystemTimeManager.GetWeekDate(new Date(serverTime.getFullYear(), serverTime.getMonth(), serverTime.getDate(), def.end[3], def.end[4], def.end[5]), def.end[6], false);
                    }
                    else //在第二段
                    {
                        startTime = SystemTimeManager.GetWeekDate(new Date(serverTime.getFullYear(), serverTime.getMonth(), serverTime.getDate(), def.start[3], def.start[4], def.start[5]), def.start[6], true);
                        endTime = SystemTimeManager.GetWeekDate(new Date(serverTime.getFullYear(), serverTime.getMonth(), serverTime.getDate(), 23, 59, 59, 999), 7, false);
                    }
                }
                break;
            case SystemTimeType.EveryDay:
                if (SystemTimeManager.IsInBigDate(def.start, def.end, serverTime))
                {
                    startTime = SystemTimeManager.GetDateTimeByArray(def.start, serverTime);
                    endTime = SystemTimeManager.GetDateTimeByArray(def.end, serverTime);
                }
                else
                {
                    if (isGetDate)
                    {
                        return TimeManager.Utc1970;
                    } else
                    {
                        return false;
                    }
                }
                break;
            case SystemTimeType.Normal:
                startTime = new Date(def.start[0], def.start[1] - 1, def.start[2], def.start[3], def.start[4], def.start[5]);
                endTime = new Date(def.end[0], def.end[1] - 1, def.end[2], def.end[3], def.end[4], def.end[5]);
                break;
        }
        if (serverTime.getTime() >= (startTime.getTime() - startOffsetTime) && serverTime.getTime() <= endTime.getTime())
        {
            if (isGetDate)
            {
                return startTime;
            } else
            {
                return true;
            }
        }
        else
        {
            if (isGetDate)
            {
                return TimeManager.Utc1970;
            } else
            {
                return false;
            }
        }
    }

    /// <summary>
    /// 获取最近的星期的日期
    /// </summary>
    /// <returns></returns>
    private static GetWeekDate(date: Date, weekDate: number, isPre: boolean): Date
    {
        if (weekDate == 7)
        {
            weekDate = 0;
        }
        let week: number = weekDate;
        if (date.getDay() == week)
        {
            return date;
        }
        else
        {
            let offsetData: Date;
            if (isPre)
            {
                offsetData = new Date(date.getTime() - 3600 * 24 * 1000);
            }
            else
            {
                offsetData = new Date(date.getTime() + 3600 * 24 * 1000);
            }
            return SystemTimeManager.GetWeekDate(offsetData, weekDate, isPre);
        }
    }
    /// <summary>
    /// 日期在大范围内
    /// </summary>
    /// <param name="start"></param>
    /// <param name="end"></param>
    /// <param name="serverTime"></param>
    /// <returns></returns>
    private static IsInBigDate(start: Array<number>, end: Array<number>, serverTime: Date): boolean
    {
        let year: number, month: number, day: number;
        year = start[0] == 0 ? serverTime.getFullYear() : start[0];
        if (start[0] == 0)
        {
            month = start[1] == 0 ? serverTime.getMonth() : start[1] - 1;
        } else
        {
            month = start[1] - 1;
        }
        day = start[2] == 0 ? serverTime.getDate() : start[2];
        let startTime: Date = new Date(year, month, day);
        year = end[0] == 0 ? serverTime.getFullYear() : end[0];
        if (end[0] == 0)
        {
            month = end[1] == 0 ? serverTime.getMonth() : end[1] - 1;
        } else
        {
            month = end[1] - 1;
        }
        day = end[2] == 0 ? serverTime.getDate() : end[2];
        let endTime: Date = new Date(year, month, day, 23, 59, 59);
        if (startTime <= serverTime && endTime >= serverTime)
        {
            return true;
        }
        return false;
    }

    public static GetDateTimeByArray(start: Array<number>, serverTime: Date): Date
    {
        return new Date(serverTime.getFullYear(), serverTime.getMonth(), serverTime.getDate(), start[3], start[4], start[5]);
    }

    /// <summary>
    /// 获取今天的最后一个时间节点
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public static GetTodayLastTime(id: number): Date
    {
        let result: Date = TimeManager.Utc1970;
        let subDefList: Array<SystemTimeDefinition> = SystemTimeDefined.GetInstance().getSubListById(id);
        for (let i = 0; i < subDefList.length; i++)
        {
            let spanTime: Date = SystemTimeManager.GetTodayLastTimeDate(subDefList[i]);
            if (spanTime > result)
            {
                result = spanTime;
            }
        }
        return result;
    }

    public static GetTodayLastTimeDate(def: SystemTimeDefinition): Date
    {
        if (def.start[6] == -1 && def.start[0] != 0)
        {
            return new Date(def.end[0], def.end[1], def.end[2], def.end[3], def.end[4], def.end[5]);
        }
        else
        {
            let serverTime: Date = TimeManager.GetServerLocalDateTime();
            if (SystemTimeManager.IsInBigDate(def.start, def.end, serverTime))
            {
                return SystemTimeManager.GetDateTimeByArray(def.end, serverTime);//返回今日的最后时间
            }
            else
            {
                let year: number, month: number, day: number;
                year = def.end[0] == 0 ? serverTime.getFullYear() : def.end[0];
                month = def.end[1] == 0 ? serverTime.getMonth() : def.end[1];
                day = def.end[2] == 0 ? serverTime.getDate() : def.end[2];
                return new Date(year, month, day, 23, 59, 59);
            }
        }
    }
}

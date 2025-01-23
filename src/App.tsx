import { getLocalTimeZone, today } from '@internationalized/date'
import type { RangeValue } from '@react-types/shared'
import type { DateValue } from '@react-types/datepicker'
import { DateRangePicker } from '@nextui-org/date-picker'
import { useState } from 'react'
import fetchKronosData from './functions/fetchKronosData'
import KronosData from './interface/IkronosData'
import clearKronosData from './functions/clearKronosData'
import ButtonConditional from './components/Button'
import DateTable from './components/DateTable'

function App() {
    const [date, setDate] = useState<RangeValue<DateValue> | null>({
        start: today(getLocalTimeZone()),
        end  : today(getLocalTimeZone())
    })

    const [schedule, setSchedule] = useState<Array<KronosData>>([])

    async function getSchedule() {
        const kronosData = await fetchKronosData(date)

        const clearSchedule = await clearKronosData(kronosData)

        setSchedule(clearSchedule)
    }

    function handleChange(start: DateValue, end: DateValue) {
        setSchedule([])

        setDate({
            start,
            end
        })
    }

    return (
        <div className='min-w-80 min-h-96 bg-[#191919] rounded'>
            <div className='flex justify-center items-center'>
                <DateRangePicker label='Date range (controlled)' value={date} onChange={(e) => e == null ? '' : handleChange(e.start, e.end)} />
            </div>
            <div className=' flex justify-center items-center'>
                <ButtonConditional date={date} getSchedule={getSchedule} />
            </div>
            <div className=' flex flex-col justify-center items-center p-3'>
                <DateTable schedule={schedule} />
            </div>
        </div>
    )
}

export default App

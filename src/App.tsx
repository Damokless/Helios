import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { Button } from '@nextui-org/button';
import { DatePicker } from "@nextui-org/date-picker";
import { useState } from 'react';
import fetchKronosData from './functions/fetchKronosData';
import KronosData from './interface/IkronosData';
import clearKronosData from './functions/clearKronosData';

function App() {
    const [startValue, setStartValue] = useState<CalendarDate | null>(today(getLocalTimeZone()));
    const [endValue, setEndValue] = useState<CalendarDate | null>(today(getLocalTimeZone()));
    const [schedule, setSchedule] = useState<Array<KronosData>>([])

    async function getSchedule() {
        const kronosData = await fetchKronosData(startValue, endValue)
        const clearSchedule = await clearKronosData(kronosData)
        setSchedule(clearSchedule)
    }

    console.log(schedule)

    return (
        <div className='min-w-80 min-h-96 bg-[#191919] rounded'>
            <div className='flex justify-center items-center'>
                <DatePicker
                    label="Date de début"
                    value={startValue}
                    onChange={setStartValue}
                />
                <DatePicker
                    label="Date de fin"
                    value={endValue}
                    onChange={setEndValue}
                />
            </div>
            <Button
                variant='solid'
                color='primary'
                onPress={() => getSchedule()}
            >
                test header
            </Button>
        </div>
    );
}

export default App;

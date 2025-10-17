import { Button } from '@heroui/button'
import { useState } from 'react'
import type { RangeValue } from '@react-types/shared'
import type { DateValue } from '@react-types/datepicker'
import { DateRangePicker } from '@heroui/date-picker'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table'
import { getLocalTimeZone, today } from '@internationalized/date'
import moment from 'moment'
import fetch_calendar from './functions/fetch_calendar'
import handle_calendar_data from './functions/modify_calendar_data'
import type TCalendar from './types/Tcalendar'
import create_ics_file from './functions/create_ics_file'
import { Input } from '@heroui/input'

export default function App() {
    const [date, setDate] = useState<RangeValue<DateValue>>({
        start: today(getLocalTimeZone()),
        end  : today(getLocalTimeZone())
    })

    const [shifts, setShifts] = useState<Array<{ shift_start: string; shift_end: string }>>([])

    const [title , setTitle] = useState<string>('')

    async function handleChange(start: DateValue, end: DateValue) {
        const calendar_data : TCalendar = await fetch_calendar(moment(start.toString()).format('YYYY-MM-DD'), moment(end.toString()).format('YYYY-MM-DD'))

        const clean_data = await handle_calendar_data(calendar_data)

        setShifts(clean_data)
    }

    async function handleDownload() {
        const ics_file = create_ics_file(shifts, title)

        if (ics_file) {
            const blob = new Blob([ics_file], { type: 'text/plain' })

            const fileURL = URL.createObjectURL(blob)

            const link = document.createElement('a')

            link.href = fileURL

            link.download = 'shifts.ics'

            link.click()

            URL.revokeObjectURL(fileURL)
        }
    }

    return (
        <div className='min-w-80 min-h-96 bg-[#191919]'>
            {/* Header */}
            <div>
                <h1 className='text-3xl font-bold text-center text-white'>Helios</h1>
            </div>
            {/* calendar */}
            <div className='flex justify-center items-center'>
                <DateRangePicker
                    label='Select period time'
                    value={date}
                    onChange={(e) => {
                        if (e) {
                            handleChange(e.start, e.end)

                            setDate({
                                start: e.start,
                                end  : e.end
                            })
                        }
                    }}
                />
            </div>
            {/* Shifts table */}
            {shifts.length > 0 && (
                <><Table isStriped>
                    <TableHeader>
                        <TableColumn>DATE</TableColumn>
                        <TableColumn>HOURS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {shifts.map((shift) => (
                            <TableRow key={moment(shift.shift_start, 'DD-MM-YYYY HH:mm').format('DD/MM/YYYY')}>
                                <TableCell>{moment(shift.shift_start, 'DD-MM-YYYY HH:mm').format('DD/MM/YYYY')}</TableCell>
                                <TableCell>{`${moment(shift.shift_start, 'DD-MM-YYYY HH:mm').format('HH:mm')} - ${moment(shift.shift_end, 'DD-MM-YYYY HH:mm').format('HH:mm')}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Input label='Name of your shifts' type='text' value={title} onValueChange={(e) => setTitle(e)} />
                <Button variant='solid' color='primary' onPress={() => handleDownload()}>
                        Download Shifts
                </Button>
                </>
            )}
        </div>
    )
}

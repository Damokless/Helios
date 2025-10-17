import moment from 'moment'
import * as ics from 'ics'
import type TShifts from '../types/Tshifts'

export default function create_ics_file(shifts : TShifts[], title: string) {
    const eventsArray: ics.EventAttributes[] = []

    for (const shift of shifts) {
        const startDate = moment(shift.shift_start, 'DD-MM-YYYY-HH-mm')

        const endDate = moment(shift.shift_end, 'DD-MM-YYYY-HH-mm')

        eventsArray.push({
            title      : title + ' 🏰🐭' || 'Disney 🏰🐭',
            description: shift.description || '',
            start      : [
                startDate.year(),
                startDate.month() + 1,
                startDate.date(),
                startDate.hour(),
                startDate.minute()
            ],
            end: [
                endDate.year(),
                endDate.month() + 1,
                endDate.date(),
                endDate.hour(),
                endDate.minute()
            ]
        })

    }

    const { error, value } = ics.createEvents(eventsArray)

    if (!error) {
        return value
    }
}

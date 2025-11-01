import moment from 'moment'
import type TCalendar from '../types/Tcalendar'

export default async function handle_calendar_data(calendar: TCalendar) {
    const shifts = []

    for (const shift of calendar.transferShifts) {

        // normal case with label, this exception is for most shifts
        if (shift.label && shift.label !== '') {

            const [shift_start_time, shift_end_time] = shift.label.split(' - ')

            shifts.push({
                shift_start: moment(shift.startDateTime).format('DD-MM-YYYY') + ' ' + shift_start_time,
                shift_end  : moment(shift.endDateTime).format('DD-MM-YYYY') + ' ' + shift_end_time,
                description: shift.segments[0].orgJobRef.qualifier || 'No description'
            })
        }
        // this exception is for Parc Ops shifts that have more segments
        else if (shift.segments.length > 2) {
            shifts.push({
                shift_start: moment(shift.segments[1].startDateTime).format('DD-MM-YYYY HH:mm'),
                shift_end  : moment(shift.segments.at(-1)?.endDateTime).format('DD-MM-YYYY HH:mm'),
                description: shift.segments[0].orgJobRef.qualifier || 'No description'
            })
        }
        // this exception is for shifts without label and only one segmen, typicaly EPC shifts
        else {
            shifts.push({
                shift_start: moment(shift.startDateTime).format('DD-MM-YYYY HH:mm'),
                shift_end  : moment(shift.endDateTime).format('DD-MM-YYYY HH:mm'),
                description: shift.segments[0].orgJobRef.qualifier || 'No description'
            })
        }
    }

    console.log(shifts)

    return shifts
}

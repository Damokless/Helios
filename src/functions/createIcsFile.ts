import moment from 'moment'
import KronosData from '../interface/IkronosData'
import * as ics from 'ics'

export default function createIcsFile(schedule: KronosData[]) {
    const eventsArray: ics.EventAttributes[] = []

    schedule.forEach((element) => {
        const shiftArray = element.time.split(' - ')

        const startDate = moment(`${element.date} ${shiftArray[0]}`, 'DD/MM/YYYY HH:mm')

        const endDate = moment(`${element.date} ${shiftArray[1]}`, 'DD/MM/YYYY HH:mm')

        if (moment(shiftArray[1]).isBefore(shiftArray[0])) {
            endDate.add(1, 'day')
        }

        eventsArray.push({
            title: 'Disney 🏰🐭',
            start: [
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
    })

    const { error, value } = ics.createEvents(eventsArray)

    console.log(value)

    if (!error) {
        return value
    }
}

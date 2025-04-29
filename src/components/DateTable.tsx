import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import KronosData from '../interface/IkronosData'
import { ReactElement, useState } from 'react'
import { Button } from '@nextui-org/button'
import createIcsFile from '../functions/createIcsFile'
import { Input } from '@heroui/input'

interface Props {
    schedule: KronosData[]
}

export default function DateTable({ schedule }: Readonly<Props>): ReactElement {
    const [nameEvents, setNameEvents] = useState('')

    const handleDownload = () => {
        const icsData = createIcsFile(schedule, nameEvents)

        if (icsData) {
            const blob = new Blob([icsData], { type: 'text/plain' })

            const fileURL = URL.createObjectURL(blob)

            const link = document.createElement('a')

            link.href = fileURL

            link.download = 'shifts.ics'

            link.click()

            URL.revokeObjectURL(fileURL)
        }
    }

    if (schedule.length > 0) {
        return (
            <>
                <Input label='Event Name' type='text' onValueChange={(e) => setNameEvents(e)} value={nameEvents} />
                <Table isStriped aria-label='Example static collection table'>
                    <TableHeader>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Schedules</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {schedule.map((element: KronosData): ReactElement => {
                            return <TableRow key={element.date}>
                                <TableCell>{element.date}</TableCell>
                                <TableCell>{element.time}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
                <div>
                    <Button variant='solid' color='primary' onPress={handleDownload}>
                        Export ics file
                    </Button>
                </div>
            </>
        )
    }

    return <></>
}

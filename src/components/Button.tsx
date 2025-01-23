import { Button } from '@nextui-org/button'
import { DateValue } from '@react-types/datepicker'
import { RangeValue } from '@react-types/shared'
import { ReactElement } from 'react'

interface Props {
    date: RangeValue<DateValue> | null,
    getSchedule: () => void
}

export default function ButtonConditional({ date, getSchedule }: Readonly<Props>): ReactElement {
    const isDisabled = !date

    return (
        <Button
            variant='solid'
            color='primary'
            isDisabled={isDisabled}
            onPress={() => getSchedule()}
        >
            get schedule
        </Button>
    )
}

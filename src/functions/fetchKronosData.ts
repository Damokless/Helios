import KronosData from '../interface/IkronosData'
import { RangeValue } from '@react-types/shared'
import { DateValue } from '@react-types/datepicker'

export default async function fetchKronosData(date: RangeValue<DateValue> | null): Promise<Array<KronosData>> {
    const headers = await chrome.storage.local.get('kronosHeaders')

    const url = await chrome.storage.local.get('kronosUrl')

    const kronosData = fetch(url.kronosUrl, {
        method : 'post',
        headers: headers.kronosHeaders,
        body   : `sessionName=AdminSession&controller=MobileScheduleDisplayController&method=getViewList&params=%7B%22startDate%22:%22${date?.start.day}-${date?.start.month}-${date?.start.year}%22,%22endDate%22:%22${date?.end.day}-${date?.end.month}-${date?.end.year}%22%7D`
    }).then((res) => res.json()).then((data) => {
        return data.data.scheduleItems
    })

    return kronosData
}

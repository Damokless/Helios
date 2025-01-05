import { CalendarDate } from "@internationalized/date";
import KronosData from "../interface/IkronosData";

export default async function fetchKronosData(startValue: CalendarDate | null, endValue: CalendarDate | null): Promise<Array<KronosData>> {
    const headers = await chrome.storage.local.get("kronosHeaders");
    const url = await chrome.storage.local.get("kronosUrl");
    const kronosData = fetch(url.kronosUrl, {
        method: 'post',
        headers: headers.kronosHeaders,
        body: `sessionName=AdminSession&controller=MobileScheduleDisplayController&method=getViewList&params=%7B%22startDate%22:%22${startValue?.day}-${startValue?.month}-${startValue?.year}%22,%22endDate%22:%22${endValue?.day}-${endValue?.month}-${endValue?.year}%22%7D`,
    }).then((res) => res.json()).then((data) => { return data.data.scheduleItems });
    return kronosData
}

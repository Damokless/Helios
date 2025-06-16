import KronosData from '../interface/IkronosData'

export default async function clearKronosData(data: Array<KronosData>): Promise<Array<KronosData>> {
    const regex = /(?<=\s)\d\S*$/gm

    const regex_last_hour = /\d*\S*(?=\s\d*$)/gm

    for (let index = 0; index < data.length; index++) {
        if (data[index].payCode === ' Horaires' && data[index].date !== '') {
            data[index].time = data[index + 1].time.replace(regex, '') || data[index].time.replace(regex, '')
        }

        if (data[index].payCode === 'FB Horaires' || data[index].payCode === 'FO Horaires') {
            if (data[index + 2].date === '') {
                const latest_hour = data[index + 3].time.match(regex_last_hour) ?? ''

                data[index].time = data[index + 1].time.replace(/\d*\S*\s(?<=\s)\d\S*$/gm, latest_hour[0]) || data[index + 1].time.replace(regex, '')
            }
            else {
                data[index].time = data[index + 1].time.replace(regex, '') || data[index].time.replace(regex, '')
            }

        }
    }

    return data.filter((item: KronosData) => item.payCode !== ' Horaires de badgeage' && item.date !== '')
}

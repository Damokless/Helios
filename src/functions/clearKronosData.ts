import KronosData from '../interface/IkronosData'

export default async function clearKronosData(data: Array<KronosData>): Promise<Array<KronosData>> {

    for (let index = 0; index < data.length; index++) {
        const regex = /(?<=\s)\d*$/gm

        if (data[index].payCode === ' Horaires') {
            data[index].time = data[index + 1].time.replace(regex, '') !== '' ? data[index].time.replace(regex, '') : data[index + 1].time.replace(regex, '')
        }
    }

    return data.filter((item: KronosData) => item.payCode === ' Horaires')
}

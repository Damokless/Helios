import KronosData from '../interface/IkronosData'

export default async function clearKronosData(data: Array<KronosData>): Promise<Array<KronosData>> {
    const regex = /(?<=\s)\d*$/gm

    for (let index = 0; index < data.length; index++) {

        if (data[index].payCode === ' Horaires') {
            data[index].time = data[index + 1].time.replace(regex, '') || data[index].time.replace(regex, '')
        }
    }

    return data.filter((item: KronosData) => item.payCode === ' Horaires')
}

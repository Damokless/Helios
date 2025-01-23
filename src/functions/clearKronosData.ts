import KronosData from '../interface/IkronosData'

export default async function clearKronosData(data: Array<KronosData>): Promise<Array<KronosData>> {
    for (let index = 0; index < data.length; index++) {
        if (data[index].payCode === ' Horaires') {
            data[index].time = data[index + 1].time.replace(' 404504', '')
        }
    }

    return data.filter((item: KronosData) => item.payCode === ' Horaires')
}

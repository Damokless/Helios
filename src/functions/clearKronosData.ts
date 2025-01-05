import KronosData from "../interface/IkronosData"

export default async function clearKronosData(data: Array<KronosData>) : Promise<Array<KronosData>> {
    for (let index = 0; index < data.length; index += 2) {
        data[index + 1].date = data[index].date
    }
    return data.filter((item: KronosData) => item.payCode === " Horaires de badgeage")
}

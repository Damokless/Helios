export default async function fetch_calendar(start_date: string, end_date: string) {
    const headers = await chrome.storage.local.get('kronosHeaders')

    const url = await chrome.storage.local.get('kronosUrl')

    const kronosData = fetch(url.kronosUrl, {
        method : 'post',
        headers: headers.kronosHeaders,
        body   : JSON.stringify({
            data: {
                calendarConfigId: 3005002,
                includedEntities: [
                    'entity.openshift',
                    'entity.transfershift',
                    'entity.scheduletag',
                    'entity.regularshift',
                    'entity.paycodeedit',
                    'entity.holiday',
                    'entity.openshiftrequest',
                    'entity.swaprequest',
                    'entity.timeoffrequest'
                ],
                includedCoverRequestsStatuses              : [],
                includedSwapRequestsStatuses               : [],
                includedTimeOffRequestsStatuses            : [],
                includedOpenShiftRequestsStatuses          : [],
                includedSelfScheduleRequestsStatuses       : [],
                includedAvailabilityRequestsStatuses       : [],
                includedAvailabilityPatternRequestsStatuses: [],
                dateSpan                                   : {
                    start: start_date,
                    end  : end_date
                },
                showJobColoring           : true,
                showOrgPathToDisplay      : true,
                includeEmployeePreferences: true,
                includeNodeAddress        : true,
                removeDuplicatedEntities  : true,
                hideInvisibleTORPayCodes  : true
            }
        })
    }).then((res) => res.json()).then((data) => {
        console.log({
            transferShifts: [
                ...new Set([
                    ...data.transferShifts,
                    ...data.regularShifts
                ])
            ]
        })

        return {
            transferShifts: [
                ...new Set([
                    ...data.transferShifts,
                    ...data.regularShifts
                ])
            ]
        }
    })

    return kronosData
}

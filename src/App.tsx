import {Button} from '@nextui-org/button';

function App() {
    // async function fetchData(headers: HeadersInit, url: string) {
    //     await fetch(url, {
    //         method: 'post',
    //         headers,
    //         body: 'sessionName=AdminSession&controller=MobileScheduleDisplayController&method=getViewList&params=%7B%22startDate%22:%2212-1-2025%22,%22endDate%22:%2219-1-2025%22%7D',
    //     }).then((res) => res.json()).then((data) => { console.log(data) });
    // }

    async function getLocalStorageData() {
        console.log(await chrome.storage.local.get("kronosHeaders"))
    }
    return (
        <div className=' min-w-80'>
            <Button variant='solid' color='primary' onPress={() => (getLocalStorageData())}>test header</Button>
        </div>
    );
}

export default App;

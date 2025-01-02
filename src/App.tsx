import { useState } from "react";

function App() {
    const [data, setData] = useState([])
    async function fetchData(headers: HeadersInit, url: string) {
        await fetch(url, {
            method: 'post',
            headers,
            body: 'sessionName=AdminSession&controller=MobileScheduleDisplayController&method=getViewList&params=%7B%22startDate%22:%2212-1-2025%22,%22endDate%22:%2219-1-2025%22%7D',
        }).then((res) => res.json()).then((data) => { setData(data); });
    }

    let headers: Record<string, string> = {};

    function getRequestHeaders(details: chrome.webRequest.WebRequestHeadersDetails) {
            headers = details.requestHeaders?.reduce((obj, item) => ({ ...obj, [item.name]: item.value }), {}) as Record<string, string>;
            console.log(fetchData(headers, details.url));

            chrome.webRequest.onBeforeSendHeaders.removeListener(getRequestHeaders);
    };

    chrome.webRequest.onBeforeSendHeaders.addListener(
        getRequestHeaders,
        { urls: ["https://disneyeu.kronos.net/wfc/applications/KSSHELPERS/html/ajaxHelper.jsp"] },
        ['requestHeaders', 'extraHeaders']
    );

    return (
        <div>
            <h1>test display</h1>
            {data}
        </div>
    );
}

export default App;

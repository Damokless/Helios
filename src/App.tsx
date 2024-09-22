function App() {
  async function fetchData(headers : HeadersInit, url : string) {
    await fetch(url, {method : 'post', headers, body :'sessionName=AdminSession&controller=MobileScheduleDisplayController&method=getViewList&params=%7B%22startDate%22:%2221-9-2024%22,%22endDate%22:%2222-10-2024%22%7D'}).then((res) => res.json()).then((data) => {console.log(data)})
  }
  let headers = {}
    chrome.webRequest.onBeforeSendHeaders.addListener(
      function (details) {
        if (details.url === "https://disneyeu.kronos.net/wfc/applications/KSSHELPERS/html/ajaxHelper.jsp") {
          headers = details.requestHeaders?.reduce((obj, item)=> ({ ...obj, [item.name] : item.value})) as object
          fetchData(headers, details.url)
        }
      },
      { urls: ["<all_urls>"] },
      ['requestHeaders', 'extraHeaders']
    )

  return (
    <h1 className="text-3xl font-bold underline text-pink-500">
      Hello World
    </h1>
  );
}

export default App;

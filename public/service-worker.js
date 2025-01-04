function getRequestHeaders(details) {
        console.log(details.requestHeaders?.reduce((obj, item) => ({ ...obj, [item.name]: item.value }), {}));
        chrome.storage.local.set({
            kronosHeaders : details.requestHeaders?.reduce((obj, item) => ({ ...obj, [item.name]: item.value }), {})
          });

        chrome.webRequest.onBeforeSendHeaders.removeListener(getRequestHeaders);
};

chrome.webRequest.onBeforeSendHeaders.addListener(
    getRequestHeaders,
    { urls: ["https://disneyeu.kronos.net/wfc/applications/KSSHELPERS/html/ajaxHelper.jsp"] },
    ['requestHeaders', 'extraHeaders']
);

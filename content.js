chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkUrl") {
    fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=YOUR_API_KEY`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client: {
            clientId: "your-client-id",
            clientVersion: "1.0",
          },
          threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url: request.url }],
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        sendResponse({ isMalicious: data.matches ? true : false });
      });
    return true; // Indica che la risposta sarà asincrona.
  }
});

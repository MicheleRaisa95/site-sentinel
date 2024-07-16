<template>
  <div>
    <h1>URL Safety Checker</h1>
    <div v-if="urlInfo">
      <p>Current URL: {{ url }}</p>
      <p v-if="urlInfo.isMalicious">This site is malicious!</p>
      <p v-else>This site is safe.</p>
    </div>
    <button @click="checkUrl">Check URL</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      urlInfo: null,
    };
  },
  methods: {
    async checkUrl() {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      this.url = tab.url;
      const response = await fetch(
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
              threatEntries: [{ url: this.url }],
            },
          }),
        }
      );
      const data = await response.json();
      this.urlInfo = { isMalicious: data.matches ? true : false };
    },
  },
};
</script>

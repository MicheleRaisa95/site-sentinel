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
      chrome.runtime.sendMessage(
        { action: "checkUrl", url: this.url },
        (response) => {
          this.urlInfo = response;
        }
      );
    },
  },
};
</script>

const baseUrl = 'https://boardgamearena.com';
let _initialized = false;

interface BGAConfig {
  requestToken: string;
}

const _init = () => {
  if (_initialized) {
    return;
  }

  if (!document.body) {
    setTimeout(_init, 50);
    return;
  }

  _initialized = true;

  document.body.addEventListener('bga_ext_api_call', ((data: CustomEvent) => {
    console.debug('[bga extension] call bga api', data);

    const evtDetail = JSON.parse(data.detail);
    const evtType = evtDetail.type || 'CallApi';

    if (evtType === 'ToggleTheme') {
      // @ts-ignore
      try {
        (window as any).require('svelte/index').stores.darkMode.toggleThemePref();
      } catch (e) {
        console.error('[bga extension] error toggling theme', e);
      }
      return;
    }

    const bgaConfig = (window as any).bgaConfig as BGAConfig; // defined by bga webrtc logic
    if (!bgaConfig || !bgaConfig.requestToken) {
      console.error('[bga extension] bgaConfig not initialized');
      return;
    }

    const headers = { 'x-request-token': bgaConfig.requestToken, 'Content-Type': 'application/x-www-form-urlencoded' };

    fetch(`${baseUrl}${evtDetail.endPoint}`, { method: evtDetail.method, body: evtDetail.body, headers, credentials: 'same-origin' }).then((response) => {
      response.json().then(json => {
        if (!json.error) {
          const detail = JSON.stringify({ key: evtDetail.key, type: evtDetail.type, data: evtDetail.data, response: json });
          document.body.dispatchEvent(new CustomEvent('bga_ext_api_result', { detail }));
        } else if (evtDetail.errorResult) {
          const detail = JSON.stringify({ key: evtDetail.key, type: evtDetail.type, data: evtDetail.data, response: evtDetail.errorResult });
          document.body.dispatchEvent(new CustomEvent('bga_ext_api_result', { detail }));
        } else {
          alert(json.error);
        }
      });
    });
  }) as EventListener);

  console.debug('[bga extension] bga api intialized');
};

// Relay the page navigations (history.pushState / replaceState) to the content script, which can't see them
// when the browser has no Navigation API (see locationChangeManager.ts)
const relayHistoryChanges = () => {
  if ((window as any).navigation || (history as any).bgaExtRelayed) {
    return;
  }
  (history as any).bgaExtRelayed = true;

  (['pushState', 'replaceState'] as const).forEach((method) => {
    const original = history[method];
    history[method] = function (this: History, ...args: Parameters<History['pushState']>) {
      const result = original.apply(this, args);
      document.dispatchEvent(new CustomEvent('bga_ext_location_change'));
      return result;
    };
  });
};

relayHistoryChanges();
_init();

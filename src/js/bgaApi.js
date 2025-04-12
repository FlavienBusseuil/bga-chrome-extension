const baseUrl = 'https://boardgamearena.com';
let _initialized = false;

const _init = () => {
  if (_initialized) {
    return;
  }

  if (!document.body) {
    setTimeout(_init, 50);
    return;
  }

  _initialized = true;

  document.body.addEventListener('bga_ext_api_call', (data) => {
    console.debug('[bga extension] call bga api', data);
    const headers = { 'x-request-token': bgaConfig.requestToken, 'Content-Type': 'application/x-www-form-urlencoded' };
    const evtDetail = JSON.parse(data.detail);

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
  });

  console.debug('[bga extension] bga api intialized');
};

_init();
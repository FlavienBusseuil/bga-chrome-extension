const baseUrl = 'https://boardgamearena.com';

const initBgaApi = () => {
  try {
    document.body.addEventListener('bga_ext_api_call', (data) => {
      console.debug('[bga extension] call bga api', data);
      const headers = { 'x-request-token': bgaConfig.requestToken };
      const evtDetail = JSON.parse(data.detail);

      fetch(`${baseUrl}${evtDetail.endPoint}`, { method: evtDetail.method, body: evtDetail.body, headers, credentials: 'same-origin' }).then((response) => {
        response.json().then(json => {
          if (json.error) {
            alert(json.error);
          } else {
            const detail = JSON.stringify({ key: evtDetail.key, type: evtDetail.type, response: json });
            document.body.dispatchEvent(new CustomEvent('bga_ext_api_result', { detail }));
          }
        });
      });
    });
  }
  catch (error) {
    setTimeout(initBgaApi, 200);
  }
};

initBgaApi();
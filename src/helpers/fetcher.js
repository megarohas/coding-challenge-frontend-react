const CON_TIMEOUT = 999999999;

export function genParams(params) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
}

function checkStatus(response, resolve, reject) {
  if (response.status >= 200 && response.status < 300) {
    response.isError = false;
    return response;
  }
  response.isError = true;
  return response;
}

function getResponseJson(response) {
  return response
    .json()
    .then(data => {
      data.isError = response.isError;
      return data;
    })
    .catch(e => {
      return e;
    });
}

function request(url, method, json) {
  let body = method === "GET" ? {} : { body: JSON.stringify(json) };
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(function() {
      reject(new Error("Request timed out"));
    }, CON_TIMEOUT);
    fetch(url, {
      ...{
        method,
        credentials: "same-origin",
        mode: "cors",
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8"
        })
      },
      ...body
    })
      .then(response => {
        clearTimeout(timeout);

        return response;
      })
      .then(response => checkStatus(response, resolve, reject))
      .then(getResponseJson)
      .then(data => {
        const { isError, ...other } = data;
        if (isError) {
          reject(other.error);
        } else resolve(other);
      })
      .catch(error => reject(error));
  });
}

export function post(url, json) {
  return request(url, "POST", json);
}

export function get(url) {
  return request(url, "GET", {});
}

export function del(url, json) {
  return request(url, "DELETE", json);
}

export function put(url, json) {
  return request(url, "PUT", json);
}

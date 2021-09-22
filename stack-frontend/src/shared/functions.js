export const getQueryParams = (params) => {
  return Object.keys(params)
    .map((key) => {
      if (!["", null, undefined].includes(params[key])) {
        return `${key}=${params[key]}&`;
      }
    })
    .join("");
};

export const api = async (method = "GET", URL, params = {}) => {
  try {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let response = {};

    if (method == "GET") {
      response = await fetch(URL + "?" + getQueryParams(params), {
        method: method,
        headers,
      }).then((response) => response.json());
    } else {
      response = await fetch(URL, {
        method: method,
        headers,
        body: JSON.stringify(params),
      }).then((response) => response);
    }
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};

import axios from 'axios';
import constants from './constants.js';

export async function getApi(url, header) {
  return await axios.get(`${constants.BASE_URL}/${url}`, {
    headers: {
      Accept: header?.accept,
      'Content-type': header?.contenttype,
      Authorization: `Bearer ${header.accessToken}`,
    },
  });
}

export async function getApiWitPayload(url, header, payload) {
  return await axios.get(`${constants.BASE_URL}/${url}`, {
    headers: {
      Accept: header?.accept,
      'Content-type': header?.contenttype,
      Authorization: `Bearer ${header.accessToken}`,
    },
  });
}

export async function getApiWithParam(url, header, param) {
  // console.log('url', url, param, header);
  return await axios.get(`${constants.BASE_URL}/${url}`, {
    headers: {
      Accept: header?.accept,
      'Content-type': header?.contenttype,
      Authorization: header?.accessToken,
    },
    params: param,
  });
}

export async function getApiWithUrlParam(url, header, param) {
  return await axios.get(`${constants.BASE_URL}/${url}/${param}`, {
    headers: {
      Accept: header?.accept,
      'Content-type': header?.contenttype,
      Authorization: header?.accessToken,
    },
  });
}

export async function postApi(url, payload, header) {
  // console.log('url', url, payload, header);
  let response = await axios.post(`${constants.BASE_URL}/${url}`, payload, {
    headers: {
      Accept: header?.accept,
      'Content-Type': header?.contenttype,
      Authorization: `Bearer ${header?.Authorization}`,
    },
  });
  return response;
}

export async function postApiNew(url, payload, header) {
  let response = await axios.post(`${constants.BASE_URL}/${url}`, payload, {
    headers: {
      Accept: header?.accept,
      'Content-Type': header?.contenttype,
      Authorization: `${header?.Authorization}`,
    },
  });
  return response;
}

export async function putApi(url, payload, header) {
  return await axios.put(`${constants.BASE_URL}/${url}`, payload, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      Authorization: `Bearer ${header.accesstoken}`,
    },
  });
}

export async function deleteApi(url, payload, header) {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `${constants.BASE_URL}/${url}`,
    headers: {
      'x-access-token': header.token,
      Authorization: `Bearer ${header.accesstoken}`,
    },
    data: payload,
  };

  let response = await axios.request(config);

  return response;
}

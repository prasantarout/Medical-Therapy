import axios from 'axios';
import constants from './constants.js';
import Toast from './Toast.js';
import {deleteMemberSuccess} from '../../redux/reducer/FamilyMemberReducer.js';
import {put} from 'redux-saga/effects.js';

export async function getApi(url, header) {
  console.log('GetApi: ', `${constants.BASE_URL}/${url}`);

  return await axios.get(`${constants.BASE_URL}/${url}`, {
    headers: {
      accept: header?.Accept,
      'Content-type': header?.contenttype,
      'x-access-token': `${header?.token}`,
      // authorization: `Bearer ${header.accesstoken}`,
    },
  });
}

export async function getApiWithParam(url, param, header) {
  console.log('getApiWithParam: ', `${constants.BASE_URL}/${url}/${param}`);

  return await axios({
    method: 'GET',
    baseURL: constants.BASE_URL,
    url: url,
    headers: {
      Accept: header.Accept,
      'Content-type': header.contenttype,
      Authorization: `Bearer ${header.accesstoken}`,
      // "x-access-token": `${header.token}`,
    },
  });
}

export async function postApi(url, payload, header) {
  console.log('PostApi: ', `${constants.BASE_URL}/${url}`, payload, header);
  // console.log('---->Header', header);
  let response = await axios.post(`${constants.BASE_URL}/${url}`, payload, {
    headers: {
      accept: header.accept,
      'Content-Type': header.contenttype,
      'x-access-token': `${header.token}`,
      // authorization: `${header.accesstoken}`,
      // Authorization: `Bearer ${header.accesstoken}`,
    },
  });
  return response;
}

export async function putApi(url, payload, header) {
  // console.log(payload,"dasdasd");
  console.log('URL', `${constants.BASE_URL}/${url}`);
  return await axios.put(`${constants.BASE_URL}/${url}`, payload, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      // 'x-access-token': `${header.token}`,
      // authorization: `${header.accesstoken}`,
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
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${header.accesstoken}`,
      // authorization: `${header.accesstoken}`,
    },
    data: payload,
  };

  let response = await axios.request(config);

  return response;
}

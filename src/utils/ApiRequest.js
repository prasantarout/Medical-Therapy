import axios from 'axios';
import constants from './constants.js';
import Toast from './Toast.js';
import {deleteMemberSuccess} from '../../redux/reducer/FamilyMemberReducer.js';
import {put} from 'redux-saga/effects.js';

export async function getApi(url, header) {
  console.log('GetApi: ', `${constants.BASE_URL}/${url}`);

  return await axios.get(`${constants.BASE_URL}/${url}`, {
    headers: {
      Accept: header?.accept,
      'Content-type': header?.contenttype,
      // 'x-access-token': `${header?.token}`,
      Authorization: `Bearer ${header.accessToken}`,
    },
  });
}
export async function getApiWitPayload(url, header,payload) {
  console.log('GetApiPayload: ', payload);

  return await axios.get(`${constants.BASE_URL}/${url}`, {
    headers: {
      Accept: header?.accept,
      'Content-type': header?.contenttype,
      // 'x-access-token': `${header?.token}`,
      Authorization: `Bearer ${header.accessToken}`,
    },
    // data:JSON.stringify(payload)
  });
}

export async function getApiWithParam(url, param, header) {

  let paramsKey=Object.keys(param)[0];
  let paramValue=Object.values(param)[0]


  return await axios.get(`${constants.BASE_URL}/${url}`, {
    params:{
    [paramsKey]:paramValue
    },
    headers: {
          Accept: header.Accept,
          'Content-type': header.contenttype,
          Authorization: `Bearer ${header.accessToken}`,
          // "x-access-token": `${header.token}`,
        },
  })
}

export async function postApi(url, payload, header) {
  console.log('PostApiRequestLog: ', `${constants.BASE_URL}/${url}`, payload, header);
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
  console.log('PostApiRequestLog: ', `${constants.BASE_URL}/${url}`, payload, header);
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

import * as types from './action_types';
import * as commonActions from './common_actions';

export const queryVisitItems = (token) => {
  return commonActions.requestGet(types.GET_VISIT_ITEMS_HTTP, '/nurse/visit/patient/service/item', token);
}

export const addVisit = (token, visit) => {
  return commonActions.requestPost(types.ADD_VISIT_HTTP, '/nurse/visit/patient', visit, token);
}

export const requestUploadImageWaiting = (data) => {
  const type = data ? types.REQUEST_UPLOAD_IMAGE_WAITING_HTTP : types.REQUEST_UPLOAD_IMAGE_WAITING_HTTP + types.SUCCESS;
  return {type: type};
}

export const sendPatientSignature = (token, visitRecordId, image) => {
  let data = new FormData()
  let converted = decodeBase64Image(image)
  data.append('image', converted)
  data.append('visit_record_id', visitRecordId);
  return commonActions.uploadImageObject(types.SEND_PATIENT_SIGNATURE_HTTP, '/nurse/visit/patient/sign', data, token);
}

export const decodeBase64Image = (dataURI) => {
  let byteString;
  if (dataURI === undefined) {
    return undefined
  }
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  let mimeString = ''
  if (dataURI.split(',')[0] != undefined && dataURI.split(',')[0].split(':')[1] != undefined) {
    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  }
  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type: mimeString});
}
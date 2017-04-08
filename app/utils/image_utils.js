const FileUpload = require('NativeModules').FileUpload;
import Config from "react-native-config";
import RNGRP from "react-native-get-real-path";

export const uploadImage = (uri, httpUri, token, data) => {
  return new Promise((resolve, reject)=>{
    RNGRP.getRealPathFromURI(uri).then(filePath => {
        const fileName = filePath.split('/').pop(-1);
        const obj = {
          uploadUrl: Config.API_URL + httpUri,
          method: 'POST', // default 'POST',support 'POST' and 'PUT'
          headers: {
            'Accept': 'application/json',
            'ACCESS_TOKEN': token,
          },
          fields: data,
          files: [
            {
              filename: fileName, // require, file name
              filepath: filePath, // require, file absoluete path
              // filetype: 'image/jpeg', // options, if none, will get mimetype from `filepath` extension
            },
          ],
        };
        console.log('upload ', filePath);
        FileUpload.upload(obj, function (err, result) {
          console.log('upload result ', result);
          if (err) {
            console.error('get error:', err);
            reject(err);
          }
          resolve();
        });
      }
    )
  });
}
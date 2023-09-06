import { Injectable } from "@nestjs/common";
import HmacSHA256 from "crypto-js/hmac-sha256";
import encodeBase64 from "crypto-js/enc-base64";

import http from "./httpClient";
import moment from "moment";

const JsonBigint = require('json-bigint');

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36"
}

@Injectable()
export class HuobiHttpService {


  async sign_sha(method, baseurl, path, data) {
    var pars = [];
    for (let item in data) {
      pars.push(item + "=" + encodeURIComponent(data[item]));
    }
    var p = pars.sort().join("&");
    var meta = [method, baseurl, path, p].join('\n');
    // console.log(meta);
    var hash = HmacSHA256(meta, process.env.HUOBI_SECRET);
    // var Signature = encodeURIComponent(CryptoJS.enc.Base64.stringify(hash));
    var Signature = encodeURIComponent(encodeBase64.stringify(hash));
    // console.log(`Signature: ${Signature}`);
    p += `&Signature=${Signature}`;
    // console.log(p);
    return p;
  }

  get_body() {
    return {
      AccessKeyId: process.env.HUOBI_API_KEY,
      SignatureMethod: "HmacSHA256",
      SignatureVersion: 2,
      Timestamp: moment.utc().format('YYYY-MM-DDTHH:mm:ss'),
    };
  }


  async call_get(tip, path){
    // http.get(path, {
    //   timeout: 1000,
    //   headers: DEFAULT_HEADERS
    // }).then(data => {
    //   let json = JsonBigint.parse(data);
    //   if (json.status == 'ok') {
    //     // var outputStr = tip + "......" + path + "\r\n";
    //     // Array.isArray(json.data) ? json.data.forEach(e=>{outputStr += JsonBigint.stringify(e)+'\r\n'}): outputStr+=JsonBigint.stringify(json);
    //     // console.log(outputStr);
    //     Promise.resolve(json.data);
    //   } else {
    //     console.log('ошибка вызова', tip, "......",  path, "......", json.data ?? data);
    //     Promise.reject(null);
    //   }
    // }).catch(ex => {
    //   console.error('GET', path, 'аномальный', ex, tip, '......', path, "  Заканчивать\r\n");
    // });

    try {
      const qRes = await http.get(path, {
        timeout: 1000,
        headers: DEFAULT_HEADERS
      });
      const resJson = JsonBigint.parse(qRes as string);  // не обязательно, проверить
      return resJson.data;
    } catch (e) {
      console.error('GET', path, 'аномальный', e, tip, '......', path, "  Заканчивать\r\n");
    }
  }

  async call_post(tip, path, payload, body){
    var payloadPath = `${path}?${payload}`;
    http.post(payloadPath, body, {
      timeout: 1000,
      headers: DEFAULT_HEADERS
    }).then(data => {
      let json = JsonBigint.parse(data);
      if (json.status == 'ok') {
        var outputStr = tip + "......" + path + "\r\n";
        Array.isArray(json.data) ? json.data.forEach(e=>{outputStr += JsonBigint.stringify(e)+'\r\n'}): outputStr+=JsonBigint.stringify(json);
        console.log(outputStr);
      } else {
        console.log(tip + 'передача status'+ json.status, json, "\r\n", tip, '......', path, "  Заканчивать\r\n");
      }
    }).catch(ex => {
      console.log(tip, '.........', path, "POST", 'аномальный', ex);
    });
  }


}

export const huobiHttpService = new HuobiHttpService();

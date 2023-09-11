import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Injectable, Logger } from "@nestjs/common";
import * as CryptoJS from "crypto-js";

// ToDO: to .env
const HUOBI_URL = "api.huobi.pro";
const HUOBI_BASE_URL = `https://${HUOBI_URL}`;
const HUOBI_API_KEY = "1bac1432-6ee7e664-8dead21f-xa2b53ggfc";
const HUOBI_SECRET = "f6e9ca04-8a4dd8ca-e7fb8d5b-c7990";

@Injectable()
export class HuobiHttpService {

  private readonly logger = new Logger(HuobiHttpService.name);
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    const axiosConfig = {
      baseURL: HUOBI_BASE_URL,   // ToDo
      // baseURL: process.env.HUOBI_BASE_URL, // ToDo
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36"
      },
      timeout: 1000
    };

    this.axiosInstance = axios.create(axiosConfig);
  }

  getSignedUriParams(method: string, baseurl, path, queryParams: any) {
    try {
      const pars = [];
      for (let item in queryParams) {
        pars.push(item + "=" + encodeURIComponent(queryParams[item]));
      }

      let joinedParams = pars.sort().join("&");
      const meta = [method, baseurl, path, joinedParams].join("\n");
      const hash = CryptoJS.HmacSHA256(meta, HUOBI_SECRET);
      const Signature = encodeURIComponent(CryptoJS.enc.Base64.stringify(hash));

      return `${joinedParams}&Signature=${Signature}`;
    } catch (e) {
      console.error(e);
      return "";
    }
  }

  // getSignature(method: string, uri: string, params: any) {
  //   try {
  //     const pars = [];
  //     for (let item in params) {
  //       pars.push(item + "=" + encodeURIComponent(params[item]));
  //     }
  //
  //     let p = pars.sort().join("&");
  //     console.log(">>> p:", p);
  //
  //     const meta = [method, HUOBI_URL, uri, p].join("\n");
  //     console.log(">>> meta:", meta);
  //
  //     const hash = CryptoJS.HmacSHA256(meta, HUOBI_SECRET);
  //     return encodeURIComponent(CryptoJS.enc.Base64.stringify(hash));
  //   } catch (e) {
  //     console.error(e);
  //     return undefined;
  //   }
  // }

  async signedGet(uri: string) {
    const queryParams = {
      AccessKeyId: HUOBI_API_KEY,
      SignatureMethod: "HmacSHA256",
      SignatureVersion: 2,
      Timestamp: new Date().toISOString().replace(/\..+/, "")
    };

    // const signature = this.getSignature("GET", uri, queryParams);
    // const requestConfig = {
    //   params: {
    //     ...queryParams,
    //     // Timestamp: encodeURIComponent(queryParams.Timestamp.toString()),
    //     Signature: signature
    //   }
    // };
    // console.log('>>> requestConfig', requestConfig);
    // return this.axiosInstance.get(uri, requestConfig);

    const uriParams = this.getSignedUriParams("GET", HUOBI_URL, uri, queryParams);

    this.logger.log(`uri: ${uri}; uriParams: ${uriParams}`);

    return this.axiosInstance.get(`${uri}?${uriParams}`);
  }

  async get(uri: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.get(uri, config);
  }

  async post(uri: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.post(uri, data, config);
  }


  async test() {
    const queryParams = {
      AccessKeyId: HUOBI_API_KEY,
      SignatureMethod: "HmacSHA256",
      SignatureVersion: 2,
      Timestamp: new Date().toISOString().replace(/\..+/, "")
    };

    const uriParams = this.getSignedUriParams("GET", HUOBI_URL, '/test-uri', queryParams);

    return {
      HUOBI_BASE_URL: process.env.HUOBI_BASE_URL,
      HUOBI_API_KEY: process.env.HUOBI_API_KEY,
      HUOBI_SECRET: process.env.HUOBI_SECRET,
      uriParams,
      axiosDef: this.axiosInstance.defaults
    }
  }
}

export const huobiHttpService = new HuobiHttpService();
export default huobiHttpService;

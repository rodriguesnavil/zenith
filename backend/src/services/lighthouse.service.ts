import {
  LIGHTHOUSE_URL,
  LIGHTHOUSE_BEARER_TOKEN,
  LIGHTHOUSE_URL_UPLOADS,
} from "../helper-lighthouse";
import axios, { AxiosResponse } from "axios";
import * as fs from "fs";
const path = require("path");
const FormData = require("form-data");

export class LightHouseService {
  constructor() {}
  public uploadVolume(filename: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = LIGHTHOUSE_URL;
        const apiKey = LIGHTHOUSE_BEARER_TOKEN;
        const formData = new FormData();
        const headers = {
          Authorization: `Bearer ${apiKey}`,
          ...formData.getHeaders(),
        };
        const baseDirectory = __dirname;
        const relativePath = "../../test/"+filename;
        const absolutePath = path.join(baseDirectory, relativePath);
        console.log(`absolutePath is ${absolutePath}`)
        formData.append("file", fs.createReadStream(absolutePath));
        axios
          .post(url, formData, { headers })
          .then((response) => {
            console.log("Response:", response);
            resolve(response.data);
          })
          .catch((error) => {
            console.error("Error making request:", error);
            reject("Error making request");
          });
      } catch (e) {
        console.log(`error: ${e}`);
        return reject(e);
      }
    });
  }
  public getParams(filename: string): any {
    return new Promise(async (resolve, reject) => {
      try {
        const url = LIGHTHOUSE_URL_UPLOADS;
        const apiKey = LIGHTHOUSE_BEARER_TOKEN;
        const headers = {
          Authorization: `Bearer ${apiKey}`,
        };
        axios
          .get(url, { headers })
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].fileName == filename) {
                const data = {
                  pieceCid: response.data[i].pieceCid,
                  pieceSize: response.data[i].pieceSize,
                  label: response.data[i].payloadCid,
                  carSize: response.data[i].carSize,
                  id: response.data[i].id,
                };
                return resolve(data);
              }
            }
          })
          .catch((error) => {
            console.error("Error making request:", error);
          });
      } catch (e) {
        console.log(`error: ${e}`);
      }
    });
  }
}

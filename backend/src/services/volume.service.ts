//get all the article ids
//fetch the articles from mongo
//convert them to car files
//upload them to data.lighthouse.storage
//make-deal
import { volumeStatus } from "../models/volume/schema";
import { VolumeModel } from "../models/volume/volume.model";
import { ArticleModel } from "../models/article/article.model";
import ArticleService from "../services/article.service";
import LightHouseService from "../services/lighthouse.service";
import MakeDealService from "../services/makeDeal.service";

import { isNull } from "lodash";
export default class VolumeService {
  volume: VolumeModel;

  constructor(volume: VolumeModel) {
    this.volume = volume;
  }
  insertVolume(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let volume: any = await this.volume.findOne({
          volumeId: payload.volumeId,
        });
        if (isNull(volume)) {
          volume = {};
          (volume.volumeId = payload.volumeId),
            (volume.created_at = new Date()),
            (volume.status = volumeStatus.NOSTATUS);
          volume.articles = payload.articles;
          volume = await this.volume
            .save(volume)
            .then((savedVolume) => {
              console.log(`volume saved successfully:`, savedVolume);
            })
            .catch((error) => {
              console.error("Error saving volume:", error);
            });
          return resolve(volume);
        }
      } catch (e) {
        return reject(e);
      }
    });
  }

  getVolume(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let volume: any = await this.volume.findOne({
          volumeId: payload.volumeId,
        });
        return resolve(volume);
      } catch (e) {
        return reject(e);
      }
    });
  }
  publishVolume(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let articleService = new ArticleService(new ArticleModel());
        let lightHouseService = new LightHouseService();
        let makeDealService = new MakeDealService();

        let volume: any = await this.volume.findOne({
          volumeId: payload.volumeId,
        });

        let fileNames = [];

        for (let i = 0; i < volume.artilces.length; i++) {
          let article: any = await articleService.getArticle(
            volume.artilces[i].id
          );
          fileNames.push(article.title);
          //save all the file in tmp folder
        }
        //make all file in to one file and give volumeId as file name
        let filename;
        lightHouseService.uploadVolume(filename);
        let makeDealPayload = {
          filename: filename,
          startEpoch: payload.startEpoch,
          endEpoch: payload.endEpoch,
        };
        let response = makeDealService.makeDeal(makeDealPayload);
        return resolve(response);
      } catch (e) {
        return reject(e);
      }
    });
  }
}

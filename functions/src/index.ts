import axios from "axios";
import * as functions from "firebase-functions";

const getJson = async <T>(url: string) => {
  const res= await axios.get(url, {
    responseType: "json",
  });
  const objectRes =
            JSON.parse(JSON.stringify(res.data)) as T;
  return objectRes;
};

const getImage =async (url:string) => {
  const downloadRes =await axios.get( url, {
    responseType: "arraybuffer",
  });
  const buffer = Buffer.from(downloadRes.data, "binary");

  return buffer;
};

const resImage = (arg:{res: functions.Response, buffer:Buffer}) => {
  arg.res
      .set("Content-Type", "image/png")
      .set("Cache-Control", "public, max-age=0")
      .send( arg.buffer);
  return;
};


interface TlgtmoonRandomRes{
    images: TlgtmoonContent[]
}
interface TlgtmoonContent{
    url: string
}

const random = functions
    .region("asia-northeast1")
    .https.onRequest(
        async (
            req: functions.https.Request,
            res: functions.Response
        ) => {
          const apiUrl = "https://lgtmoon.herokuapp.com/api/images/random";

          const object =await getJson<TlgtmoonRandomRes>( apiUrl);
          const url = object.images[0].url;

          const buffer =await getImage(url);
          return resImage({res, buffer});
        }
    );

const recent = functions
    .region("asia-northeast1")
    .https.onRequest(
        async (
            req: functions.https.Request,
            res: functions.Response
        ) => {
          const apiUrl= "https://lgtmoon.herokuapp.com/api/images/recent";

          const object =await getJson<TlgtmoonRandomRes>( apiUrl);
          const url = object.images[0].url;

          const buffer =await getImage(url);
          return resImage({res, buffer});
        }
    );


interface TDogRandomRes{
    message: string,
}

export const dogRandom = functions
    .region("asia-northeast1")
    .https.onRequest(
        async (
            req: functions.https.Request,
            res: functions.Response
        ) => {
          const apiUrl= "https://dog.ceo/api/breeds/image/random";

          const object =await getJson<TDogRandomRes>( apiUrl);
          const url = object.message;

          const buffer =await getImage(url);
          return resImage({res, buffer});
        }
    );


interface TCatRandomRes{
    url: string,
}

export const catRandom = functions
    .region("asia-northeast1")
    .https.onRequest(
        async (
            req: functions.https.Request,
            res: functions.Response
        ) => {
          const apiUrl= "https://api.thecatapi.com/v1/images/search";

          const object = await getJson<TCatRandomRes>(apiUrl);
          const url = object.url;

          const buffer =await getImage(url);
          return resImage({res, buffer});
        }
    );

export const lgtmoon = {random, recent};

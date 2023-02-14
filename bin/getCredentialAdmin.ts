import * as admin from "firebase-admin";


/// 手動でデータを追加する際に使う関数。
export const getCredentialAdmin = async (
  { assertPrd = false } = {}
) => {
      // ex: node create_lottery.js dev
    let serviceAccount;
  switch (process.argv[2]) {
    case "dev":
      serviceAccount = require("./keys/dev.json");
      break;
    case "stg":
      serviceAccount = require("./keys/stg.json");
      break;
    case "prd":
      if (assertPrd) {
        throw Error("このスクリプトは本番環境で使ってはいけません");
      }
      serviceAccount = require("./keys/prd.json");
      break;
    default:
      console.log("引数は{dev|stg|prd}を指定してください");
      process.exit();
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
    console.log(`serviceAccount:${process.argv[2]}:read:completed`);
    return admin;
};

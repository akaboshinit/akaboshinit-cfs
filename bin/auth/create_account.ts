import {getCredentialAdmin} from "../getCredentialAdmin";

const command = async () => {
    const admin =await getCredentialAdmin();

const auth =  admin.auth();
const operator_role = "admin";
const email = "akaboshinit@gmail.com";
  try {
    const { uid } = await auth.createUser({
      email: email,
      emailVerified: true,
    });
    await auth.setCustomUserClaims(uid, {
      operator_role: operator_role,
    });
    //await admin.firestore().collection("operators").doc(uid).set({
    //  email: email,
    //  role: operator_role,
    //});
    console.log("created!!");
  } catch (err) {
    console.error(err);
  }
};

command();

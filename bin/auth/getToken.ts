import {getCredentialAdmin} from "../getCredentialAdmin";

const command = async () => {
    const admin =await getCredentialAdmin();
    const auth = admin.auth();

const email = "akaboshinit@gmail.com";
    try {
      const token = await auth.getUserByEmail(email);
    console.log("token get success");
    console.log(token);
  } catch (err) {
    console.error(err);
  }
};

command();

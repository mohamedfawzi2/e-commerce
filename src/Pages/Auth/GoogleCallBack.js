import axios from "axios";
import  { useEffect } from "react";
import { GOOGLE_CALL_BACK, baseUrl } from "../../Api/Api";
import Cookie from "cookie-universal";

function GoogleCallBack() {
  const cookie = Cookie();
  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(`${baseUrl}/${GOOGLE_CALL_BACK}`);
        const token = res.data.access_token;
        cookie.set("e-commerce", token);
      } catch (error) {
        console.log(error);
      }
    }
    GoogleCall();
  }, []);
  return <div></div>;
}

export default GoogleCallBack;

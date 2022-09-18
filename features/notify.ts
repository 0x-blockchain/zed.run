import axios from "axios";

const token = "5545498409:AAFn7xa3vshZTmc0y6VMTq-Vtoip3mo";
const feedback_accounts = ["5235042590"];

const api_url =
  "https://api.telegram.org/bot[TOKEN]/sendMessage?chat_id=[USER_ID]&parse_mode=markdown&text=";

export const notifyAdmin = (text: string) => {
  let send_url = api_url.replace("[TOKEN]", token);
  feedback_accounts.forEach((account) => {
    axios.get(encodeURI(send_url.replace("[USER_ID]", account) + text));
  });
};

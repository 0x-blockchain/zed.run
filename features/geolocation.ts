import axios from "axios";

export const getData = async (ip: string) => {
  let data;
  try {
  const res = await axios.get("http://api.db-ip.com/v2/free/" + ip, {
    timeout: 2000
});
  data = res.data
  } catch {
    data = {};
  }
  return {"IPv4": data["ipAddress"] ?? "No data", "country_code": data["countryCode"] ?? "No data"};
};

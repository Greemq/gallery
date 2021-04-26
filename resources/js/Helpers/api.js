import {APP_URL} from "../Config/config";

const request =  axios.create({
    baseURL: APP_URL,
});

export default request;
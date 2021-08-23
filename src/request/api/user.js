import axios from "@/request";
import QS from 'qs'


const user = {
    // 密码登录
    login(params) {
        return axios.post('/user/login',QS.stringify(params))
    },
    // 获取验证码
    getAuthCode(params) {
        return axios.post('/user/send-sms',QS.stringify(params))
    },
    // 注册
    register(params) {
        return axios.post('/user/register',QS.stringify(params))
    },
    // 改密码
    changePassword(params) {
        return axios.post('/user/reset',QS.stringify(params))
    },
    // 获取议程
    getAgenda(params) {
        return axios.get('/conference/get-conference', {params: params})
    },
    // 获取会议连接
    getUrl(params) {
        return axios.get('/live/get-liveconfig', {params: params})
    }
}

export default user
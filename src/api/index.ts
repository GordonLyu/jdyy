// 当前文件是对API进行统一管理
import requests from '../utils/requests'

import * as user from './request/user'//用户API
import * as music from './request/music'//音乐API
import * as remark from './request/remark'//评论API

// 登录

export default {
    user,music,remark
}
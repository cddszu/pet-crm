var event = document.createEvent('Event');
event.initEvent('updateAccount', true, true)
const accountInfo = {
    'admin': {
        "name": "管理员",
        "avatar": "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        "userid": "00000001",
        "email": "antdesign@alipay.com",
        "signature": "海纳百川，有容乃大",
        "title": "交互专家",
        "notifyCount": 12,
        "unreadCount": 11,
        "address": "西湖区工专路 77 号",
        "phone": "0752-268888888",
        "desc": '这是医生账号',
        "password": "admin"
      },
    'user': {
        "name": "医生",
        "avatar": "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        "userid": "00000001",
        "email": "antdesign@alipay.com",
        "signature": "海纳百川，有容乃大",
        "title": "交互专家",
        "notifyCount": 12,
        "unreadCount": 11,
        "address": "深圳湾1号",
        "phone": "0752-268888888",
        "desc": '这是医生账号',
        "password": "doctor"
    }
}

export function setAccountInfo(info: 'admin' | 'user' | Object) {
    
    if(info === 'admin' || info === 'user') {
        localStorage.setItem('acountInfo', JSON.stringify(accountInfo[info as ('admin' | 'user')]));
    } else {
        localStorage.setItem('acountInfo', JSON.stringify(info));
    }
    window.dispatchEvent(event)
}

export function getAccountInfo() {
    return JSON.parse(localStorage.getItem('acountInfo') as string)
}
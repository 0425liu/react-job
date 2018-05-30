import axios from 'axios'
import { getRedirecPath } from '../util'
const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOAD_DATA = 'LOAD_DATA';
const CLEAR_MSG = 'CLEAR_MSG';
const LOGINOUT = 'LOGINOUT'
const initState = {
  redirecTo: '',
  isAuth: false,
  msg: '',
  user: '',
  type: ''
}
//reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, redirecTo: getRedirecPath(action.payload), ...action.payload }
    case LOAD_DATA:
      return { ...state, ...action.payload }
    case CLEAR_MSG:
      return { ...state, msg: '' }
    case LOGINOUT:
      return { ...initState, redirecTo: '/login' }
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg }
    default:
      return state;
  }

}
function authSuccess(obj) {
  const { pwd, ...data } = obj;
  return { type: AUTH_SUCCESS, payload: data }
}
function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
}
//ACTION
export function clearMsg() {
  return { type: CLEAR_MSG }

}
export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo }

}
export function logoutSubmit() {
  return { type: LOGINOUT }
}
export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg('请求失败'))
        }
      })
  }
}
export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('用户密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', { user, pwd })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg('请求失败'))
        }
      })
  }
}
export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !type) {
    return errorMsg('用户密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('二次密码不同')
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type })
      .then(res => {
        console.log(res)
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess({ user, pwd, type }))
        } else {
          dispatch(errorMsg('请求失败'))
        }
      })
  }
}
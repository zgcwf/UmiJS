import {getTags} from '@/services/tags'

export default {
  // 调用model的时候, 通过命名空间调用, 不要和其他的model同名
  namespace: 'tags',

  // 状态, 跟react中的state类似, 和redux中保存的state一样
  state: {
    tagsList: []
  },

  // 调用服务端接口,获取数据
  effects: {
    // payload，接收UI组件传递过来的参数，callback回调函数
    // put，将数据传递给reducers，call调用外部的方法
    *fetchTags({payload, callback}, {put, call}) {
      // 获取tags数据
      const response = yield call(getTags)

      // 调用reducers, 并传递数据
      yield put({
        type: 'setTagsList', // 类似于 redux 中 action 的 type
        payload: response
      })
    }
  },

  // 更新 state
  reducers: {
    setTagsList(state, action) {
      return {...state, tagsList: action.payload}
    }
  },
}

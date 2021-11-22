import request from '../utils/request';

// 获取标签数据
export const getTags = () => {
  return request('/api/tags')
}

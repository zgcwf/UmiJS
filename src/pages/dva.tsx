// 1. 创建ui组件
// 2. 创建 model
// 3. 将ui组件和 model 进行连接

import React from 'react';
import {connect} from 'umi';
import {Button} from 'antd';

const Dva = (props) => {
  console.log('props',props);
  
  const {dispatch} = props

  const list = props.tags.tagsList.list || []

  const getData = () => {
    // 使用model, 获取数据
    dispatch({
      type: 'tags/fetchTags', // model的命名空间 / 方法
      payload: null          // 传递给model的参数
    })
  }

  return (
    <div>
      <h3>Dva的使用</h3>
      <Button onClick={getData}>获取列表数据</Button>
      {
        list?.map((item, index) => {
          return <p key={index}>{item.name}</p>
        })
      }
    </div>
  );
};
//在这里并不需要所有的model， 解构，拿到tags的model并作为结果返回出去
export default connect(({tags}) => ({tags}))(Dva);
// connect第一个括号中内置一个回调函数，函数的返回值为一个对象，
// 返回的对象就作为props传给UI组件，我们就可以在UI组件中的props拿到model中的数据
import React from 'react';
import { Button } from 'antd'

const User1 = (props: any) => {

  console.log(props);

  return (
    <div>
      <h3>User Page one</h3>

      <Button onClick={() => {props.history.push('/')}}>点我回首页</Button>
    </div>
  );
};

export default User1;

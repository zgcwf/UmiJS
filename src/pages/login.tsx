import React from 'react';
import { Button } from 'antd'

const Login = (props: any) => {

  console.log(props);

  return (
    <div>
      <h3>Login Page</h3>

      <Button>点我登录</Button>
    </div>
  );
};

export default Login;

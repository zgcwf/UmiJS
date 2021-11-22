import { Redirect } from 'umi'

export default (props: any) => {
  // const isLogin = true
  const { isLogin } = useAuth();
  console.log('isLogin',isLogin);
  
  if (isLogin) {
    return <div>{ props.children }</div>;
  } else {
    return <Redirect to="/" />;
  }
}
function useAuth(): { isLogin: any; } {
  throw new Error('Function not implemented.');
}


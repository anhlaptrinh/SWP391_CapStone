import { Layout } from 'antd';
import { Navigate } from 'react-router-dom';
import { useUserToken } from '@/store/userStore';

import LoginForm from './LoginForm';
import { LoginStateProvider } from './providers/LoginStateProvider';
// import RegisterForm from './RegisterForm';
// import ResetForm from './ResetForm';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

function Login() {
  const token = useUserToken();
  if (token.accessToken) {
    return <Navigate to={HOMEPAGE} replace />;
  }

  return (
    <Layout className="relative flex !min-h-screen !w-full !flex-row">
      <div>
        <LoginStateProvider>
          <LoginForm />
          {/* <RegisterForm /> */}
          {/* <ResetForm /> */}
        </LoginStateProvider>
      </div>
    </Layout>
  );
}
export default Login;

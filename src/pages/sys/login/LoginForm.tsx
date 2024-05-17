import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { SignInReq } from '@/api/services/userService';
import { useSignIn, useSignInGoogle } from "@/store/userStore";

import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider';
import { auth } from '@/firbase';
import { Iconify } from '@/components/icon';

function LoginForm() {
  const [loading, setLoading] = useState(false);

  const { loginState, setLoginState } = useLoginStateContext();
  const signIn = useSignIn();
  const signInGoogle = useSignInGoogle();
  if (loginState !== LoginStateEnum.LOGIN) return null;
  const SignInMail = (): void => {
    const providerGoogle = new GoogleAuthProvider();
    signInWithPopup(auth, providerGoogle)
      .then(function (result: any) {
        signInGoogle(result.user.accessToken);
      })
      .catch(function (error) {
        console.error(error.code, error.message);
      });
  };
  const handleFinish = async ({ username, password }: SignInReq) => {
    setLoading(true);
    try {
      await signIn({ username, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">Sign In</div>
      <Button
        onClick={() => SignInMail()}
        disabled={loading}
      >
        <Iconify icon="logos:google-icon" size={18}/>
        Login Google
      </Button>
      <Form
        name="login"
        size="large"
        initialValues={{
          remember: true,
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input username" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input password" }]}
        >
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default LoginForm;

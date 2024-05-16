import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { useState } from 'react';
import { SignInReq } from '@/api/services/userService';
import { useSignIn } from '@/store/userStore';

import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider';

function LoginForm() {
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loginState, setLoginState } = useLoginStateContext();
  const signIn = useSignIn();

  if (loginState !== LoginStateEnum.LOGIN) return null;

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
      <Form
        name="login"
        size="large"
        initialValues={{
          remember: true,
        }}
        onFinish={handleFinish}
      >
        <Form.Item name="username" rules={[{ required: true, message: 'Please input username' }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input password' }]}>
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default LoginForm;

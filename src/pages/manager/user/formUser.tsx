import { Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";

export type UserCreateFormProps = {
  formData?: any;
  onClose: () => void;
};
export function FormUser({ formData, onClose }: UserCreateFormProps) {
  const [form] = Form.useForm();
  //   const { mutateAsync: createMutate } = useCreateUser(stationId);
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandle = async () => {
    setLoading(true);
    // const values = await form.validateFields();
    try {
      if (formData) {
        // const updateData: UserPayload = {
        //   ...formData,
        //   id: formData.id,
        // };
        // updateData.name = values.name;
        // updateData.phone = values.phone;
        // updateMutate(updateData);
        setLoading(false);
      } else {
        // const createData: UserPayload = { ...values };
        // createMutate(createData);
        setLoading(false);
      }
      onClose();
    } catch (error) {
      message.error(error.message || error);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Modal
      title={formData?.id ? "Edit User" : "Create User"}
      open
      onOk={submitHandle}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={submitHandle}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        initialValues={formData}
        form={form}
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 18 }}
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          required
          rules={[{ required: true, message: "Please input name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          required
          rules={[{ required: true, message: "Please input phone" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

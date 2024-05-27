import { Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";

export type GemCreateFormProps = {
  formData?: any;
  onClose: () => void;
};
export function FormGem({ formData, onClose }: GemCreateFormProps) {
  const [form] = Form.useForm();
  //   const { mutateAsync: createMutate } = useCreateGem(stationId);
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandle = async () => {
    setLoading(true);
    // const values = await form.validateFields();
    try {
      if (formData) {
        // const updateData: GemPayload = {
        //   ...formData,
        //   id: formData.id,
        // };
        // updateData.name = values.name;
        // updateData.phone = values.phone;
        // updateMutate(updateData);
        setLoading(false);
      } else {
        // const createData: GemPayload = { ...values };
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
      title={formData?.id ? "Edit Gem" : "Create Gem"}
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
          label="Cara Weight"
          name="caraWeight"
          required
          rules={[{ required: true, message: "Please input Cara Weight" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Origin"
          name="origin"
          required
          rules={[{ required: true, message: "Please input Origin" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Color"
          name="color"
          required
          rules={[{ required: true, message: "Please input color" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Clarity"
          name="clarity"
          required
          rules={[{ required: true, message: "Please input clarity" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Cut"
          name="cut"
          required
          rules={[{ required: true, message: "Please input cut" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

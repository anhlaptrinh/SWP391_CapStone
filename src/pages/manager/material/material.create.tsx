import { Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";

export type MaterialCreateFormProps = {
  formData?: any;
  onClose: () => void;
};
export function FormMaterial({ formData, onClose }: MaterialCreateFormProps) {
  const [form] = Form.useForm();
  //   const { mutateAsync: createMutate } = useCreateMaterial(stationId);
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandle = async () => {
    setLoading(true);
    // const values = await form.validateFields();
    try {
      if (formData) {
        // const updateData: MaterialPayload = {
        //   ...formData,
        //   id: formData.id,
        // };
        // updateData.name = values.name;
        // updateData.phone = values.phone;
        // updateMutate(updateData);
        setLoading(false);
      } else {
        // const createData: MaterialPayload = { ...values };
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
      title={formData?.id ? "Edit Material" : "Create Material"}
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
          label="Weight"
          name="weight"
          required
          rules={[{ required: true, message: "Please input weight" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Buy Price"
          name="buyPrice"
          required
          rules={[{ required: true, message: "Please input Buy Price" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Sell price"
          name="sellPrice"
          required
          rules={[{ required: true, message: "Please input Sell price" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

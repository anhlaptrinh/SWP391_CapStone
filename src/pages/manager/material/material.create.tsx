import {
  MaterialPayload,
  useCreateMaterial,
  useUpdateMaterial,
} from "@/api/manager/material";
import { Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";

export type MaterialCreateFormProps = {
  formData?: any;
  onClose: () => void;
};
export function FormMaterial({ formData, onClose }: MaterialCreateFormProps) {
  const [form] = Form.useForm();
  const { mutateAsync: createMutate } = useCreateMaterial();
  const { mutateAsync: updateMutate } = useUpdateMaterial();
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandle = async () => {
    setLoading(true);
    const values = await form.validateFields();
    try {
      if (formData) {
        const updateData: MaterialPayload = {
          materialId: formData.materialId,
          materialName: formData.materialName || values.materialName,
          materialPrice: {
            buyPrice: formData.buyPrice || values.buyPrice,
            sellPrice: formData.sellPrice || values.sellPrice,
          },
        };
        await updateMutate(updateData);
        setLoading(false);
      } else {
        const createData: MaterialPayload = {
          ...values,
          materialPrice: {
            buyPrice: values.buyPrice,
            sellPrice: values.sellPrice,
          },
        };
        await createMutate(createData);
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
      title={formData?.materialId ? "Edit Material" : "Create Material"}
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
          label="Material Name"
          name="materialName"
          required
          rules={[{ required: true, message: "Please input materialName" }]}
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

import { GemPayload, useCreateGem, useUpdateGem } from "@/api/manager/gem";
import { Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";

export type GemCreateFormProps = {
  formData?: any;
  onClose: () => void;
};
export function FormGem({ formData, onClose }: GemCreateFormProps) {
  const [form] = Form.useForm();
  const { mutateAsync: createMutate } = useCreateGem();
  const { mutateAsync: updateMutate } = useUpdateGem();
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandle = async () => {
    const values = await form.validateFields();
    try {
      setLoading(true);
      if (formData) {
        const updateData: GemPayload = {
          ...formData,
          id: formData.id,
        };
        await updateMutate(updateData);
        setLoading(false);
      } else {
        const createData: GemPayload = {
          ...values,
          gemPrice: {
            caratWeightPrice: values.caratWeightPrice,
            clarityPrice: values.clarityPrice,
            colourPrice: values.colourPrice,
            cutPrice: values.cutPrice,
            effDate: "2024-06-06T04:33:20.997Z",
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
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Form.Item
            label="Gem Name"
            name="gemName"
            required
            rules={[{ required: true, message: "Please input gemName" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Carat Weight"
            name="caratWeight"
            required
            rules={[{ required: true, message: "Please input Carat Weight" }]}
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
          <Form.Item
            label="Carat Weight Price"
            name="caratWeightPrice"
            required
            rules={[
              { required: true, message: "Please input Carat Weight Price" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Colour Price"
            name="colourPrice"
            required
            rules={[{ required: true, message: "Please input Colour Price" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Clarity Price"
            name="clarityPrice"
            required
            rules={[{ required: true, message: "Please input clarity Price" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cut Price"
            name="cutPrice"
            required
            rules={[{ required: true, message: "Please input cut Price" }]}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

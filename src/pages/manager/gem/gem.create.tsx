import { GemPayload, useCreateGem, useUpdateGem } from "@/api/manager/gem";
import {
  beforeUpload,
  fakeUpload,
  normFile,
  uploadFileToFirebase,
} from "@/utils/file";
import {
  Button,
  Form,
  Input,
  Modal,
  message,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useState, useEffect } from "react";

export type GemCreateFormProps = {
  formData?: any;
  onClose: () => void;
};

export function FormGem({ formData, onClose }: GemCreateFormProps) {
  const [form] = Form.useForm();
  const { mutateAsync: createMutate } = useCreateGem();
  const { mutateAsync: updateMutate } = useUpdateGem();
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (formData?.featuredImage) {
      const initialFileList = [
        {
          uid: "-1",
          name: "featuredImage.jpg",
          status: "done",
          url: formData.featuredImage,
        },
      ];
      setFileList(initialFileList);
    }
  }, [formData]);

  const submitHandle = async () => {
    const values = await form.validateFields();
    try {
      setLoading(true);
      if (formData) {
        const updateData: GemPayload = {
          gemId: formData.gemId,
          gemName: values.gemName || formData.gemName,
          featuredImage: values.featuredImage || formData.featuredImage,
          origin: values.origin || formData.origin,
          caratWeight: values.caratWeight || formData.caratWeight,
          colour: values.colour || formData.colour,
          clarity: values.clarity || formData.clarity,
          cut: values.cut || formData.cut,
          gemPrice: {
            caratWeightPrice:
              values.caratWeightPrice || formData.gemPrice.caratWeightPrice,
            clarityPrice: values.clarityPrice || formData.gemPrice.clarityPrice,
            colourPrice: values.colourPrice || formData.gemPrice.colourPrice,
            cutPrice: values.cutPrice || formData.gemPrice.cutPrice,
            total: 0,
          },
        };
        if (values.featuredImage) {
          const updateImageUrl: string = await uploadFileToFirebase(
            values?.featuredImage[0]
          );
          updateData.featuredImage = updateImageUrl;
        }
        await updateMutate(updateData);
        setLoading(false);
      } else {
        const updateImageUrl: string = await uploadFileToFirebase(
          values?.featuredImage[0]
        );
        const createData: GemPayload = {
          ...values,
          featuredImage: updateImageUrl,
          gemPrice: {
            caratWeightPrice: values.caratWeightPrice,
            clarityPrice: values.clarityPrice,
            colourPrice: values.colourPrice,
            cutPrice: values.cutPrice,
            total: 0,
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

  const onImageChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  return (
    <Modal
      title={formData?.gemId ? "Edit Gem" : "Create Gem"}
      open
      onOk={submitHandle}
      onCancel={onClose}
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
      <Form initialValues={formData} form={form} layout="vertical">
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
            label="colour"
            name="colour"
            required
            rules={[{ required: true, message: "Please input colour" }]}
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
        <Form.Item
          label="Package Images"
          name="featuredImage"
          getValueFromEvent={normFile}
        >
          <Upload
            name="featuredImage"
            maxCount={1}
            className="UploadImage"
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            customRequest={fakeUpload}
            onChange={onImageChange}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

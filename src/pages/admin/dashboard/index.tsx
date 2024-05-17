import { Button, Form, Upload, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import {
  beforeUpload,
  fakeUpload,
  normFile,
  uploadFileToFirebase,
} from "@/utils/file";

export default function MenuLevel() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const submitHandle = async () => {
    setLoading(true);
    const values = await form.validateFields();
    if (values.image.imageUrl) {
      const updateImageUrl: string = await uploadFileToFirebase(
        values?.image?.imageUrl[0]
      );
      console.log(updateImageUrl);
      setLoading(false);
    }
  };
    const onImageChange: UploadProps["onChange"] = ({
      fileList: newFileList,
    }) => {
      setFileList(newFileList);
    };
  return (
    <div className="layout-content">
      <Form form={form} layout="vertical">
        <Form.Item
          label="image"
          name={["image", "imageUrl"]}
          getValueFromEvent={normFile}
        >
          <Upload
            name="image"
            listType="picture-card"
            className="image-uploader"
            fileList={fileList}
            beforeUpload={beforeUpload}
            customRequest={fakeUpload}
            onChange={onImageChange}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={submitHandle}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

import {
  GemPayload,
  useCreateGem,
  useListCarat,
  useListClarity,
  useListColor,
  useListGemPrices,
  useListCut,
  useListOrigin,
  useListShape,
  useUpdateGem,
} from "@/api/manager/gem";
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
  Select,
  message as Message,
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
  const { data: dataShape } = useListShape();
  const { data: dataOrigin } = useListOrigin();
  const { data: dataClarity } = useListClarity();
  const { data: dataCarat } = useListCarat();
  const { data: dataCut } = useListCut();
  const { data: dataColor } = useListColor();
  const { data: dataGemPrices } = useListGemPrices();
  const [loading, setLoading] = useState<boolean>(false);
  const [checkPrice, setCheckPrice] = useState<boolean>(false);
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
  useEffect(() => {
    if (
      formData &&
      dataShape &&
      dataOrigin &&
      dataClarity &&
      dataCarat &&
      dataCut &&
      dataColor
    ) {
      form.setFieldsValue({
        ...formData,
        shapeId: dataShape.find((g) => g.name === formData?.shape).shapeId,
        originId: dataOrigin.find((g) => g.name === formData?.origin).originId,
        clarityId: dataClarity.find((g) => g.level === formData?.clarity)
          .clarityId,
        caratId: dataCarat.find((g) => g.weight === formData?.carat).caratId,
        cutId: dataCut.find((g) => g.level === formData?.cut).cutId,
        colorId: dataColor.find((g) => g.name === formData?.color).colorId,
      });
    }
  }, [form, formData]);
  const submitHandle = async () => {
    const values = await form.validateFields();
    try {
      setLoading(true);
      if (formData) {
        const updateData: any = {
          gemId: formData.gemId,
          gemName: values.gemName || formData.gemName,
          featuredImage: values.featuredImage || formData.featuredImage,
          shapeId: values.shapeId || formData.shapeId,
          originId: values.originId || formData.originId,
          caratId: values.caratId || formData.caratId,
          colorId: values.colorId || formData.colorId,
          clarityId: values.clarityId || formData.clarityId,
          cutId: values.cutId || formData.cutId,
        };
        if (values?.featuredImage[0].uid) {
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
  const prepareSelectOptions = (
    data: any[],
    idField: string,
    nameField: string
  ) => {
    if (!data) return [];
    return data.map((item) => ({
      value: item[idField],
      label: item[nameField],
    }));
  };
  const onChange = (_value: string) => {};
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
        <Form.Item
          className="rounded-sm"
          label="Gem Name"
          name="gemName"
          required
          rules={[{ required: true, message: "Please input gemName" }]}
        >
          <Input placeholder="Gem Name" />
        </Form.Item>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Form.Item
            label="Shape"
            name="shapeId"
            required
            rules={[{ required: true, message: "Please input Shape" }]}
          >
            <Select
              showSearch
              placeholder="Select a Shape"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={prepareSelectOptions(dataShape, "shapeId", "name")}
            />
          </Form.Item>
          <Form.Item
            label="Origin"
            name="originId"
            required
            rules={[{ required: true, message: "Please input origin" }]}
          >
            <Select
              showSearch
              placeholder="Select a origin"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={prepareSelectOptions(dataOrigin, "originId", "name")}
            />
          </Form.Item>
          <Form.Item
            label="Clarity"
            name="clarityId"
            required
            rules={[{ required: true, message: "Please input clarity" }]}
          >
            <Select
              showSearch
              placeholder="Select a clarity"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={prepareSelectOptions(dataClarity, "clarityId", "level")}
            />
          </Form.Item>
          <Form.Item
            label="Carat"
            name="caratId"
            required
            rules={[{ required: true, message: "Please input carat" }]}
          >
            <Select
              showSearch
              placeholder="Select a Shape"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={prepareSelectOptions(dataCarat, "caratId", "weight")}
            />
          </Form.Item>
          <Form.Item
            label="Cut"
            name="cutId"
            required
            rules={[{ required: true, message: "Please input cut" }]}
          >
            <Select
              showSearch
              placeholder="Select a cut"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={prepareSelectOptions(dataCut, "cutId", "level")}
            />
          </Form.Item>
          <Form.Item
            label="Color"
            name="colorId"
            required
            rules={[{ required: true, message: "Please input color" }]}
          >
            <Select
              showSearch
              placeholder="Select a color"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={prepareSelectOptions(dataColor, "colorId", "name")}
            />
          </Form.Item>
        </div>
        {!formData?.gemId && (
          <>
            <div className="flex items-center">
              <Form.Item
                className="rounded-sm"
                label="Gem price"
                name="price"
                required
                // rules={[{ required: true, message: "Please input price" }]}
              >
                <Input placeholder="Gem price" />
              </Form.Item>
              <Button
                type="primary"
                ghost
                className="ml-4"
                style={{ marginTop: "5px" }}
                onClick={async () => {
                  const values = await form.validateFields();
                  const result = dataGemPrices.find(
                    (item) =>
                      item.caratId === values.caratId &&
                      item.clarityId === values.clarityId &&
                      item.colorId === values.colorId &&
                      item.cutId === values.cutId &&
                      item.originId === values.originId
                  );
                  form.setFieldValue("price", result?.price || 0);
                  // setCheckPrice(result?.price || false);
                }}
              >
                check Price
              </Button>
            </div>
          </>
        )}
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

/* eslint-disable no-prototype-builtins */
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputRef,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Popover,
  Row,
  Space,
  TableColumnType,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useRef, useState } from "react";

import { InputType } from "#/api";
import { useCreateDiscount, useDiscount, useUpdateDiscount } from "@/api/staff/discount";
import { useCustomerStore } from "@/store/discount";
import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

export default function DiscountPoint() {
  const { Title, Text } = Typography;
  const [form] = Form.useForm();

  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [createPoint, setPoint] = useState(false);
  const [updatePoint, setUpdatePoint] = useState(false); // Trạng thái cập nhật
  const [currentRecord, setCurrentRecord] = useState<any>(null); // Lưu thông tin bản ghi hiện tại
  const { mutateAsync: createDiscount } = useCreateDiscount();
  const setSelectedCustomer = useCustomerStore((state) => state.setSelectedCustomer);

  // Thêm dữ liệu cứng cho bảng
  const { data, isLoading } = useDiscount();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const {mutateAsync:updateDiscount}=useUpdateDiscount();
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: any
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: any): TableColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, borderRadius: 5 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90, borderRadius: 5 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            style={{ color: "red" }}
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{
          fontSize: '17px',
          alignContent: 'center',
          width: '17px',
          color: filtered ? "#1677ff" : undefined
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<any> = [
    {
      title: "No",
      dataIndex: "customerId",
      ...getColumnSearchProps("customerId"),
      width: "5%",
    },
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      ...getColumnSearchProps("phoneNumber"),
    },
    {
      title: "Point",
      dataIndex: "point",
      sorter: (a, b) => b.point - a.point,
    },
    {
      title: "Promotion",
      dataIndex: "discount",
      align: 'center',
      render: (text) => <Text strong style={{ color: 'red' }}>{text}%</Text>
    },
    {
      title: "Action",
      align: 'center',
      dataIndex: "action",
      render: (_, record) => (
        <div className="text-gray flex w-full items-center justify-center">
          <Popconfirm
            title="Are you sure you want to Apply Discount?"
            onConfirm={() => handleApply(record)}
            onCancel={() => handleNoApply(record)}
            okText="Yes"
            cancelText="No"
          >
            <Popover content="Apply Discount">
              <Button
                type="primary"
                className="mr-4"
              >Apply</Button>
            </Popover>
          </Popconfirm>
          <Button
                onClick={() => {
                  setUpdatePoint(true);
                  setCurrentRecord(record); // Lưu bản ghi hiện tại để cập nhật
                  form.setFieldsValue({
                    phoneNumber: record.phoneNumber,
                    customerName: record.fullName,
                    point: record.point,
                  });
                  setPoint(true);
                }}
                type="primary"
                style={{ backgroundColor: "green" }}
              >Edit</Button>
        </div>
      )
    },
  ];

  const handleApply = (record: any) => {
    setSelectedCustomer({
      name: record.fullName,
      phone: record.phoneNumber,
      discount: record.discount
    });
    message.success('Get Info with discount');
  };

  const handleNoApply = (record: any) => {
    setSelectedCustomer({
      name: record.fullName,
      phone: record.phoneNumber,
      discount: 0,
    });
    message.success('Get Info without discount!');
  };

  const resetHandler = () => {
    form.resetFields();
  };

  const onPageChange = (page: number, pageSize: number) => {
    const values: InputType = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  };

  const onFinishHandler = (values: InputType) => {
    setListRelateParams(values);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (!values.hasOwnProperty("point")) {
          values.point = 0; // Thiết lập giá trị mặc định cho point nếu không tồn tại
        }

        // Gọi API để tạo hoặc cập nhật dữ liệu
        if (updatePoint) {
          
          updateDiscount(values)
          
         
        } else {
          // Nếu không phải chế độ cập nhật, gọi API tạo mới
          createDiscount(values);
          message.success('Creation successful');
        }

        setPoint(false);
        setUpdatePoint(false); // Đặt lại trạng thái sau khi hoàn thành
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setPoint(false);
    setUpdatePoint(false); // Đặt lại trạng thái khi đóng modal
    form.resetFields();
  };

  return (
    <Card>
      <Form form={form} onFinish={onFinishHandler}>
        <Row gutter={24} justify="space-between">
          <Col span={20}>
            <Row gutter={24}>
              <Col span={8}>
                <Row>
                  
                  <Col span={24}>
                    <Row>
                      <Col span={12}>
                        <Button danger type="primary" onClick={() => setPoint(true)}>
                          New
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <Table
        rowKey="id"
        size="small"
        className="mt-3"
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={data?.items} // Sử dụng dữ liệu cứng đã tạo
        loading={isLoading}
      />
      <Modal
        title={updatePoint ? "Cập nhật thông tin ưu đãi" : "Nhập thông tin ưu đãi"}
        open={createPoint}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={updatePoint ? "Update" : "Ok"}
      >
        <Form form={form} layout="vertical" name="userForm">
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please Enter Phone Number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="customerName"
            label="Customer Name"
            rules={[{ required: true, message: "Please Enter Customer Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="point" label="Promotion point">
            <Input disabled={!updatePoint} defaultValue={0} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

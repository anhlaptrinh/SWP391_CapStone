import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";

import { InputType } from "#/api";

export default function ModalGem() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const data = [
    {
      id: 1,
      no: 1,
      name: "Gemstone 1",
      origin: "Country A",
      caraWeight: "1.5",
      color: "Red",
      clarity: "VS1",
      cut: "Round",
      price: "$500",
    },
    {
      id: 2,
      no: 2,
      name: "Gemstone 2",
      origin: "Country B",
      caraWeight: "2.0",
      color: "Blue",
      clarity: "VVS2",
      cut: "Princess",
      price: "$700",
    },
    {
      id: 3,
      no: 3,
      name: "Gemstone 3",
      origin: "Country C",
      caraWeight: "1.8",
      color: "Green",
      clarity: "SI1",
      cut: "Oval",
      price: "$600",
    },
    {
      id: 4,
      no: 4,
      name: "Gemstone 4",
      origin: "Country D",
      caraWeight: "2.2",
      color: "Yellow",
      clarity: "VS2",
      cut: "Pear",
      price: "$800",
    },
    {
      id: 5,
      no: 5,
      name: "Gemstone 5",
      origin: "Country E",
      caraWeight: "1.6",
      color: "Purple",
      clarity: "IF",
      cut: "Marquise",
      price: "$650",
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: "",
      dataIndex: "id",
      render: (_text, record) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(record.id)}
          onChange={(e) => handleCheckboxChange(e, record.id)}
        />
      ),
    },
    {
      title: "No",
      dataIndex: "no",
      render: (_text, _data, index) => <Title level={5}>{++index}</Title>,
      width: "5%",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Origin",
      dataIndex: "origin",
    },
    { title: "Cara weight", dataIndex: "caraWeight" },
    { title: "Color", dataIndex: "color" },
    { title: "Clarity", dataIndex: "clarity" },
    { title: "Cut", dataIndex: "cut" },
    { title: "Price", dataIndex: "price" },
  ];

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const handleRowClick = (record: any) => {
    if (selectedRows.includes(record.id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== record.id));
    } else {
      setSelectedRows([...selectedRows, record.id]);
    }
  };

  return (
    <Card>
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: "max-content" }}
        pagination={false}
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      <Pagination
        showSizeChanger
        onChange={onPageChange}
        style={{ marginTop: "1rem" }}
      />
    </Card>
  );
}

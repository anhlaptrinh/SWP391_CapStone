import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { InputType } from "#/api";
import { FormUser } from "./formUser";
import { useEmployeeRevenue, useListCounters, useListUser } from "@/api/manager/user";
import { CircleLoading } from "@/components/loading";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { Counters } from "./counters";
import { useListRole, useUpdateStatus } from "@/api/manager/products";
import axios from "axios";
export default function ManagerUserList() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
   const { data: dataRole } = useListRole();
     const { data: dataCounters } = useListCounters();
  const [formUser, setFormUser] = useState<any>(false);
  const [formCounter, setFormCounter] = useState<any>(false);
  const { data, isLoading } = useListUser();
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);
       const [loading, setLoading] = useState<boolean>(false);
       const [error, setError] = useState<string | null>(null);
      const { mutateAsync: updateStatusMutate } = useUpdateStatus("listUser");
  if (isLoading) return <CircleLoading />;
  const onOpenFormHandler = (record?: any) => {
    if (record) {
      setFormUser(record);
    } else {
      setFormUser(undefined);
    }
  };
    const onOpenFormCounter = (record?: any) => {
      if (record) {
        setFormCounter(record);
      } else {
        setFormCounter(undefined);
      }
    };
  const closeFormUser = async () => {
    setFormUser(false);
    setFormCounter(false);
  };
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

    const fetchEmployeeRevenue = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://jewelrysalessystem.azurewebsites.net/api/users/employee-revenue",
          {
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "EmployeeRevenue.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      } catch (error) {
        setError("Failed to fetch employee revenue");
      } finally {
        setLoading(false);
      }
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
          <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
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
      dataIndex: "no",
      render: (_text, _data, index) => <Title level={5}>{++index}</Title>,
      width: "5%",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role" },
    { title: "Counter", dataIndex: "counter" },
    {
      title: "Address",
      dataIndex: "address",
      render: (text) => (
        <div
          style={{
            maxWidth: 150,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text) => (
        <div
          style={{
            maxWidth: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: text ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {text ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <div className="text-gray flex w-full items-center justify-center">
          {/* <IconButton onClick={() => onOpenFormHandler(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton> */}
          <Button
            type="primary"
            ghost
            className="mr-2"
            onClick={() => onOpenFormCounter(record)}
          >
            Assign counter
          </Button>
          <Popconfirm
            title="Are you sure update status?"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={(e: any) => {
              e.stopPropagation();
              updateStatusMutate({
                id: record.userId,
                name: "users",
              });
            }}
          >
            <Button
              type="primary"
              ghost
              danger
              className="mr-2"
            >
              Change status
            </Button>
          </Popconfirm>
        </div>
      ),
    },
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

  return (
    <Card>
      <div className="text-right">
        <Button
          type="primary"
          onClick={() => onOpenFormHandler()}
          className="mb-2 mr-2"
        >
          Create User
        </Button>
        <Button
          type="primary"
          onClick={fetchEmployeeRevenue}
          disabled={loading}
          className="mb-2"
        >
          Employee revenue
        </Button>
      </div>
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: "max-content" }}
        // pagination={false}
        columns={columns}
        dataSource={data?.items}
        // loading={isLoading}
      />
      {/* <Pagination
        showSizeChanger
        onChange={onPageChange}
        // total={data?.totalPages}
        // showTotal={(total) => ` ${total} `}
        // current={data?.page}
        style={{ marginTop: "1rem" }}
      /> */}
      {formUser !== false && (
        <FormUser formData={formUser} onClose={closeFormUser} />
      )}
      {formCounter !== false && (
        <Counters formData={formCounter} onClose={closeFormUser} />
      )}
    </Card>
  );
}

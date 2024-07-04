import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
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
import { useListUser } from "@/api/manager/user";
import { CircleLoading } from "@/components/loading";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
export default function ManagerUserList() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [formUser, setFormUser] = useState<any>(false);
  const { data, isLoading } = useListUser();
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);
  if (isLoading) return <CircleLoading />;
  const onOpenFormHandler = (record?: any) => {
    if (record) {
      setFormUser(record);
    } else {
      setFormUser(undefined);
    }
  };
  const closeFormUser = async () => {
    setFormUser(false);
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
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
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
                onClick={() => {
                  close();
                }}
              >
                close
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
    {
      title: "Address",
      dataIndex: "address",
      render: (text) => (
        <div
          style={{
            maxWidth: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {text}
        </div>
      ),
    },
    // { title: "Status", dataIndex: "status" },
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
      <Button
        type="primary"
        onClick={() => onOpenFormHandler()}
        className="mb-2"
      >
        New
      </Button>
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
    </Card>
  );
}

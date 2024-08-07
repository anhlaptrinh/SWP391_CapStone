import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { InputType } from "#/api";
import { FormGem } from "./gem.create";
import {
  useListGem,
  useDeleteGem,
  useListShape,
  useListOrigin,
  useListClarity,
  useListCarat,
  useListCut,
  useListColor,
} from "@/api/manager/gem";
import { CircleLoading } from "@/components/loading";
import { IconButton, Iconify } from "@/components/icon";
import { numberWithCommas, transformObject } from "@/utils/string";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { useUpdateStatus } from "@/api/manager/products";
export default function GemList() {
  const { Title } = Typography;
  const [form] = Form.useForm();
    const { data: dataShape } = useListShape();
    const { data: dataOrigin } = useListOrigin();
    const { data: dataClarity } = useListClarity();
    const { data: dataCarat } = useListCarat();
    const { data: dataCut } = useListCut();
    const { data: dataColor } = useListColor();
     const { mutateAsync: updateStatusMutate } = useUpdateStatus("listGems");
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const { data, isLoading } = useListGem();
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);
  const { mutateAsync: deleteMutate } = useDeleteGem();
  const [formGem, setFormGem] = useState<any>(false);
  if (isLoading) return <CircleLoading />;
  const onOpenFormHandler = (record?: any) => {
    if (record) {
      setFormGem(record);
    } else {
      setFormGem(undefined);
    }
  };
  const closeFormGem = async () => {
    setFormGem(false);
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
          .includes((value as string).trim().toLowerCase()),
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
      title: "Featured Image",
      dataIndex: "featuredImage",
      render: (text) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Image
            style={{ width: 100, height: 100, objectFit: "cover" }}
            src={text}
          />
        </div>
      ),
    },
    {
      title: "Gem Name",
      dataIndex: "gemName",
      key: "gemName",
      ...getColumnSearchProps("gemName"),
    },
    {
      title: "Origin",
      dataIndex: "origin",
    },
    { title: "Carat", dataIndex: "carat" },
    { title: "Shape", dataIndex: "shape" },
    { title: "Color", dataIndex: "color" },
    { title: "Clarity", dataIndex: "clarity" },
    { title: "Cut", dataIndex: "cut" },
    // { title: "Price", dataIndex: "price", sorter: (a, b) => a.price - b.price },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => <div>{numberWithCommas(text || 0)} VND</div>,
      sorter: (a, b) => a.price - b.price,
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
          <IconButton onClick={() => onOpenFormHandler(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm
            title="Are you sure update status?"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={(e: any) => {
              e.stopPropagation();
              updateStatusMutate({
                id: record.gemId,
                name: "gems",
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
  const submitHandleDelete = (record?: any) => {
    if (record) {
      deleteMutate(record);
    }
  };
  return (
    <Card>
      <div className="text-right">
        <Button
          type="primary"
          onClick={() => onOpenFormHandler()}
          className="mb-2"
        >
          Create Gem
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
      {formGem !== false && (
        <FormGem formData={formGem} onClose={closeFormGem} />
      )}
    </Card>
  );
}

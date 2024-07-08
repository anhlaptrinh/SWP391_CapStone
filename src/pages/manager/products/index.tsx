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
  Typography,
  Space,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Table, { ColumnsType } from "antd/es/table";
import { useRef, useState } from "react";
import { InputType } from "#/api";
import { FormProduct } from "./product.create";
import { useDeleteProduct, useListProduct } from "@/api/manager/products";
import { CircleLoading } from "@/components/loading";
import { numberWithCommas } from "@/utils/string";
import { ProductDetail } from "./product.detail";
import { IconButton, Iconify } from "@/components/icon";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
export default function ProductsList() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
      const [searchText, setSearchText] = useState("");
      const [searchedColumn, setSearchedColumn] = useState("");
      const searchInput = useRef<InputRef>(null);
  const { data, isLoading } = useListProduct();
  const { mutateAsync: deleteMutate } = useDeleteProduct();
  const [formProduct, setFormProduct] = useState<any>(false);
  const [showDetail, setShowDetail] = useState<any>(false);
  if (isLoading) return <CircleLoading />;
  const onOpenFormHandler = (record?: any) => {
    if (record) {
      setFormProduct(record);
    } else {
      setFormProduct(undefined);
    }
  };
    const closeFormProduct = async () => {
      setFormProduct(false);
    };
    const closeDetail = async () => {
      setShowDetail(false);
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

        const getColumnSearchProps = (
          dataIndex: any
        ): TableColumnType<any> => ({
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
              style={{ color: filtered ? "#1677ff" : undefined }}
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
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      ...getColumnSearchProps("productName"),
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    { title: "Gender", dataIndex: "gender" },
    // { title: "Colour", dataIndex: "colour" },
    {
      title: " Product Price",
      dataIndex: "productPrice",
      render: (text) => <div>{numberWithCommas(text || 0)} VND</div>,
      sorter: (a, b) => a.productPrice - b.productPrice,
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
          {text ? "True" : "False"}
        </div>
      ),
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <div className="text-gray flex w-full items-center justify-center">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onOpenFormHandler(record);
            }}
          >
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          {/* <Popconfirm
            title="Delete the Product?"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={(e : any) => { e.stopPropagation();
            deleteMutate(record.productId)}}
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Iconify
                icon="mingcute:delete-2-fill"
                size={18}
                className="text-error"
              />
            </IconButton>
          </Popconfirm> */}
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

  // const onOpenDetail = (record?: any) => {
  //   if (record) {
  //     setClickOne(record);
  //   } else {
  //     setClickOne(undefined);
  //   }
  //   setShowInfo(true);
  // };
  return (
    <Card>
      <div className="text-right">
        <Button
          type="primary"
          onClick={() => onOpenFormHandler()}
          className="mb-2"
        >
          Create Jwelery
        </Button>
      </div>
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: "max-content" }}
        // pagination={false}
        columns={columns}
        dataSource={data?.items}
        loading={isLoading}
        onRow={(record) => {
          return {
            onClick: (event) => setShowDetail(record),
          };
        }}
      />
      {/* <Pagination
        showSizeChanger
        onChange={onPageChange}
        // total={data?.totalPages}
        // showTotal={(total) => ` ${total} `}
        // current={data?.page}
        style={{ marginTop: "1rem" }}
      /> */}
      {formProduct !== false && (
        <FormProduct formData={formProduct} onClose={closeFormProduct} />
      )}
      {showDetail !== false && (
        <ProductDetail data={showDetail} onClose={closeDetail} />
      )}
    </Card>
  );
}

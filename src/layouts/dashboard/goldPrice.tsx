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
import { Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Table, { ColumnsType } from "antd/es/table";
import { numberWithCommas } from "@/utils/string";
import { useListMaterial } from "@/api/manager/material";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { useRef, useState } from "react";
export type GoldPriceProps = {
  onClose: () => void;
};
export function GoldPriceTable({ onClose }: GoldPriceProps) {
    const { Title } = Typography;
  const { data, isLoading } = useListMaterial();  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
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
            title: "Material Name",
            dataIndex: "materialName",
            key: "materialName",
            ...getColumnSearchProps("materialName"),
          },
          {
            title: "Buy Price",
            dataIndex: "materialPrice",
            render: (_, record) => (
              <div>
                {numberWithCommas(record.materialPrice?.buyPrice || 0)} VND
              </div>
            ),
          },
          {
            title: "Sell Price",
            dataIndex: "materialPrice",
            render: (_, record) => (
              <div>
                {numberWithCommas(record.materialPrice?.sellPrice || 0)} VND
              </div>
            ),
          },
          {
            title: "Effective Date",
            dataIndex: "materialPrice",
            render: (_, record) => (
              <div>
                {new Date(record.materialPrice?.effDate).toLocaleString()}
              </div>
            ),
          },
          // {
          //   title: "Status",
          //   dataIndex: "isActive",
          //   render: (text) => (
          //     <div
          //       style={{
          //         maxWidth: 200,
          //         whiteSpace: "nowrap",
          //         overflow: "hidden",
          //         textOverflow: "ellipsis",
          //         color: text ? "green" : "red",
          //         fontWeight: "bold",
          //       }}
          //     >
          //       {text ? "Active" : "Inactive"}
          //     </div>
          //   ),
          // },
        ];

  return (
    <Modal
      title={`Gold price`}
      open
      onCancel={() => onClose()}
      width={1300}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
      ]}
    >
      {/* <Table
        dataSource={data?.DataList?.Data}
        columns={columns}
        loading={isLoading}
        scroll={{ x: 700 }}
      /> */}
      <Table
        // pagination={false}
        columns={columns}
        dataSource={data?.items}
        loading={isLoading}
        scroll={{ x: 700 }}
      />
    </Modal>
  );
}

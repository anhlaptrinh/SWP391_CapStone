import { Permission } from '#/entity';
import { PermissionType } from '#/enum';

const ADMIN_DASHBOARD_PERMISSION: Permission = {
    id: '9100714781927703',
    parentId: '',
    label: 'Dashboard',
    name: 'Dashboard',
    icon: 'ri:dashboard-fill',
    type: PermissionType.MENU,
    route: 'dashboard',
    order: 1,
    component: '/admin/dashboard/index.tsx',
};
const STAFF_PRODUCT_PERMISSION : Permission={
    id: '9100714781927704',
    parentId: '',
    label: 'Staff',
    name: 'Staff',
    icon: 'ri-id-card-fill',
    type: PermissionType.CATALOGUE,
    route: 'staff',
    order: 1,
    children:[ 
        {
        id: '8426999229400870',
        parentId: '9100714781927704',
        label: 'Products',
        name: 'Products',
        type: PermissionType.MENU,
        route: 'Products',
        component: '/staff/Products/index.tsx',
        icon: 'ri:product-hunt-fill',
    },
        {
        id: '8426999229400871',
        parentId: '9100714781927704',
        label: 'Invoices',
        name: 'Invoices',
        icon: 'teenyicons:invoice-solid',
        type: PermissionType.MENU,
        route: 'invoices',
        component: '/staff/invoice/index.tsx'},
    {
        id: '8426999229400872',
        parentId: '9100714781927704',
        label: 'Point',
        name: 'Point',
        icon: 'ri-discount-percent-fill',
        type: PermissionType.MENU,
        route: 'point',
        component: '/staff/Point/index.tsx'
    },
    {
        id: '8426999229400873',
        parentId: '9100714781927704',
        label: 'Order',
        name: 'order',
        icon: 'ri-list-ordered',
        type: PermissionType.MENU,
        route: 'order',
        order: 4,
        component: '/staff/order/index.tsx'
    }
]
}

const MANAGER_PERMISSION: Permission = {
    id: '9100714781927705',
    parentId: '',
    label: 'Manager',
    name: 'manager',
    icon: 'material-symbols:bookmark-manager-rounded',
    type: PermissionType.CATALOGUE,
    route: 'manager',
    order: 2,
    children: [
        {
            id: '8426999229400971',
            parentId: '9100714781927705',
            label: 'User',
            name: 'user',
            type: PermissionType.MENU,
            route: 'user',
            component: '/manager/user/index.tsx',
            icon: 'mdi:user',
        },
        {
            id: '8426999229400972',
            parentId: '9100714781927705',
            label: 'Voucher',
            name: 'voucher',
            type: PermissionType.MENU,
            route: 'voucher',
            component: '/manager/voucher/index.tsx',
            icon: 'mdi:voucher',
        },
        
    ],
};



export const ADMIN_PERMISSION = [
    ADMIN_DASHBOARD_PERMISSION,
    STAFF_PRODUCT_PERMISSION,
    MANAGER_PERMISSION,
];

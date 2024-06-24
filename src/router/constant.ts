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
        type: PermissionType.CATALOGUE,
        route: 'Products',
        icon: 'ri:product-hunt-fill',
        children:[{
            id: '6426999229400870',
            parentId: '8426999229400870',
            label: 'Gems',
            name: 'Gems',
            type: PermissionType.MENU,
            route: 'Gems',
            icon: 'fa6-solid:gem',
            component: '/staff/Products/Gems/index.tsx'
        },
        {
            id: '6426999229400871',
            parentId: '8426999229400870',
            label: 'Gold',
            name: 'Gold',
            type: PermissionType.MENU,
            route: 'Gold',
            icon: 'ri-vip-crown-fill',
             component: '/staff/Products/Gold/index.tsx'
        },
        {
            id: '6426999229400872',
            parentId: '8426999229400870',
            label: 'Jwerlery',
            name: 'Jwerlery',
            type: PermissionType.MENU,
            route: 'Jwerlery',
            icon: 'ri-bard-fill',
             component: '/staff/Products/Jwelery/index.tsx'
        }
    ]
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
        type: PermissionType.CATALOGUE,
        route: 'order',
        order: 2,
        children:[
            {
                id: '7426999229400873',
                parentId: '8426999229400873',
                label: 'Internal',
                name: 'internal',
                icon: 'ri-archive-fill',
                type: PermissionType.MENU,
                route: 'internal',
                component: '/staff/order/internal/index.tsx'
            },
            {
                id: '7426999229400874',
                parentId: '8426999229400873',
                label: 'External',
                name: 'external',
                icon: 'ri-archive-2-fill',
                type: PermissionType.MENU,
                route: 'external',
                component: '/staff/order/external/index.tsx'
            }
        ],
    }, {
        id: '8426999229400874',
        parentId: '9100714781927704',
        label: 'Checking',
        name: 'Checking',
        icon: 'ri-survey-fill',
        type: PermissionType.MENU,
        route: 'check',
        order: 4,
        component: '/staff/invoiceChecked/index.tsx'
    }
]
}

const MANAGER_USER_PERMISSION: Permission = {
    id: '9100714781927704',
    parentId: '',
    label: 'User',
    name: 'user',
    type: PermissionType.MENU,
    route: 'user',
    order: 2,
    component: '/manager/user/index.tsx',
    icon: 'mdi:user',
};
const MANAGER_PRODUCT_PERMISSION: Permission = {
    id: '9100714781927705',
    parentId: '',
    label: 'Products',
    name: 'products',
    type: PermissionType.MENU,
    route: 'products',
    order: 3,
    component: '/manager/products/index.tsx',
    icon: 'ri:product-hunt-fill',
};
const MANAGER_VOUCHER_PERMISSION: Permission = {
    id: '9100714781927706',
    parentId: '',
    label: 'Voucher',
    name: 'voucher',
    type: PermissionType.MENU,
    route: 'voucher',
    order: 4,
    component: '/manager/voucher/index.tsx',
    icon: 'mdi:voucher',
};
const MANAGER_GEM_PERMISSION: Permission = {
    id: '9100714781927707',
    parentId: '',
    label: 'Gems',
    name: 'Gems',
    icon: 'fa6-solid:gem',
    type: PermissionType.MENU,
    route: 'gems',
    order: 5,
    component: '/manager/gem/index.tsx'
};
const MANAGER_MATERIAL_PERMISSION: Permission = {
    id: '9100714781927708',
    parentId: '',
    label: 'Materials',
    name: 'Materials',
    icon: 'academicons:open-materials',
    type: PermissionType.MENU,
    route: 'materials',
    order: 6,
    component: '/manager/material/index.tsx'
};
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
            id: '8426999229400975',
            parentId: '9100714781927705',
            label: 'Products',
            name: 'products',
            type: PermissionType.MENU,
            route: 'products',
            component: '/manager/products/index.tsx',
            icon: 'ri:product-hunt-fill',
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
        {
            id: '8426999229400973',
            parentId: '9100714781927705',
            label: 'Gems',
            name: 'Gems',
            icon: 'fa6-solid:gem',
            type: PermissionType.MENU,
            route: 'gems',
            component: '/manager/gem/index.tsx'
        },
        {
            id: '8426999229400974',
            parentId: '9100714781927705',
            label: 'Materials',
            name: 'Materials',
            icon: 'academicons:open-materials',
            type: PermissionType.MENU,
            route: 'materials',
            component: '/manager/material/index.tsx'
        },
        
    ],
};


export const ADMIN_PERMISSION = [
    ADMIN_DASHBOARD_PERMISSION,
    STAFF_PRODUCT_PERMISSION,
    MANAGER_PERMISSION,
];
export const MANAGERS_PERMISSION = [
    ADMIN_DASHBOARD_PERMISSION,
    // MANAGER_PERMISSION,
    MANAGER_USER_PERMISSION,
    MANAGER_PRODUCT_PERMISSION,
    MANAGER_VOUCHER_PERMISSION,
    MANAGER_GEM_PERMISSION,
    MANAGER_MATERIAL_PERMISSION,
];
export const STAFF_PERMISSION = [
    ADMIN_DASHBOARD_PERMISSION,
    STAFF_PRODUCT_PERMISSION,
];

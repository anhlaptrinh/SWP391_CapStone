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
    label: 'Products',
    name: 'Products',
    icon: 'ri:product-hunt-fill',
    type: PermissionType.MENU,
    route: 'product',
    order: 1,
    component: '/admin/Products/index.tsx'
}

const MANAGER_PERMISSION: Permission = {
    id: '9100714781927705',
    parentId: '',
    label: 'manager',
    name: 'Manager',
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
            label: 'voucher',
            name: 'Voucher',
            type: PermissionType.MENU,
            route: 'voucher',
            component: '/manager/voucher/index.tsx',
            icon: 'mdi:voucher',
        },
    ],
};

const INVOICE_PERMISSION: Permission = {
    id: '9100714781927704',
    parentId: '',
    label: 'Invoices',
    name: 'Invoices',
    icon: 'teenyicons:invoice-solid',
    type: PermissionType.MENU,
    route: 'invoices',
    order: 2,
    component: '/sys/invoice/index.tsx'
}

const GEM_PERMISSION: Permission = {
    id: '9100714781927704',
    parentId: '',
    label: 'Gems',
    name: 'Gems',
    icon: 'fa6-solid:gem',
    type: PermissionType.MENU,
    route: 'gems',
    order: 3,
    component: '/sys/gem/index.tsx'
}

const MATERIAL_PERMISSION: Permission = {
    id: '9100714781927704',
    parentId: '',
    label: 'Materials',
    name: 'Materials',
    icon: 'academicons:open-materials',
    type: PermissionType.MENU,
    route: 'materials',
    order: 4,
    component: '/sys/material/index.tsx'
}
export const ADMIN_PERMISSION = [
    ADMIN_DASHBOARD_PERMISSION,
    STAFF_PRODUCT_PERMISSION,
    MANAGER_PERMISSION,
    INVOICE_PERMISSION,
    GEM_PERMISSION,
    MATERIAL_PERMISSION
];

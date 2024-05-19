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

export const ADMIN_PERMISSION = [
   ADMIN_DASHBOARD_PERMISSION,
    STAFF_PRODUCT_PERMISSION
];

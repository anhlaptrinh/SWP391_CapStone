import { Permission } from '#/entity';
import { PermissionType } from '#/enum';

const ADMIN_DASHBOARD_PERMISSION: Permission = {
    id: '9100714781927703',
    parentId: '',
    label: 'Dashboard',
    name: 'Dashboard',
    icon: 'ic-analysis',
    type: PermissionType.MENU,
    route: 'dashboard',
    order: 1,
    component: '/admin/dashboard/index.tsx',
};

export const ADMIN_PERMISSION = [
    ADMIN_DASHBOARD_PERMISSION,
];

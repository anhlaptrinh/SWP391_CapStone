import { BasicStatus, PermissionType } from './enum';

export interface UserToken {
    accessToken?: string;
    refreshToken?: string;
}

export interface UserInfo {
    id?: string;
    email?: string;
    username?: string;
    password?: string;
    avatar?: string;
    role?: string;
    permissions?: Permission[];
}

export interface Organization {
    id: string;
    name: string;
    status: 'enable' | 'disable';
    desc?: string;
    order?: number;
    children?: Organization[];
}

export interface Permission {
    id: string;
    parentId: string;
    name: string;
    label: string;
    type: PermissionType;
    route: string;
    status?: BasicStatus;
    order?: number;
    icon?: string;
    component?: string;
    hide?: boolean;
    frameSrc?: string;
    newFeature?: boolean;
    children?: Permission[];
}

export interface Role {
    id: string;
    name: string;
    label: string;
    status: BasicStatus;
    order?: number;
    desc?: string;
    permission?: Permission[];
}

export interface JwtDecode {
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
    id: string;
    user_name: string;
    name: string;
    avartar_url: string;
    picture: string;
    email: string;
}

export interface ImageUrl {
    imageUrl: string;
}

export interface User {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    avatarUrl: string;
    password: string;
    isActive: boolean;
    isDeleted: boolean;
    role: any;
}

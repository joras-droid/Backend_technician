export declare const UserRole: {
    readonly ADMIN: "ADMIN";
    readonly MANAGER: "MANAGER";
    readonly TECHNICIAN: "TECHNICIAN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const WorkOrderStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly COMPLETED: "COMPLETED";
    readonly PAID: "PAID";
};
export type WorkOrderStatus = (typeof WorkOrderStatus)[keyof typeof WorkOrderStatus];
export declare const NotificationType: {
    readonly WORK_ORDER_ASSIGNED: "WORK_ORDER_ASSIGNED";
    readonly WORK_ORDER_UPDATED: "WORK_ORDER_UPDATED";
    readonly WORK_ORDER_REMINDER: "WORK_ORDER_REMINDER";
    readonly TIME_ENTRY_EDITED: "TIME_ENTRY_EDITED";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const NotificationChannel: {
    readonly EMAIL: "EMAIL";
    readonly PUSH: "PUSH";
};
export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];

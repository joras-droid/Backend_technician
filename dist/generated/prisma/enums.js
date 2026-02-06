"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationChannel = exports.NotificationType = exports.WorkOrderStatus = exports.UserRole = void 0;
exports.UserRole = {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    TECHNICIAN: 'TECHNICIAN'
};
exports.WorkOrderStatus = {
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
    PAID: 'PAID'
};
exports.NotificationType = {
    WORK_ORDER_ASSIGNED: 'WORK_ORDER_ASSIGNED',
    WORK_ORDER_UPDATED: 'WORK_ORDER_UPDATED',
    WORK_ORDER_REMINDER: 'WORK_ORDER_REMINDER',
    TIME_ENTRY_EDITED: 'TIME_ENTRY_EDITED'
};
exports.NotificationChannel = {
    EMAIL: 'EMAIL',
    PUSH: 'PUSH'
};
//# sourceMappingURL=enums.js.map
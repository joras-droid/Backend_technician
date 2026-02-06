import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: any;
export declare const JsonNull: any;
export declare const AnyNull: any;
export declare const ModelName: {
    readonly User: "User";
    readonly Client: "Client";
    readonly WorkOrderTemplate: "WorkOrderTemplate";
    readonly WorkOrder: "WorkOrder";
    readonly WorkOrderEquipment: "WorkOrderEquipment";
    readonly Attachment: "Attachment";
    readonly TimeEntry: "TimeEntry";
    readonly TimeEntryEdit: "TimeEntryEdit";
    readonly AuditLog: "AuditLog";
    readonly Notification: "Notification";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly email: "email";
    readonly phone: "phone";
    readonly address: "address";
    readonly username: "username";
    readonly password: "password";
    readonly role: "role";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const ClientScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly name: "name";
    readonly email: "email";
    readonly phone: "phone";
    readonly address: "address";
    readonly notes: "notes";
};
export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum];
export declare const WorkOrderTemplateScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly name: "name";
    readonly tasks: "tasks";
    readonly notes: "notes";
};
export type WorkOrderTemplateScalarFieldEnum = (typeof WorkOrderTemplateScalarFieldEnum)[keyof typeof WorkOrderTemplateScalarFieldEnum];
export declare const WorkOrderScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly workOrderNumber: "workOrderNumber";
    readonly scheduledAt: "scheduledAt";
    readonly estimatedHours: "estimatedHours";
    readonly payRate: "payRate";
    readonly facilityName: "facilityName";
    readonly facilityAddress: "facilityAddress";
    readonly pointOfContact: "pointOfContact";
    readonly tasks: "tasks";
    readonly notes: "notes";
    readonly status: "status";
    readonly invoiceNumber: "invoiceNumber";
    readonly clientId: "clientId";
    readonly technicianId: "technicianId";
    readonly templateId: "templateId";
};
export type WorkOrderScalarFieldEnum = (typeof WorkOrderScalarFieldEnum)[keyof typeof WorkOrderScalarFieldEnum];
export declare const WorkOrderEquipmentScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly workOrderId: "workOrderId";
    readonly name: "name";
    readonly quantity: "quantity";
    readonly cost: "cost";
    readonly vendor: "vendor";
};
export type WorkOrderEquipmentScalarFieldEnum = (typeof WorkOrderEquipmentScalarFieldEnum)[keyof typeof WorkOrderEquipmentScalarFieldEnum];
export declare const AttachmentScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly workOrderId: "workOrderId";
    readonly url: "url";
    readonly type: "type";
    readonly description: "description";
};
export type AttachmentScalarFieldEnum = (typeof AttachmentScalarFieldEnum)[keyof typeof AttachmentScalarFieldEnum];
export declare const TimeEntryScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly workOrderId: "workOrderId";
    readonly technicianId: "technicianId";
    readonly checkInAt: "checkInAt";
    readonly checkInLat: "checkInLat";
    readonly checkInLng: "checkInLng";
    readonly checkOutAt: "checkOutAt";
    readonly checkOutLat: "checkOutLat";
    readonly checkOutLng: "checkOutLng";
};
export type TimeEntryScalarFieldEnum = (typeof TimeEntryScalarFieldEnum)[keyof typeof TimeEntryScalarFieldEnum];
export declare const TimeEntryEditScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly timeEntryId: "timeEntryId";
    readonly field: "field";
    readonly originalValue: "originalValue";
    readonly updatedValue: "updatedValue";
    readonly editedById: "editedById";
};
export type TimeEntryEditScalarFieldEnum = (typeof TimeEntryEditScalarFieldEnum)[keyof typeof TimeEntryEditScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly actorId: "actorId";
    readonly entity: "entity";
    readonly entityId: "entityId";
    readonly action: "action";
    readonly meta: "meta";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly userId: "userId";
    readonly type: "type";
    readonly channel: "channel";
    readonly title: "title";
    readonly message: "message";
    readonly deliveredAt: "deliveredAt";
    readonly readAt: "readAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

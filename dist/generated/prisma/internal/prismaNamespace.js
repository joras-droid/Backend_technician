"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.NotificationScalarFieldEnum = exports.AuditLogScalarFieldEnum = exports.TimeEntryEditScalarFieldEnum = exports.TimeEntryScalarFieldEnum = exports.AttachmentScalarFieldEnum = exports.WorkOrderEquipmentScalarFieldEnum = exports.WorkOrderScalarFieldEnum = exports.WorkOrderTemplateScalarFieldEnum = exports.ClientScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.3.0",
    engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Client: 'Client',
    WorkOrderTemplate: 'WorkOrderTemplate',
    WorkOrder: 'WorkOrder',
    WorkOrderEquipment: 'WorkOrderEquipment',
    Attachment: 'Attachment',
    TimeEntry: 'TimeEntry',
    TimeEntryEdit: 'TimeEntryEdit',
    AuditLog: 'AuditLog',
    Notification: 'Notification'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    address: 'address',
    username: 'username',
    password: 'password',
    role: 'role'
};
exports.ClientScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    email: 'email',
    phone: 'phone',
    address: 'address',
    notes: 'notes'
};
exports.WorkOrderTemplateScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    tasks: 'tasks',
    notes: 'notes'
};
exports.WorkOrderScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    workOrderNumber: 'workOrderNumber',
    scheduledAt: 'scheduledAt',
    estimatedHours: 'estimatedHours',
    payRate: 'payRate',
    facilityName: 'facilityName',
    facilityAddress: 'facilityAddress',
    pointOfContact: 'pointOfContact',
    tasks: 'tasks',
    notes: 'notes',
    status: 'status',
    invoiceNumber: 'invoiceNumber',
    clientId: 'clientId',
    technicianId: 'technicianId',
    templateId: 'templateId'
};
exports.WorkOrderEquipmentScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    workOrderId: 'workOrderId',
    name: 'name',
    quantity: 'quantity',
    cost: 'cost',
    vendor: 'vendor'
};
exports.AttachmentScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    workOrderId: 'workOrderId',
    url: 'url',
    type: 'type',
    description: 'description'
};
exports.TimeEntryScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    workOrderId: 'workOrderId',
    technicianId: 'technicianId',
    checkInAt: 'checkInAt',
    checkInLat: 'checkInLat',
    checkInLng: 'checkInLng',
    checkOutAt: 'checkOutAt',
    checkOutLat: 'checkOutLat',
    checkOutLng: 'checkOutLng'
};
exports.TimeEntryEditScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    timeEntryId: 'timeEntryId',
    field: 'field',
    originalValue: 'originalValue',
    updatedValue: 'updatedValue',
    editedById: 'editedById'
};
exports.AuditLogScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    actorId: 'actorId',
    entity: 'entity',
    entityId: 'entityId',
    action: 'action',
    meta: 'meta'
};
exports.NotificationScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    type: 'type',
    channel: 'channel',
    title: 'title',
    message: 'message',
    deliveredAt: 'deliveredAt',
    readAt: 'readAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map
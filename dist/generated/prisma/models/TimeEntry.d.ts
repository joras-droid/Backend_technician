import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TimeEntryModel = runtime.Types.Result.DefaultSelection<Prisma.$TimeEntryPayload>;
export type AggregateTimeEntry = {
    _count: TimeEntryCountAggregateOutputType | null;
    _avg: TimeEntryAvgAggregateOutputType | null;
    _sum: TimeEntrySumAggregateOutputType | null;
    _min: TimeEntryMinAggregateOutputType | null;
    _max: TimeEntryMaxAggregateOutputType | null;
};
export type TimeEntryAvgAggregateOutputType = {
    checkInLat: number | null;
    checkInLng: number | null;
    checkOutLat: number | null;
    checkOutLng: number | null;
};
export type TimeEntrySumAggregateOutputType = {
    checkInLat: number | null;
    checkInLng: number | null;
    checkOutLat: number | null;
    checkOutLng: number | null;
};
export type TimeEntryMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    workOrderId: string | null;
    technicianId: string | null;
    checkInAt: Date | null;
    checkInLat: number | null;
    checkInLng: number | null;
    checkOutAt: Date | null;
    checkOutLat: number | null;
    checkOutLng: number | null;
};
export type TimeEntryMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    workOrderId: string | null;
    technicianId: string | null;
    checkInAt: Date | null;
    checkInLat: number | null;
    checkInLng: number | null;
    checkOutAt: Date | null;
    checkOutLat: number | null;
    checkOutLng: number | null;
};
export type TimeEntryCountAggregateOutputType = {
    id: number;
    createdAt: number;
    updatedAt: number;
    workOrderId: number;
    technicianId: number;
    checkInAt: number;
    checkInLat: number;
    checkInLng: number;
    checkOutAt: number;
    checkOutLat: number;
    checkOutLng: number;
    _all: number;
};
export type TimeEntryAvgAggregateInputType = {
    checkInLat?: true;
    checkInLng?: true;
    checkOutLat?: true;
    checkOutLng?: true;
};
export type TimeEntrySumAggregateInputType = {
    checkInLat?: true;
    checkInLng?: true;
    checkOutLat?: true;
    checkOutLng?: true;
};
export type TimeEntryMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    workOrderId?: true;
    technicianId?: true;
    checkInAt?: true;
    checkInLat?: true;
    checkInLng?: true;
    checkOutAt?: true;
    checkOutLat?: true;
    checkOutLng?: true;
};
export type TimeEntryMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    workOrderId?: true;
    technicianId?: true;
    checkInAt?: true;
    checkInLat?: true;
    checkInLng?: true;
    checkOutAt?: true;
    checkOutLat?: true;
    checkOutLng?: true;
};
export type TimeEntryCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    workOrderId?: true;
    technicianId?: true;
    checkInAt?: true;
    checkInLat?: true;
    checkInLng?: true;
    checkOutAt?: true;
    checkOutLat?: true;
    checkOutLng?: true;
    _all?: true;
};
export type TimeEntryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TimeEntryWhereInput;
    orderBy?: Prisma.TimeEntryOrderByWithRelationInput | Prisma.TimeEntryOrderByWithRelationInput[];
    cursor?: Prisma.TimeEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TimeEntryCountAggregateInputType;
    _avg?: TimeEntryAvgAggregateInputType;
    _sum?: TimeEntrySumAggregateInputType;
    _min?: TimeEntryMinAggregateInputType;
    _max?: TimeEntryMaxAggregateInputType;
};
export type GetTimeEntryAggregateType<T extends TimeEntryAggregateArgs> = {
    [P in keyof T & keyof AggregateTimeEntry]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTimeEntry[P]> : Prisma.GetScalarType<T[P], AggregateTimeEntry[P]>;
};
export type TimeEntryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TimeEntryWhereInput;
    orderBy?: Prisma.TimeEntryOrderByWithAggregationInput | Prisma.TimeEntryOrderByWithAggregationInput[];
    by: Prisma.TimeEntryScalarFieldEnum[] | Prisma.TimeEntryScalarFieldEnum;
    having?: Prisma.TimeEntryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TimeEntryCountAggregateInputType | true;
    _avg?: TimeEntryAvgAggregateInputType;
    _sum?: TimeEntrySumAggregateInputType;
    _min?: TimeEntryMinAggregateInputType;
    _max?: TimeEntryMaxAggregateInputType;
};
export type TimeEntryGroupByOutputType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    workOrderId: string;
    technicianId: string;
    checkInAt: Date | null;
    checkInLat: number | null;
    checkInLng: number | null;
    checkOutAt: Date | null;
    checkOutLat: number | null;
    checkOutLng: number | null;
    _count: TimeEntryCountAggregateOutputType | null;
    _avg: TimeEntryAvgAggregateOutputType | null;
    _sum: TimeEntrySumAggregateOutputType | null;
    _min: TimeEntryMinAggregateOutputType | null;
    _max: TimeEntryMaxAggregateOutputType | null;
};
type GetTimeEntryGroupByPayload<T extends TimeEntryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TimeEntryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TimeEntryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TimeEntryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TimeEntryGroupByOutputType[P]>;
}>>;
export type TimeEntryWhereInput = {
    AND?: Prisma.TimeEntryWhereInput | Prisma.TimeEntryWhereInput[];
    OR?: Prisma.TimeEntryWhereInput[];
    NOT?: Prisma.TimeEntryWhereInput | Prisma.TimeEntryWhereInput[];
    id?: Prisma.StringFilter<"TimeEntry"> | string;
    createdAt?: Prisma.DateTimeFilter<"TimeEntry"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TimeEntry"> | Date | string;
    workOrderId?: Prisma.StringFilter<"TimeEntry"> | string;
    technicianId?: Prisma.StringFilter<"TimeEntry"> | string;
    checkInAt?: Prisma.DateTimeNullableFilter<"TimeEntry"> | Date | string | null;
    checkInLat?: Prisma.FloatNullableFilter<"TimeEntry"> | number | null;
    checkInLng?: Prisma.FloatNullableFilter<"TimeEntry"> | number | null;
    checkOutAt?: Prisma.DateTimeNullableFilter<"TimeEntry"> | Date | string | null;
    checkOutLat?: Prisma.FloatNullableFilter<"TimeEntry"> | number | null;
    checkOutLng?: Prisma.FloatNullableFilter<"TimeEntry"> | number | null;
    workOrder?: Prisma.XOR<Prisma.WorkOrderScalarRelationFilter, Prisma.WorkOrderWhereInput>;
    technician?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    edits?: Prisma.TimeEntryEditListRelationFilter;
};
export type TimeEntryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    technicianId?: Prisma.SortOrder;
    checkInAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkInLat?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkInLng?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkOutAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkOutLat?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkOutLng?: Prisma.SortOrderInput | Prisma.SortOrder;
    workOrder?: Prisma.WorkOrderOrderByWithRelationInput;
    technician?: Prisma.UserOrderByWithRelationInput;
    edits?: Prisma.TimeEntryEditOrderByRelationAggregateInput;
};
export type TimeEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TimeEntryWhereInput | Prisma.TimeEntryWhereInput[];
    OR?: Prisma.TimeEntryWhereInput[];
    NOT?: Prisma.TimeEntryWhereInput | Prisma.TimeEntryWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"TimeEntry"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TimeEntry"> | Date | string;
    workOrderId?: Prisma.StringFilter<"TimeEntry"> | string;
    technicianId?: Prisma.StringFilter<"TimeEntry"> | string;
    checkInAt?: Prisma.DateTimeNullableFilter<"TimeEntry"> | Date | string | null;
    checkInLat?: Prisma.FloatNullableFilter<"TimeEntry"> | number | null;
    checkInLng?: Prisma.FloatNullableFilter<"TimeEntry"> | number | null;
    checkOutAt?: Prisma.DateTimeNullableFilter<"TimeEntry"> | Date | string | null;
    checkOutLat?: Prisma.FloatNullableFilter<"TimeEntry"> | number | null;
    checkOutLng?: Prisma.FloatNullableFilter<"TimeEntry"> | number | null;
    workOrder?: Prisma.XOR<Prisma.WorkOrderScalarRelationFilter, Prisma.WorkOrderWhereInput>;
    technician?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    edits?: Prisma.TimeEntryEditListRelationFilter;
}, "id">;
export type TimeEntryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    technicianId?: Prisma.SortOrder;
    checkInAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkInLat?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkInLng?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkOutAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkOutLat?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkOutLng?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.TimeEntryCountOrderByAggregateInput;
    _avg?: Prisma.TimeEntryAvgOrderByAggregateInput;
    _max?: Prisma.TimeEntryMaxOrderByAggregateInput;
    _min?: Prisma.TimeEntryMinOrderByAggregateInput;
    _sum?: Prisma.TimeEntrySumOrderByAggregateInput;
};
export type TimeEntryScalarWhereWithAggregatesInput = {
    AND?: Prisma.TimeEntryScalarWhereWithAggregatesInput | Prisma.TimeEntryScalarWhereWithAggregatesInput[];
    OR?: Prisma.TimeEntryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TimeEntryScalarWhereWithAggregatesInput | Prisma.TimeEntryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TimeEntry"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TimeEntry"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"TimeEntry"> | Date | string;
    workOrderId?: Prisma.StringWithAggregatesFilter<"TimeEntry"> | string;
    technicianId?: Prisma.StringWithAggregatesFilter<"TimeEntry"> | string;
    checkInAt?: Prisma.DateTimeNullableWithAggregatesFilter<"TimeEntry"> | Date | string | null;
    checkInLat?: Prisma.FloatNullableWithAggregatesFilter<"TimeEntry"> | number | null;
    checkInLng?: Prisma.FloatNullableWithAggregatesFilter<"TimeEntry"> | number | null;
    checkOutAt?: Prisma.DateTimeNullableWithAggregatesFilter<"TimeEntry"> | Date | string | null;
    checkOutLat?: Prisma.FloatNullableWithAggregatesFilter<"TimeEntry"> | number | null;
    checkOutLng?: Prisma.FloatNullableWithAggregatesFilter<"TimeEntry"> | number | null;
};
export type TimeEntryCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    checkInAt?: Date | string | null;
    checkInLat?: number | null;
    checkInLng?: number | null;
    checkOutAt?: Date | string | null;
    checkOutLat?: number | null;
    checkOutLng?: number | null;
    workOrder: Prisma.WorkOrderCreateNestedOneWithoutTimeEntriesInput;
    technician: Prisma.UserCreateNestedOneWithoutTimeEntriesInput;
    edits?: Prisma.TimeEntryEditCreateNestedManyWithoutTimeEntryInput;
};
export type TimeEntryUncheckedCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workOrderId: string;
    technicianId: string;
    checkInAt?: Date | string | null;
    checkInLat?: number | null;
    checkInLng?: number | null;
    checkOutAt?: Date | string | null;
    checkOutLat?: number | null;
    checkOutLng?: number | null;
    edits?: Prisma.TimeEntryEditUncheckedCreateNestedManyWithoutTimeEntryInput;
};
export type TimeEntryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkInLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkInLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOutLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    workOrder?: Prisma.WorkOrderUpdateOneRequiredWithoutTimeEntriesNestedInput;
    technician?: Prisma.UserUpdateOneRequiredWithoutTimeEntriesNestedInput;
    edits?: Prisma.TimeEntryEditUpdateManyWithoutTimeEntryNestedInput;
};
export type TimeEntryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    technicianId?: Prisma.StringFieldUpdateOperationsInput | string;
    checkInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkInLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkInLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOutLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    edits?: Prisma.TimeEntryEditUncheckedUpdateManyWithoutTimeEntryNestedInput;
};
export type TimeEntryCreateManyInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workOrderId: string;
    technicianId: string;
    checkInAt?: Date | string | null;
    checkInLat?: number | null;
    checkInLng?: number | null;
    checkOutAt?: Date | string | null;
    checkOutLat?: number | null;
    checkOutLng?: number | null;
};
export type TimeEntryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkInLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkInLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOutLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type TimeEntryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    technicianId?: Prisma.StringFieldUpdateOperationsInput | string;
    checkInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkInLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkInLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOutLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type TimeEntryListRelationFilter = {
    every?: Prisma.TimeEntryWhereInput;
    some?: Prisma.TimeEntryWhereInput;
    none?: Prisma.TimeEntryWhereInput;
};
export type TimeEntryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TimeEntryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    technicianId?: Prisma.SortOrder;
    checkInAt?: Prisma.SortOrder;
    checkInLat?: Prisma.SortOrder;
    checkInLng?: Prisma.SortOrder;
    checkOutAt?: Prisma.SortOrder;
    checkOutLat?: Prisma.SortOrder;
    checkOutLng?: Prisma.SortOrder;
};
export type TimeEntryAvgOrderByAggregateInput = {
    checkInLat?: Prisma.SortOrder;
    checkInLng?: Prisma.SortOrder;
    checkOutLat?: Prisma.SortOrder;
    checkOutLng?: Prisma.SortOrder;
};
export type TimeEntryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    technicianId?: Prisma.SortOrder;
    checkInAt?: Prisma.SortOrder;
    checkInLat?: Prisma.SortOrder;
    checkInLng?: Prisma.SortOrder;
    checkOutAt?: Prisma.SortOrder;
    checkOutLat?: Prisma.SortOrder;
    checkOutLng?: Prisma.SortOrder;
};
export type TimeEntryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    technicianId?: Prisma.SortOrder;
    checkInAt?: Prisma.SortOrder;
    checkInLat?: Prisma.SortOrder;
    checkInLng?: Prisma.SortOrder;
    checkOutAt?: Prisma.SortOrder;
    checkOutLat?: Prisma.SortOrder;
    checkOutLng?: Prisma.SortOrder;
};
export type TimeEntrySumOrderByAggregateInput = {
    checkInLat?: Prisma.SortOrder;
    checkInLng?: Prisma.SortOrder;
    checkOutLat?: Prisma.SortOrder;
    checkOutLng?: Prisma.SortOrder;
};
export type TimeEntryScalarRelationFilter = {
    is?: Prisma.TimeEntryWhereInput;
    isNot?: Prisma.TimeEntryWhereInput;
};
export type TimeEntryCreateNestedManyWithoutTechnicianInput = {
    create?: Prisma.XOR<Prisma.TimeEntryCreateWithoutTechnicianInput, Prisma.TimeEntryUncheckedCreateWithoutTechnicianInput> | Prisma.TimeEntryCreateWithoutTechnicianInput[] | Prisma.TimeEntryUncheckedCreateWithoutTechnicianInput[];
    connectOrCreate?: Prisma.TimeEntryCreateOrConnectWithoutTechnicianInput | Prisma.TimeEntryCreateOrConnectWithoutTechnicianInput[];
    createMany?: Prisma.TimeEntryCreateManyTechnicianInputEnvelope;
    connect?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
};
export type TimeEntryUncheckedCreateNestedManyWithoutTechnicianInput = {
    create?: Prisma.XOR<Prisma.TimeEntryCreateWithoutTechnicianInput, Prisma.TimeEntryUncheckedCreateWithoutTechnicianInput> | Prisma.TimeEntryCreateWithoutTechnicianInput[] | Prisma.TimeEntryUncheckedCreateWithoutTechnicianInput[];
    connectOrCreate?: Prisma.TimeEntryCreateOrConnectWithoutTechnicianInput | Prisma.TimeEntryCreateOrConnectWithoutTechnicianInput[];
    createMany?: Prisma.TimeEntryCreateManyTechnicianInputEnvelope;
    connect?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
};
export type TimeEntryUpdateManyWithoutTechnicianNestedInput = {
    create?: Prisma.XOR<Prisma.TimeEntryCreateWithoutTechnicianInput, Prisma.TimeEntryUncheckedCreateWithoutTechnicianInput> | Prisma.TimeEntryCreateWithoutTechnicianInput[] | Prisma.TimeEntryUncheckedCreateWithoutTechnicianInput[];
    connectOrCreate?: Prisma.TimeEntryCreateOrConnectWithoutTechnicianInput | Prisma.TimeEntryCreateOrConnectWithoutTechnicianInput[];
    upsert?: Prisma.TimeEntryUpsertWithWhereUniqueWithoutTechnicianInput | Prisma.TimeEntryUpsertWithWhereUniqueWithoutTechnicianInput[];
    createMany?: Prisma.TimeEntryCreateManyTechnicianInputEnvelope;
    set?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    disconnect?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    delete?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    connect?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    update?: Prisma.TimeEntryUpdateWithWhereUniqueWithoutTechnicianInput | Prisma.TimeEntryUpdateWithWhereUniqueWithoutTechnicianInput[];
    updateMany?: Prisma.TimeEntryUpdateManyWithWhereWithoutTechnicianInput | Prisma.TimeEntryUpdateManyWithWhereWithoutTechnicianInput[];
    deleteMany?: Prisma.TimeEntryScalarWhereInput | Prisma.TimeEntryScalarWhereInput[];
};
export type TimeEntryUncheckedUpdateManyWithoutTechnicianNestedInput = {
    create?: Prisma.XOR<Prisma.TimeEntryCreateWithoutTechnicianInput, Prisma.TimeEntryUncheckedCreateWithoutTechnicianInput> | Prisma.TimeEntryCreateWithoutTechnicianInput[] | Prisma.TimeEntryUncheckedCreateWithoutTechnicianInput[];
    connectOrCreate?: Prisma.TimeEntryCreateOrConnectWithoutTechnicianInput | Prisma.TimeEntryCreateOrConnectWithoutTechnicianInput[];
    upsert?: Prisma.TimeEntryUpsertWithWhereUniqueWithoutTechnicianInput | Prisma.TimeEntryUpsertWithWhereUniqueWithoutTechnicianInput[];
    createMany?: Prisma.TimeEntryCreateManyTechnicianInputEnvelope;
    set?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    disconnect?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    delete?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    connect?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    update?: Prisma.TimeEntryUpdateWithWhereUniqueWithoutTechnicianInput | Prisma.TimeEntryUpdateWithWhereUniqueWithoutTechnicianInput[];
    updateMany?: Prisma.TimeEntryUpdateManyWithWhereWithoutTechnicianInput | Prisma.TimeEntryUpdateManyWithWhereWithoutTechnicianInput[];
    deleteMany?: Prisma.TimeEntryScalarWhereInput | Prisma.TimeEntryScalarWhereInput[];
};
export type TimeEntryCreateNestedManyWithoutWorkOrderInput = {
    create?: Prisma.XOR<Prisma.TimeEntryCreateWithoutWorkOrderInput, Prisma.TimeEntryUncheckedCreateWithoutWorkOrderInput> | Prisma.TimeEntryCreateWithoutWorkOrderInput[] | Prisma.TimeEntryUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.TimeEntryCreateOrConnectWithoutWorkOrderInput | Prisma.TimeEntryCreateOrConnectWithoutWorkOrderInput[];
    createMany?: Prisma.TimeEntryCreateManyWorkOrderInputEnvelope;
    connect?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
};
export type TimeEntryUncheckedCreateNestedManyWithoutWorkOrderInput = {
    create?: Prisma.XOR<Prisma.TimeEntryCreateWithoutWorkOrderInput, Prisma.TimeEntryUncheckedCreateWithoutWorkOrderInput> | Prisma.TimeEntryCreateWithoutWorkOrderInput[] | Prisma.TimeEntryUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.TimeEntryCreateOrConnectWithoutWorkOrderInput | Prisma.TimeEntryCreateOrConnectWithoutWorkOrderInput[];
    createMany?: Prisma.TimeEntryCreateManyWorkOrderInputEnvelope;
    connect?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
};
export type TimeEntryUpdateManyWithoutWorkOrderNestedInput = {
    create?: Prisma.XOR<Prisma.TimeEntryCreateWithoutWorkOrderInput, Prisma.TimeEntryUncheckedCreateWithoutWorkOrderInput> | Prisma.TimeEntryCreateWithoutWorkOrderInput[] | Prisma.TimeEntryUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.TimeEntryCreateOrConnectWithoutWorkOrderInput | Prisma.TimeEntryCreateOrConnectWithoutWorkOrderInput[];
    upsert?: Prisma.TimeEntryUpsertWithWhereUniqueWithoutWorkOrderInput | Prisma.TimeEntryUpsertWithWhereUniqueWithoutWorkOrderInput[];
    createMany?: Prisma.TimeEntryCreateManyWorkOrderInputEnvelope;
    set?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    disconnect?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    delete?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    connect?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    update?: Prisma.TimeEntryUpdateWithWhereUniqueWithoutWorkOrderInput | Prisma.TimeEntryUpdateWithWhereUniqueWithoutWorkOrderInput[];
    updateMany?: Prisma.TimeEntryUpdateManyWithWhereWithoutWorkOrderInput | Prisma.TimeEntryUpdateManyWithWhereWithoutWorkOrderInput[];
    deleteMany?: Prisma.TimeEntryScalarWhereInput | Prisma.TimeEntryScalarWhereInput[];
};
export type TimeEntryUncheckedUpdateManyWithoutWorkOrderNestedInput = {
    create?: Prisma.XOR<Prisma.TimeEntryCreateWithoutWorkOrderInput, Prisma.TimeEntryUncheckedCreateWithoutWorkOrderInput> | Prisma.TimeEntryCreateWithoutWorkOrderInput[] | Prisma.TimeEntryUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.TimeEntryCreateOrConnectWithoutWorkOrderInput | Prisma.TimeEntryCreateOrConnectWithoutWorkOrderInput[];
    upsert?: Prisma.TimeEntryUpsertWithWhereUniqueWithoutWorkOrderInput | Prisma.TimeEntryUpsertWithWhereUniqueWithoutWorkOrderInput[];
    createMany?: Prisma.TimeEntryCreateManyWorkOrderInputEnvelope;
    set?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    disconnect?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    delete?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    connect?: Prisma.TimeEntryWhereUniqueInput | Prisma.TimeEntryWhereUniqueInput[];
    update?: Prisma.TimeEntryUpdateWithWhereUniqueWithoutWorkOrderInput | Prisma.TimeEntryUpdateWithWhereUniqueWithoutWorkOrderInput[];
    updateMany?: Prisma.TimeEntryUpdateManyWithWhereWithoutWorkOrderInput | Prisma.TimeEntryUpdateManyWithWhereWithoutWorkOrderInput[];
    deleteMany?: Prisma.TimeEntryScalarWhereInput | Prisma.TimeEntryScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type TimeEntryCreateNestedOneWithoutEditsInput = {
    create?: Prisma.XOR<Prisma.TimeEntryCreateWithoutEditsInput, Prisma.TimeEntryUncheckedCreateWithoutEditsInput>;
    connectOrCreate?: Prisma.TimeEntryCreateOrConnectWithoutEditsInput;
    connect?: Prisma.TimeEntryWhereUniqueInput;
};
export type TimeEntryUpdateOneRequiredWithoutEditsNestedInput = {
    create?: Prisma.XOR<Prisma.TimeEntryCreateWithoutEditsInput, Prisma.TimeEntryUncheckedCreateWithoutEditsInput>;
    connectOrCreate?: Prisma.TimeEntryCreateOrConnectWithoutEditsInput;
    upsert?: Prisma.TimeEntryUpsertWithoutEditsInput;
    connect?: Prisma.TimeEntryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TimeEntryUpdateToOneWithWhereWithoutEditsInput, Prisma.TimeEntryUpdateWithoutEditsInput>, Prisma.TimeEntryUncheckedUpdateWithoutEditsInput>;
};
export type TimeEntryCreateWithoutTechnicianInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    checkInAt?: Date | string | null;
    checkInLat?: number | null;
    checkInLng?: number | null;
    checkOutAt?: Date | string | null;
    checkOutLat?: number | null;
    checkOutLng?: number | null;
    workOrder: Prisma.WorkOrderCreateNestedOneWithoutTimeEntriesInput;
    edits?: Prisma.TimeEntryEditCreateNestedManyWithoutTimeEntryInput;
};
export type TimeEntryUncheckedCreateWithoutTechnicianInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workOrderId: string;
    checkInAt?: Date | string | null;
    checkInLat?: number | null;
    checkInLng?: number | null;
    checkOutAt?: Date | string | null;
    checkOutLat?: number | null;
    checkOutLng?: number | null;
    edits?: Prisma.TimeEntryEditUncheckedCreateNestedManyWithoutTimeEntryInput;
};
export type TimeEntryCreateOrConnectWithoutTechnicianInput = {
    where: Prisma.TimeEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.TimeEntryCreateWithoutTechnicianInput, Prisma.TimeEntryUncheckedCreateWithoutTechnicianInput>;
};
export type TimeEntryCreateManyTechnicianInputEnvelope = {
    data: Prisma.TimeEntryCreateManyTechnicianInput | Prisma.TimeEntryCreateManyTechnicianInput[];
    skipDuplicates?: boolean;
};
export type TimeEntryUpsertWithWhereUniqueWithoutTechnicianInput = {
    where: Prisma.TimeEntryWhereUniqueInput;
    update: Prisma.XOR<Prisma.TimeEntryUpdateWithoutTechnicianInput, Prisma.TimeEntryUncheckedUpdateWithoutTechnicianInput>;
    create: Prisma.XOR<Prisma.TimeEntryCreateWithoutTechnicianInput, Prisma.TimeEntryUncheckedCreateWithoutTechnicianInput>;
};
export type TimeEntryUpdateWithWhereUniqueWithoutTechnicianInput = {
    where: Prisma.TimeEntryWhereUniqueInput;
    data: Prisma.XOR<Prisma.TimeEntryUpdateWithoutTechnicianInput, Prisma.TimeEntryUncheckedUpdateWithoutTechnicianInput>;
};
export type TimeEntryUpdateManyWithWhereWithoutTechnicianInput = {
    where: Prisma.TimeEntryScalarWhereInput;
    data: Prisma.XOR<Prisma.TimeEntryUpdateManyMutationInput, Prisma.TimeEntryUncheckedUpdateManyWithoutTechnicianInput>;
};
export type TimeEntryScalarWhereInput = {
    AND?: Prisma.TimeEntryScalarWhereInput | Prisma.TimeEntryScalarWhereInput[];
    OR?: Prisma.TimeEntryScalarWhereInput[];
    NOT?: Prisma.TimeEntryScalarWhereInput | Prisma.TimeEntryScalarWhereInput[];
    id?: Prisma.StringFilter<"TimeEntry"> | string;
    createdAt?: Prisma.DateTimeFilter<"TimeEntry"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TimeEntry"> | Date | string;
    workOrderId?: Prisma.StringFilter<"TimeEntry"> | string;
    technicianId?: Prisma.StringFilter<"TimeEntry"> | string;
    checkInAt?: Prisma.DateTimeNullableFilter<"TimeEntry"> | Date | string | null;
    checkInLat?: Prisma.FloatNullableFilter<"TimeEntry"> | number | null;
    checkInLng?: Prisma.FloatNullableFilter<"TimeEntry"> | number | null;
    checkOutAt?: Prisma.DateTimeNullableFilter<"TimeEntry"> | Date | string | null;
    checkOutLat?: Prisma.FloatNullableFilter<"TimeEntry"> | number | null;
    checkOutLng?: Prisma.FloatNullableFilter<"TimeEntry"> | number | null;
};
export type TimeEntryCreateWithoutWorkOrderInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    checkInAt?: Date | string | null;
    checkInLat?: number | null;
    checkInLng?: number | null;
    checkOutAt?: Date | string | null;
    checkOutLat?: number | null;
    checkOutLng?: number | null;
    technician: Prisma.UserCreateNestedOneWithoutTimeEntriesInput;
    edits?: Prisma.TimeEntryEditCreateNestedManyWithoutTimeEntryInput;
};
export type TimeEntryUncheckedCreateWithoutWorkOrderInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    technicianId: string;
    checkInAt?: Date | string | null;
    checkInLat?: number | null;
    checkInLng?: number | null;
    checkOutAt?: Date | string | null;
    checkOutLat?: number | null;
    checkOutLng?: number | null;
    edits?: Prisma.TimeEntryEditUncheckedCreateNestedManyWithoutTimeEntryInput;
};
export type TimeEntryCreateOrConnectWithoutWorkOrderInput = {
    where: Prisma.TimeEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.TimeEntryCreateWithoutWorkOrderInput, Prisma.TimeEntryUncheckedCreateWithoutWorkOrderInput>;
};
export type TimeEntryCreateManyWorkOrderInputEnvelope = {
    data: Prisma.TimeEntryCreateManyWorkOrderInput | Prisma.TimeEntryCreateManyWorkOrderInput[];
    skipDuplicates?: boolean;
};
export type TimeEntryUpsertWithWhereUniqueWithoutWorkOrderInput = {
    where: Prisma.TimeEntryWhereUniqueInput;
    update: Prisma.XOR<Prisma.TimeEntryUpdateWithoutWorkOrderInput, Prisma.TimeEntryUncheckedUpdateWithoutWorkOrderInput>;
    create: Prisma.XOR<Prisma.TimeEntryCreateWithoutWorkOrderInput, Prisma.TimeEntryUncheckedCreateWithoutWorkOrderInput>;
};
export type TimeEntryUpdateWithWhereUniqueWithoutWorkOrderInput = {
    where: Prisma.TimeEntryWhereUniqueInput;
    data: Prisma.XOR<Prisma.TimeEntryUpdateWithoutWorkOrderInput, Prisma.TimeEntryUncheckedUpdateWithoutWorkOrderInput>;
};
export type TimeEntryUpdateManyWithWhereWithoutWorkOrderInput = {
    where: Prisma.TimeEntryScalarWhereInput;
    data: Prisma.XOR<Prisma.TimeEntryUpdateManyMutationInput, Prisma.TimeEntryUncheckedUpdateManyWithoutWorkOrderInput>;
};
export type TimeEntryCreateWithoutEditsInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    checkInAt?: Date | string | null;
    checkInLat?: number | null;
    checkInLng?: number | null;
    checkOutAt?: Date | string | null;
    checkOutLat?: number | null;
    checkOutLng?: number | null;
    workOrder: Prisma.WorkOrderCreateNestedOneWithoutTimeEntriesInput;
    technician: Prisma.UserCreateNestedOneWithoutTimeEntriesInput;
};
export type TimeEntryUncheckedCreateWithoutEditsInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workOrderId: string;
    technicianId: string;
    checkInAt?: Date | string | null;
    checkInLat?: number | null;
    checkInLng?: number | null;
    checkOutAt?: Date | string | null;
    checkOutLat?: number | null;
    checkOutLng?: number | null;
};
export type TimeEntryCreateOrConnectWithoutEditsInput = {
    where: Prisma.TimeEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.TimeEntryCreateWithoutEditsInput, Prisma.TimeEntryUncheckedCreateWithoutEditsInput>;
};
export type TimeEntryUpsertWithoutEditsInput = {
    update: Prisma.XOR<Prisma.TimeEntryUpdateWithoutEditsInput, Prisma.TimeEntryUncheckedUpdateWithoutEditsInput>;
    create: Prisma.XOR<Prisma.TimeEntryCreateWithoutEditsInput, Prisma.TimeEntryUncheckedCreateWithoutEditsInput>;
    where?: Prisma.TimeEntryWhereInput;
};
export type TimeEntryUpdateToOneWithWhereWithoutEditsInput = {
    where?: Prisma.TimeEntryWhereInput;
    data: Prisma.XOR<Prisma.TimeEntryUpdateWithoutEditsInput, Prisma.TimeEntryUncheckedUpdateWithoutEditsInput>;
};
export type TimeEntryUpdateWithoutEditsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkInLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkInLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOutLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    workOrder?: Prisma.WorkOrderUpdateOneRequiredWithoutTimeEntriesNestedInput;
    technician?: Prisma.UserUpdateOneRequiredWithoutTimeEntriesNestedInput;
};
export type TimeEntryUncheckedUpdateWithoutEditsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    technicianId?: Prisma.StringFieldUpdateOperationsInput | string;
    checkInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkInLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkInLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOutLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type TimeEntryCreateManyTechnicianInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workOrderId: string;
    checkInAt?: Date | string | null;
    checkInLat?: number | null;
    checkInLng?: number | null;
    checkOutAt?: Date | string | null;
    checkOutLat?: number | null;
    checkOutLng?: number | null;
};
export type TimeEntryUpdateWithoutTechnicianInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkInLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkInLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOutLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    workOrder?: Prisma.WorkOrderUpdateOneRequiredWithoutTimeEntriesNestedInput;
    edits?: Prisma.TimeEntryEditUpdateManyWithoutTimeEntryNestedInput;
};
export type TimeEntryUncheckedUpdateWithoutTechnicianInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    checkInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkInLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkInLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOutLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    edits?: Prisma.TimeEntryEditUncheckedUpdateManyWithoutTimeEntryNestedInput;
};
export type TimeEntryUncheckedUpdateManyWithoutTechnicianInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    checkInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkInLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkInLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOutLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type TimeEntryCreateManyWorkOrderInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    technicianId: string;
    checkInAt?: Date | string | null;
    checkInLat?: number | null;
    checkInLng?: number | null;
    checkOutAt?: Date | string | null;
    checkOutLat?: number | null;
    checkOutLng?: number | null;
};
export type TimeEntryUpdateWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkInLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkInLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOutLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    technician?: Prisma.UserUpdateOneRequiredWithoutTimeEntriesNestedInput;
    edits?: Prisma.TimeEntryEditUpdateManyWithoutTimeEntryNestedInput;
};
export type TimeEntryUncheckedUpdateWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    technicianId?: Prisma.StringFieldUpdateOperationsInput | string;
    checkInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkInLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkInLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOutLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    edits?: Prisma.TimeEntryEditUncheckedUpdateManyWithoutTimeEntryNestedInput;
};
export type TimeEntryUncheckedUpdateManyWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    technicianId?: Prisma.StringFieldUpdateOperationsInput | string;
    checkInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkInLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkInLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOutLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    checkOutLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type TimeEntryCountOutputType = {
    edits: number;
};
export type TimeEntryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    edits?: boolean | TimeEntryCountOutputTypeCountEditsArgs;
};
export type TimeEntryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntryCountOutputTypeSelect<ExtArgs> | null;
};
export type TimeEntryCountOutputTypeCountEditsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TimeEntryEditWhereInput;
};
export type TimeEntrySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workOrderId?: boolean;
    technicianId?: boolean;
    checkInAt?: boolean;
    checkInLat?: boolean;
    checkInLng?: boolean;
    checkOutAt?: boolean;
    checkOutLat?: boolean;
    checkOutLng?: boolean;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    technician?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    edits?: boolean | Prisma.TimeEntry$editsArgs<ExtArgs>;
    _count?: boolean | Prisma.TimeEntryCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["timeEntry"]>;
export type TimeEntrySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workOrderId?: boolean;
    technicianId?: boolean;
    checkInAt?: boolean;
    checkInLat?: boolean;
    checkInLng?: boolean;
    checkOutAt?: boolean;
    checkOutLat?: boolean;
    checkOutLng?: boolean;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    technician?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["timeEntry"]>;
export type TimeEntrySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workOrderId?: boolean;
    technicianId?: boolean;
    checkInAt?: boolean;
    checkInLat?: boolean;
    checkInLng?: boolean;
    checkOutAt?: boolean;
    checkOutLat?: boolean;
    checkOutLng?: boolean;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    technician?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["timeEntry"]>;
export type TimeEntrySelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workOrderId?: boolean;
    technicianId?: boolean;
    checkInAt?: boolean;
    checkInLat?: boolean;
    checkInLng?: boolean;
    checkOutAt?: boolean;
    checkOutLat?: boolean;
    checkOutLng?: boolean;
};
export type TimeEntryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "workOrderId" | "technicianId" | "checkInAt" | "checkInLat" | "checkInLng" | "checkOutAt" | "checkOutLat" | "checkOutLng", ExtArgs["result"]["timeEntry"]>;
export type TimeEntryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    technician?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    edits?: boolean | Prisma.TimeEntry$editsArgs<ExtArgs>;
    _count?: boolean | Prisma.TimeEntryCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TimeEntryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    technician?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TimeEntryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    technician?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $TimeEntryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TimeEntry";
    objects: {
        workOrder: Prisma.$WorkOrderPayload<ExtArgs>;
        technician: Prisma.$UserPayload<ExtArgs>;
        edits: Prisma.$TimeEntryEditPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        workOrderId: string;
        technicianId: string;
        checkInAt: Date | null;
        checkInLat: number | null;
        checkInLng: number | null;
        checkOutAt: Date | null;
        checkOutLat: number | null;
        checkOutLng: number | null;
    }, ExtArgs["result"]["timeEntry"]>;
    composites: {};
};
export type TimeEntryGetPayload<S extends boolean | null | undefined | TimeEntryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload, S>;
export type TimeEntryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TimeEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TimeEntryCountAggregateInputType | true;
};
export interface TimeEntryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TimeEntry'];
        meta: {
            name: 'TimeEntry';
        };
    };
    findUnique<T extends TimeEntryFindUniqueArgs>(args: Prisma.SelectSubset<T, TimeEntryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TimeEntryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TimeEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TimeEntryFindFirstArgs>(args?: Prisma.SelectSubset<T, TimeEntryFindFirstArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TimeEntryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TimeEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TimeEntryFindManyArgs>(args?: Prisma.SelectSubset<T, TimeEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TimeEntryCreateArgs>(args: Prisma.SelectSubset<T, TimeEntryCreateArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TimeEntryCreateManyArgs>(args?: Prisma.SelectSubset<T, TimeEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TimeEntryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TimeEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TimeEntryDeleteArgs>(args: Prisma.SelectSubset<T, TimeEntryDeleteArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TimeEntryUpdateArgs>(args: Prisma.SelectSubset<T, TimeEntryUpdateArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TimeEntryDeleteManyArgs>(args?: Prisma.SelectSubset<T, TimeEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TimeEntryUpdateManyArgs>(args: Prisma.SelectSubset<T, TimeEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TimeEntryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TimeEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TimeEntryUpsertArgs>(args: Prisma.SelectSubset<T, TimeEntryUpsertArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TimeEntryCountArgs>(args?: Prisma.Subset<T, TimeEntryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TimeEntryCountAggregateOutputType> : number>;
    aggregate<T extends TimeEntryAggregateArgs>(args: Prisma.Subset<T, TimeEntryAggregateArgs>): Prisma.PrismaPromise<GetTimeEntryAggregateType<T>>;
    groupBy<T extends TimeEntryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TimeEntryGroupByArgs['orderBy'];
    } : {
        orderBy?: TimeEntryGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TimeEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TimeEntryFieldRefs;
}
export interface Prisma__TimeEntryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    workOrder<T extends Prisma.WorkOrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrderDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    technician<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    edits<T extends Prisma.TimeEntry$editsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TimeEntry$editsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TimeEntryEditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TimeEntryFieldRefs {
    readonly id: Prisma.FieldRef<"TimeEntry", 'String'>;
    readonly createdAt: Prisma.FieldRef<"TimeEntry", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"TimeEntry", 'DateTime'>;
    readonly workOrderId: Prisma.FieldRef<"TimeEntry", 'String'>;
    readonly technicianId: Prisma.FieldRef<"TimeEntry", 'String'>;
    readonly checkInAt: Prisma.FieldRef<"TimeEntry", 'DateTime'>;
    readonly checkInLat: Prisma.FieldRef<"TimeEntry", 'Float'>;
    readonly checkInLng: Prisma.FieldRef<"TimeEntry", 'Float'>;
    readonly checkOutAt: Prisma.FieldRef<"TimeEntry", 'DateTime'>;
    readonly checkOutLat: Prisma.FieldRef<"TimeEntry", 'Float'>;
    readonly checkOutLng: Prisma.FieldRef<"TimeEntry", 'Float'>;
}
export type TimeEntryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryInclude<ExtArgs> | null;
    where: Prisma.TimeEntryWhereUniqueInput;
};
export type TimeEntryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryInclude<ExtArgs> | null;
    where: Prisma.TimeEntryWhereUniqueInput;
};
export type TimeEntryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryInclude<ExtArgs> | null;
    where?: Prisma.TimeEntryWhereInput;
    orderBy?: Prisma.TimeEntryOrderByWithRelationInput | Prisma.TimeEntryOrderByWithRelationInput[];
    cursor?: Prisma.TimeEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TimeEntryScalarFieldEnum | Prisma.TimeEntryScalarFieldEnum[];
};
export type TimeEntryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryInclude<ExtArgs> | null;
    where?: Prisma.TimeEntryWhereInput;
    orderBy?: Prisma.TimeEntryOrderByWithRelationInput | Prisma.TimeEntryOrderByWithRelationInput[];
    cursor?: Prisma.TimeEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TimeEntryScalarFieldEnum | Prisma.TimeEntryScalarFieldEnum[];
};
export type TimeEntryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryInclude<ExtArgs> | null;
    where?: Prisma.TimeEntryWhereInput;
    orderBy?: Prisma.TimeEntryOrderByWithRelationInput | Prisma.TimeEntryOrderByWithRelationInput[];
    cursor?: Prisma.TimeEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TimeEntryScalarFieldEnum | Prisma.TimeEntryScalarFieldEnum[];
};
export type TimeEntryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TimeEntryCreateInput, Prisma.TimeEntryUncheckedCreateInput>;
};
export type TimeEntryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TimeEntryCreateManyInput | Prisma.TimeEntryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TimeEntryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    data: Prisma.TimeEntryCreateManyInput | Prisma.TimeEntryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TimeEntryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TimeEntryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TimeEntryUpdateInput, Prisma.TimeEntryUncheckedUpdateInput>;
    where: Prisma.TimeEntryWhereUniqueInput;
};
export type TimeEntryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TimeEntryUpdateManyMutationInput, Prisma.TimeEntryUncheckedUpdateManyInput>;
    where?: Prisma.TimeEntryWhereInput;
    limit?: number;
};
export type TimeEntryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TimeEntryUpdateManyMutationInput, Prisma.TimeEntryUncheckedUpdateManyInput>;
    where?: Prisma.TimeEntryWhereInput;
    limit?: number;
    include?: Prisma.TimeEntryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TimeEntryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryInclude<ExtArgs> | null;
    where: Prisma.TimeEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.TimeEntryCreateInput, Prisma.TimeEntryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TimeEntryUpdateInput, Prisma.TimeEntryUncheckedUpdateInput>;
};
export type TimeEntryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryInclude<ExtArgs> | null;
    where: Prisma.TimeEntryWhereUniqueInput;
};
export type TimeEntryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TimeEntryWhereInput;
    limit?: number;
};
export type TimeEntry$editsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntryEditSelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryEditOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryEditInclude<ExtArgs> | null;
    where?: Prisma.TimeEntryEditWhereInput;
    orderBy?: Prisma.TimeEntryEditOrderByWithRelationInput | Prisma.TimeEntryEditOrderByWithRelationInput[];
    cursor?: Prisma.TimeEntryEditWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TimeEntryEditScalarFieldEnum | Prisma.TimeEntryEditScalarFieldEnum[];
};
export type TimeEntryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryInclude<ExtArgs> | null;
};
export {};

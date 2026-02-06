import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TimeEntryEditModel = runtime.Types.Result.DefaultSelection<Prisma.$TimeEntryEditPayload>;
export type AggregateTimeEntryEdit = {
    _count: TimeEntryEditCountAggregateOutputType | null;
    _min: TimeEntryEditMinAggregateOutputType | null;
    _max: TimeEntryEditMaxAggregateOutputType | null;
};
export type TimeEntryEditMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    timeEntryId: string | null;
    field: string | null;
    originalValue: string | null;
    updatedValue: string | null;
    editedById: string | null;
};
export type TimeEntryEditMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    timeEntryId: string | null;
    field: string | null;
    originalValue: string | null;
    updatedValue: string | null;
    editedById: string | null;
};
export type TimeEntryEditCountAggregateOutputType = {
    id: number;
    createdAt: number;
    timeEntryId: number;
    field: number;
    originalValue: number;
    updatedValue: number;
    editedById: number;
    _all: number;
};
export type TimeEntryEditMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    timeEntryId?: true;
    field?: true;
    originalValue?: true;
    updatedValue?: true;
    editedById?: true;
};
export type TimeEntryEditMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    timeEntryId?: true;
    field?: true;
    originalValue?: true;
    updatedValue?: true;
    editedById?: true;
};
export type TimeEntryEditCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    timeEntryId?: true;
    field?: true;
    originalValue?: true;
    updatedValue?: true;
    editedById?: true;
    _all?: true;
};
export type TimeEntryEditAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TimeEntryEditWhereInput;
    orderBy?: Prisma.TimeEntryEditOrderByWithRelationInput | Prisma.TimeEntryEditOrderByWithRelationInput[];
    cursor?: Prisma.TimeEntryEditWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TimeEntryEditCountAggregateInputType;
    _min?: TimeEntryEditMinAggregateInputType;
    _max?: TimeEntryEditMaxAggregateInputType;
};
export type GetTimeEntryEditAggregateType<T extends TimeEntryEditAggregateArgs> = {
    [P in keyof T & keyof AggregateTimeEntryEdit]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTimeEntryEdit[P]> : Prisma.GetScalarType<T[P], AggregateTimeEntryEdit[P]>;
};
export type TimeEntryEditGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TimeEntryEditWhereInput;
    orderBy?: Prisma.TimeEntryEditOrderByWithAggregationInput | Prisma.TimeEntryEditOrderByWithAggregationInput[];
    by: Prisma.TimeEntryEditScalarFieldEnum[] | Prisma.TimeEntryEditScalarFieldEnum;
    having?: Prisma.TimeEntryEditScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TimeEntryEditCountAggregateInputType | true;
    _min?: TimeEntryEditMinAggregateInputType;
    _max?: TimeEntryEditMaxAggregateInputType;
};
export type TimeEntryEditGroupByOutputType = {
    id: string;
    createdAt: Date;
    timeEntryId: string;
    field: string;
    originalValue: string | null;
    updatedValue: string | null;
    editedById: string;
    _count: TimeEntryEditCountAggregateOutputType | null;
    _min: TimeEntryEditMinAggregateOutputType | null;
    _max: TimeEntryEditMaxAggregateOutputType | null;
};
type GetTimeEntryEditGroupByPayload<T extends TimeEntryEditGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TimeEntryEditGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TimeEntryEditGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TimeEntryEditGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TimeEntryEditGroupByOutputType[P]>;
}>>;
export type TimeEntryEditWhereInput = {
    AND?: Prisma.TimeEntryEditWhereInput | Prisma.TimeEntryEditWhereInput[];
    OR?: Prisma.TimeEntryEditWhereInput[];
    NOT?: Prisma.TimeEntryEditWhereInput | Prisma.TimeEntryEditWhereInput[];
    id?: Prisma.StringFilter<"TimeEntryEdit"> | string;
    createdAt?: Prisma.DateTimeFilter<"TimeEntryEdit"> | Date | string;
    timeEntryId?: Prisma.StringFilter<"TimeEntryEdit"> | string;
    field?: Prisma.StringFilter<"TimeEntryEdit"> | string;
    originalValue?: Prisma.StringNullableFilter<"TimeEntryEdit"> | string | null;
    updatedValue?: Prisma.StringNullableFilter<"TimeEntryEdit"> | string | null;
    editedById?: Prisma.StringFilter<"TimeEntryEdit"> | string;
    timeEntry?: Prisma.XOR<Prisma.TimeEntryScalarRelationFilter, Prisma.TimeEntryWhereInput>;
    editedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type TimeEntryEditOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    timeEntryId?: Prisma.SortOrder;
    field?: Prisma.SortOrder;
    originalValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    editedById?: Prisma.SortOrder;
    timeEntry?: Prisma.TimeEntryOrderByWithRelationInput;
    editedBy?: Prisma.UserOrderByWithRelationInput;
};
export type TimeEntryEditWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TimeEntryEditWhereInput | Prisma.TimeEntryEditWhereInput[];
    OR?: Prisma.TimeEntryEditWhereInput[];
    NOT?: Prisma.TimeEntryEditWhereInput | Prisma.TimeEntryEditWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"TimeEntryEdit"> | Date | string;
    timeEntryId?: Prisma.StringFilter<"TimeEntryEdit"> | string;
    field?: Prisma.StringFilter<"TimeEntryEdit"> | string;
    originalValue?: Prisma.StringNullableFilter<"TimeEntryEdit"> | string | null;
    updatedValue?: Prisma.StringNullableFilter<"TimeEntryEdit"> | string | null;
    editedById?: Prisma.StringFilter<"TimeEntryEdit"> | string;
    timeEntry?: Prisma.XOR<Prisma.TimeEntryScalarRelationFilter, Prisma.TimeEntryWhereInput>;
    editedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type TimeEntryEditOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    timeEntryId?: Prisma.SortOrder;
    field?: Prisma.SortOrder;
    originalValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    editedById?: Prisma.SortOrder;
    _count?: Prisma.TimeEntryEditCountOrderByAggregateInput;
    _max?: Prisma.TimeEntryEditMaxOrderByAggregateInput;
    _min?: Prisma.TimeEntryEditMinOrderByAggregateInput;
};
export type TimeEntryEditScalarWhereWithAggregatesInput = {
    AND?: Prisma.TimeEntryEditScalarWhereWithAggregatesInput | Prisma.TimeEntryEditScalarWhereWithAggregatesInput[];
    OR?: Prisma.TimeEntryEditScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TimeEntryEditScalarWhereWithAggregatesInput | Prisma.TimeEntryEditScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TimeEntryEdit"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TimeEntryEdit"> | Date | string;
    timeEntryId?: Prisma.StringWithAggregatesFilter<"TimeEntryEdit"> | string;
    field?: Prisma.StringWithAggregatesFilter<"TimeEntryEdit"> | string;
    originalValue?: Prisma.StringNullableWithAggregatesFilter<"TimeEntryEdit"> | string | null;
    updatedValue?: Prisma.StringNullableWithAggregatesFilter<"TimeEntryEdit"> | string | null;
    editedById?: Prisma.StringWithAggregatesFilter<"TimeEntryEdit"> | string;
};
export type TimeEntryEditCreateInput = {
    id?: string;
    createdAt?: Date | string;
    field: string;
    originalValue?: string | null;
    updatedValue?: string | null;
    timeEntry: Prisma.TimeEntryCreateNestedOneWithoutEditsInput;
    editedBy: Prisma.UserCreateNestedOneWithoutTimeEntryEditsInput;
};
export type TimeEntryEditUncheckedCreateInput = {
    id?: string;
    createdAt?: Date | string;
    timeEntryId: string;
    field: string;
    originalValue?: string | null;
    updatedValue?: string | null;
    editedById: string;
};
export type TimeEntryEditUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    originalValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    timeEntry?: Prisma.TimeEntryUpdateOneRequiredWithoutEditsNestedInput;
    editedBy?: Prisma.UserUpdateOneRequiredWithoutTimeEntryEditsNestedInput;
};
export type TimeEntryEditUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    timeEntryId?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    originalValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    editedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type TimeEntryEditCreateManyInput = {
    id?: string;
    createdAt?: Date | string;
    timeEntryId: string;
    field: string;
    originalValue?: string | null;
    updatedValue?: string | null;
    editedById: string;
};
export type TimeEntryEditUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    originalValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type TimeEntryEditUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    timeEntryId?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    originalValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    editedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type TimeEntryEditListRelationFilter = {
    every?: Prisma.TimeEntryEditWhereInput;
    some?: Prisma.TimeEntryEditWhereInput;
    none?: Prisma.TimeEntryEditWhereInput;
};
export type TimeEntryEditOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TimeEntryEditCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    timeEntryId?: Prisma.SortOrder;
    field?: Prisma.SortOrder;
    originalValue?: Prisma.SortOrder;
    updatedValue?: Prisma.SortOrder;
    editedById?: Prisma.SortOrder;
};
export type TimeEntryEditMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    timeEntryId?: Prisma.SortOrder;
    field?: Prisma.SortOrder;
    originalValue?: Prisma.SortOrder;
    updatedValue?: Prisma.SortOrder;
    editedById?: Prisma.SortOrder;
};
export type TimeEntryEditMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    timeEntryId?: Prisma.SortOrder;
    field?: Prisma.SortOrder;
    originalValue?: Prisma.SortOrder;
    updatedValue?: Prisma.SortOrder;
    editedById?: Prisma.SortOrder;
};
export type TimeEntryEditCreateNestedManyWithoutEditedByInput = {
    create?: Prisma.XOR<Prisma.TimeEntryEditCreateWithoutEditedByInput, Prisma.TimeEntryEditUncheckedCreateWithoutEditedByInput> | Prisma.TimeEntryEditCreateWithoutEditedByInput[] | Prisma.TimeEntryEditUncheckedCreateWithoutEditedByInput[];
    connectOrCreate?: Prisma.TimeEntryEditCreateOrConnectWithoutEditedByInput | Prisma.TimeEntryEditCreateOrConnectWithoutEditedByInput[];
    createMany?: Prisma.TimeEntryEditCreateManyEditedByInputEnvelope;
    connect?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
};
export type TimeEntryEditUncheckedCreateNestedManyWithoutEditedByInput = {
    create?: Prisma.XOR<Prisma.TimeEntryEditCreateWithoutEditedByInput, Prisma.TimeEntryEditUncheckedCreateWithoutEditedByInput> | Prisma.TimeEntryEditCreateWithoutEditedByInput[] | Prisma.TimeEntryEditUncheckedCreateWithoutEditedByInput[];
    connectOrCreate?: Prisma.TimeEntryEditCreateOrConnectWithoutEditedByInput | Prisma.TimeEntryEditCreateOrConnectWithoutEditedByInput[];
    createMany?: Prisma.TimeEntryEditCreateManyEditedByInputEnvelope;
    connect?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
};
export type TimeEntryEditUpdateManyWithoutEditedByNestedInput = {
    create?: Prisma.XOR<Prisma.TimeEntryEditCreateWithoutEditedByInput, Prisma.TimeEntryEditUncheckedCreateWithoutEditedByInput> | Prisma.TimeEntryEditCreateWithoutEditedByInput[] | Prisma.TimeEntryEditUncheckedCreateWithoutEditedByInput[];
    connectOrCreate?: Prisma.TimeEntryEditCreateOrConnectWithoutEditedByInput | Prisma.TimeEntryEditCreateOrConnectWithoutEditedByInput[];
    upsert?: Prisma.TimeEntryEditUpsertWithWhereUniqueWithoutEditedByInput | Prisma.TimeEntryEditUpsertWithWhereUniqueWithoutEditedByInput[];
    createMany?: Prisma.TimeEntryEditCreateManyEditedByInputEnvelope;
    set?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    disconnect?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    delete?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    connect?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    update?: Prisma.TimeEntryEditUpdateWithWhereUniqueWithoutEditedByInput | Prisma.TimeEntryEditUpdateWithWhereUniqueWithoutEditedByInput[];
    updateMany?: Prisma.TimeEntryEditUpdateManyWithWhereWithoutEditedByInput | Prisma.TimeEntryEditUpdateManyWithWhereWithoutEditedByInput[];
    deleteMany?: Prisma.TimeEntryEditScalarWhereInput | Prisma.TimeEntryEditScalarWhereInput[];
};
export type TimeEntryEditUncheckedUpdateManyWithoutEditedByNestedInput = {
    create?: Prisma.XOR<Prisma.TimeEntryEditCreateWithoutEditedByInput, Prisma.TimeEntryEditUncheckedCreateWithoutEditedByInput> | Prisma.TimeEntryEditCreateWithoutEditedByInput[] | Prisma.TimeEntryEditUncheckedCreateWithoutEditedByInput[];
    connectOrCreate?: Prisma.TimeEntryEditCreateOrConnectWithoutEditedByInput | Prisma.TimeEntryEditCreateOrConnectWithoutEditedByInput[];
    upsert?: Prisma.TimeEntryEditUpsertWithWhereUniqueWithoutEditedByInput | Prisma.TimeEntryEditUpsertWithWhereUniqueWithoutEditedByInput[];
    createMany?: Prisma.TimeEntryEditCreateManyEditedByInputEnvelope;
    set?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    disconnect?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    delete?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    connect?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    update?: Prisma.TimeEntryEditUpdateWithWhereUniqueWithoutEditedByInput | Prisma.TimeEntryEditUpdateWithWhereUniqueWithoutEditedByInput[];
    updateMany?: Prisma.TimeEntryEditUpdateManyWithWhereWithoutEditedByInput | Prisma.TimeEntryEditUpdateManyWithWhereWithoutEditedByInput[];
    deleteMany?: Prisma.TimeEntryEditScalarWhereInput | Prisma.TimeEntryEditScalarWhereInput[];
};
export type TimeEntryEditCreateNestedManyWithoutTimeEntryInput = {
    create?: Prisma.XOR<Prisma.TimeEntryEditCreateWithoutTimeEntryInput, Prisma.TimeEntryEditUncheckedCreateWithoutTimeEntryInput> | Prisma.TimeEntryEditCreateWithoutTimeEntryInput[] | Prisma.TimeEntryEditUncheckedCreateWithoutTimeEntryInput[];
    connectOrCreate?: Prisma.TimeEntryEditCreateOrConnectWithoutTimeEntryInput | Prisma.TimeEntryEditCreateOrConnectWithoutTimeEntryInput[];
    createMany?: Prisma.TimeEntryEditCreateManyTimeEntryInputEnvelope;
    connect?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
};
export type TimeEntryEditUncheckedCreateNestedManyWithoutTimeEntryInput = {
    create?: Prisma.XOR<Prisma.TimeEntryEditCreateWithoutTimeEntryInput, Prisma.TimeEntryEditUncheckedCreateWithoutTimeEntryInput> | Prisma.TimeEntryEditCreateWithoutTimeEntryInput[] | Prisma.TimeEntryEditUncheckedCreateWithoutTimeEntryInput[];
    connectOrCreate?: Prisma.TimeEntryEditCreateOrConnectWithoutTimeEntryInput | Prisma.TimeEntryEditCreateOrConnectWithoutTimeEntryInput[];
    createMany?: Prisma.TimeEntryEditCreateManyTimeEntryInputEnvelope;
    connect?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
};
export type TimeEntryEditUpdateManyWithoutTimeEntryNestedInput = {
    create?: Prisma.XOR<Prisma.TimeEntryEditCreateWithoutTimeEntryInput, Prisma.TimeEntryEditUncheckedCreateWithoutTimeEntryInput> | Prisma.TimeEntryEditCreateWithoutTimeEntryInput[] | Prisma.TimeEntryEditUncheckedCreateWithoutTimeEntryInput[];
    connectOrCreate?: Prisma.TimeEntryEditCreateOrConnectWithoutTimeEntryInput | Prisma.TimeEntryEditCreateOrConnectWithoutTimeEntryInput[];
    upsert?: Prisma.TimeEntryEditUpsertWithWhereUniqueWithoutTimeEntryInput | Prisma.TimeEntryEditUpsertWithWhereUniqueWithoutTimeEntryInput[];
    createMany?: Prisma.TimeEntryEditCreateManyTimeEntryInputEnvelope;
    set?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    disconnect?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    delete?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    connect?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    update?: Prisma.TimeEntryEditUpdateWithWhereUniqueWithoutTimeEntryInput | Prisma.TimeEntryEditUpdateWithWhereUniqueWithoutTimeEntryInput[];
    updateMany?: Prisma.TimeEntryEditUpdateManyWithWhereWithoutTimeEntryInput | Prisma.TimeEntryEditUpdateManyWithWhereWithoutTimeEntryInput[];
    deleteMany?: Prisma.TimeEntryEditScalarWhereInput | Prisma.TimeEntryEditScalarWhereInput[];
};
export type TimeEntryEditUncheckedUpdateManyWithoutTimeEntryNestedInput = {
    create?: Prisma.XOR<Prisma.TimeEntryEditCreateWithoutTimeEntryInput, Prisma.TimeEntryEditUncheckedCreateWithoutTimeEntryInput> | Prisma.TimeEntryEditCreateWithoutTimeEntryInput[] | Prisma.TimeEntryEditUncheckedCreateWithoutTimeEntryInput[];
    connectOrCreate?: Prisma.TimeEntryEditCreateOrConnectWithoutTimeEntryInput | Prisma.TimeEntryEditCreateOrConnectWithoutTimeEntryInput[];
    upsert?: Prisma.TimeEntryEditUpsertWithWhereUniqueWithoutTimeEntryInput | Prisma.TimeEntryEditUpsertWithWhereUniqueWithoutTimeEntryInput[];
    createMany?: Prisma.TimeEntryEditCreateManyTimeEntryInputEnvelope;
    set?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    disconnect?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    delete?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    connect?: Prisma.TimeEntryEditWhereUniqueInput | Prisma.TimeEntryEditWhereUniqueInput[];
    update?: Prisma.TimeEntryEditUpdateWithWhereUniqueWithoutTimeEntryInput | Prisma.TimeEntryEditUpdateWithWhereUniqueWithoutTimeEntryInput[];
    updateMany?: Prisma.TimeEntryEditUpdateManyWithWhereWithoutTimeEntryInput | Prisma.TimeEntryEditUpdateManyWithWhereWithoutTimeEntryInput[];
    deleteMany?: Prisma.TimeEntryEditScalarWhereInput | Prisma.TimeEntryEditScalarWhereInput[];
};
export type TimeEntryEditCreateWithoutEditedByInput = {
    id?: string;
    createdAt?: Date | string;
    field: string;
    originalValue?: string | null;
    updatedValue?: string | null;
    timeEntry: Prisma.TimeEntryCreateNestedOneWithoutEditsInput;
};
export type TimeEntryEditUncheckedCreateWithoutEditedByInput = {
    id?: string;
    createdAt?: Date | string;
    timeEntryId: string;
    field: string;
    originalValue?: string | null;
    updatedValue?: string | null;
};
export type TimeEntryEditCreateOrConnectWithoutEditedByInput = {
    where: Prisma.TimeEntryEditWhereUniqueInput;
    create: Prisma.XOR<Prisma.TimeEntryEditCreateWithoutEditedByInput, Prisma.TimeEntryEditUncheckedCreateWithoutEditedByInput>;
};
export type TimeEntryEditCreateManyEditedByInputEnvelope = {
    data: Prisma.TimeEntryEditCreateManyEditedByInput | Prisma.TimeEntryEditCreateManyEditedByInput[];
    skipDuplicates?: boolean;
};
export type TimeEntryEditUpsertWithWhereUniqueWithoutEditedByInput = {
    where: Prisma.TimeEntryEditWhereUniqueInput;
    update: Prisma.XOR<Prisma.TimeEntryEditUpdateWithoutEditedByInput, Prisma.TimeEntryEditUncheckedUpdateWithoutEditedByInput>;
    create: Prisma.XOR<Prisma.TimeEntryEditCreateWithoutEditedByInput, Prisma.TimeEntryEditUncheckedCreateWithoutEditedByInput>;
};
export type TimeEntryEditUpdateWithWhereUniqueWithoutEditedByInput = {
    where: Prisma.TimeEntryEditWhereUniqueInput;
    data: Prisma.XOR<Prisma.TimeEntryEditUpdateWithoutEditedByInput, Prisma.TimeEntryEditUncheckedUpdateWithoutEditedByInput>;
};
export type TimeEntryEditUpdateManyWithWhereWithoutEditedByInput = {
    where: Prisma.TimeEntryEditScalarWhereInput;
    data: Prisma.XOR<Prisma.TimeEntryEditUpdateManyMutationInput, Prisma.TimeEntryEditUncheckedUpdateManyWithoutEditedByInput>;
};
export type TimeEntryEditScalarWhereInput = {
    AND?: Prisma.TimeEntryEditScalarWhereInput | Prisma.TimeEntryEditScalarWhereInput[];
    OR?: Prisma.TimeEntryEditScalarWhereInput[];
    NOT?: Prisma.TimeEntryEditScalarWhereInput | Prisma.TimeEntryEditScalarWhereInput[];
    id?: Prisma.StringFilter<"TimeEntryEdit"> | string;
    createdAt?: Prisma.DateTimeFilter<"TimeEntryEdit"> | Date | string;
    timeEntryId?: Prisma.StringFilter<"TimeEntryEdit"> | string;
    field?: Prisma.StringFilter<"TimeEntryEdit"> | string;
    originalValue?: Prisma.StringNullableFilter<"TimeEntryEdit"> | string | null;
    updatedValue?: Prisma.StringNullableFilter<"TimeEntryEdit"> | string | null;
    editedById?: Prisma.StringFilter<"TimeEntryEdit"> | string;
};
export type TimeEntryEditCreateWithoutTimeEntryInput = {
    id?: string;
    createdAt?: Date | string;
    field: string;
    originalValue?: string | null;
    updatedValue?: string | null;
    editedBy: Prisma.UserCreateNestedOneWithoutTimeEntryEditsInput;
};
export type TimeEntryEditUncheckedCreateWithoutTimeEntryInput = {
    id?: string;
    createdAt?: Date | string;
    field: string;
    originalValue?: string | null;
    updatedValue?: string | null;
    editedById: string;
};
export type TimeEntryEditCreateOrConnectWithoutTimeEntryInput = {
    where: Prisma.TimeEntryEditWhereUniqueInput;
    create: Prisma.XOR<Prisma.TimeEntryEditCreateWithoutTimeEntryInput, Prisma.TimeEntryEditUncheckedCreateWithoutTimeEntryInput>;
};
export type TimeEntryEditCreateManyTimeEntryInputEnvelope = {
    data: Prisma.TimeEntryEditCreateManyTimeEntryInput | Prisma.TimeEntryEditCreateManyTimeEntryInput[];
    skipDuplicates?: boolean;
};
export type TimeEntryEditUpsertWithWhereUniqueWithoutTimeEntryInput = {
    where: Prisma.TimeEntryEditWhereUniqueInput;
    update: Prisma.XOR<Prisma.TimeEntryEditUpdateWithoutTimeEntryInput, Prisma.TimeEntryEditUncheckedUpdateWithoutTimeEntryInput>;
    create: Prisma.XOR<Prisma.TimeEntryEditCreateWithoutTimeEntryInput, Prisma.TimeEntryEditUncheckedCreateWithoutTimeEntryInput>;
};
export type TimeEntryEditUpdateWithWhereUniqueWithoutTimeEntryInput = {
    where: Prisma.TimeEntryEditWhereUniqueInput;
    data: Prisma.XOR<Prisma.TimeEntryEditUpdateWithoutTimeEntryInput, Prisma.TimeEntryEditUncheckedUpdateWithoutTimeEntryInput>;
};
export type TimeEntryEditUpdateManyWithWhereWithoutTimeEntryInput = {
    where: Prisma.TimeEntryEditScalarWhereInput;
    data: Prisma.XOR<Prisma.TimeEntryEditUpdateManyMutationInput, Prisma.TimeEntryEditUncheckedUpdateManyWithoutTimeEntryInput>;
};
export type TimeEntryEditCreateManyEditedByInput = {
    id?: string;
    createdAt?: Date | string;
    timeEntryId: string;
    field: string;
    originalValue?: string | null;
    updatedValue?: string | null;
};
export type TimeEntryEditUpdateWithoutEditedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    originalValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    timeEntry?: Prisma.TimeEntryUpdateOneRequiredWithoutEditsNestedInput;
};
export type TimeEntryEditUncheckedUpdateWithoutEditedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    timeEntryId?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    originalValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type TimeEntryEditUncheckedUpdateManyWithoutEditedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    timeEntryId?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    originalValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type TimeEntryEditCreateManyTimeEntryInput = {
    id?: string;
    createdAt?: Date | string;
    field: string;
    originalValue?: string | null;
    updatedValue?: string | null;
    editedById: string;
};
export type TimeEntryEditUpdateWithoutTimeEntryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    originalValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    editedBy?: Prisma.UserUpdateOneRequiredWithoutTimeEntryEditsNestedInput;
};
export type TimeEntryEditUncheckedUpdateWithoutTimeEntryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    originalValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    editedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type TimeEntryEditUncheckedUpdateManyWithoutTimeEntryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    originalValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    editedById?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type TimeEntryEditSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    timeEntryId?: boolean;
    field?: boolean;
    originalValue?: boolean;
    updatedValue?: boolean;
    editedById?: boolean;
    timeEntry?: boolean | Prisma.TimeEntryDefaultArgs<ExtArgs>;
    editedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["timeEntryEdit"]>;
export type TimeEntryEditSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    timeEntryId?: boolean;
    field?: boolean;
    originalValue?: boolean;
    updatedValue?: boolean;
    editedById?: boolean;
    timeEntry?: boolean | Prisma.TimeEntryDefaultArgs<ExtArgs>;
    editedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["timeEntryEdit"]>;
export type TimeEntryEditSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    timeEntryId?: boolean;
    field?: boolean;
    originalValue?: boolean;
    updatedValue?: boolean;
    editedById?: boolean;
    timeEntry?: boolean | Prisma.TimeEntryDefaultArgs<ExtArgs>;
    editedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["timeEntryEdit"]>;
export type TimeEntryEditSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    timeEntryId?: boolean;
    field?: boolean;
    originalValue?: boolean;
    updatedValue?: boolean;
    editedById?: boolean;
};
export type TimeEntryEditOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "createdAt" | "timeEntryId" | "field" | "originalValue" | "updatedValue" | "editedById", ExtArgs["result"]["timeEntryEdit"]>;
export type TimeEntryEditInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    timeEntry?: boolean | Prisma.TimeEntryDefaultArgs<ExtArgs>;
    editedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TimeEntryEditIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    timeEntry?: boolean | Prisma.TimeEntryDefaultArgs<ExtArgs>;
    editedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TimeEntryEditIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    timeEntry?: boolean | Prisma.TimeEntryDefaultArgs<ExtArgs>;
    editedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $TimeEntryEditPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TimeEntryEdit";
    objects: {
        timeEntry: Prisma.$TimeEntryPayload<ExtArgs>;
        editedBy: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        createdAt: Date;
        timeEntryId: string;
        field: string;
        originalValue: string | null;
        updatedValue: string | null;
        editedById: string;
    }, ExtArgs["result"]["timeEntryEdit"]>;
    composites: {};
};
export type TimeEntryEditGetPayload<S extends boolean | null | undefined | TimeEntryEditDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TimeEntryEditPayload, S>;
export type TimeEntryEditCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TimeEntryEditFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TimeEntryEditCountAggregateInputType | true;
};
export interface TimeEntryEditDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TimeEntryEdit'];
        meta: {
            name: 'TimeEntryEdit';
        };
    };
    findUnique<T extends TimeEntryEditFindUniqueArgs>(args: Prisma.SelectSubset<T, TimeEntryEditFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TimeEntryEditClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryEditPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TimeEntryEditFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TimeEntryEditFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TimeEntryEditClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryEditPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TimeEntryEditFindFirstArgs>(args?: Prisma.SelectSubset<T, TimeEntryEditFindFirstArgs<ExtArgs>>): Prisma.Prisma__TimeEntryEditClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryEditPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TimeEntryEditFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TimeEntryEditFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TimeEntryEditClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryEditPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TimeEntryEditFindManyArgs>(args?: Prisma.SelectSubset<T, TimeEntryEditFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TimeEntryEditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TimeEntryEditCreateArgs>(args: Prisma.SelectSubset<T, TimeEntryEditCreateArgs<ExtArgs>>): Prisma.Prisma__TimeEntryEditClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryEditPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TimeEntryEditCreateManyArgs>(args?: Prisma.SelectSubset<T, TimeEntryEditCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TimeEntryEditCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TimeEntryEditCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TimeEntryEditPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TimeEntryEditDeleteArgs>(args: Prisma.SelectSubset<T, TimeEntryEditDeleteArgs<ExtArgs>>): Prisma.Prisma__TimeEntryEditClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryEditPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TimeEntryEditUpdateArgs>(args: Prisma.SelectSubset<T, TimeEntryEditUpdateArgs<ExtArgs>>): Prisma.Prisma__TimeEntryEditClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryEditPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TimeEntryEditDeleteManyArgs>(args?: Prisma.SelectSubset<T, TimeEntryEditDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TimeEntryEditUpdateManyArgs>(args: Prisma.SelectSubset<T, TimeEntryEditUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TimeEntryEditUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TimeEntryEditUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TimeEntryEditPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TimeEntryEditUpsertArgs>(args: Prisma.SelectSubset<T, TimeEntryEditUpsertArgs<ExtArgs>>): Prisma.Prisma__TimeEntryEditClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryEditPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TimeEntryEditCountArgs>(args?: Prisma.Subset<T, TimeEntryEditCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TimeEntryEditCountAggregateOutputType> : number>;
    aggregate<T extends TimeEntryEditAggregateArgs>(args: Prisma.Subset<T, TimeEntryEditAggregateArgs>): Prisma.PrismaPromise<GetTimeEntryEditAggregateType<T>>;
    groupBy<T extends TimeEntryEditGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TimeEntryEditGroupByArgs['orderBy'];
    } : {
        orderBy?: TimeEntryEditGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TimeEntryEditGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeEntryEditGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TimeEntryEditFieldRefs;
}
export interface Prisma__TimeEntryEditClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    timeEntry<T extends Prisma.TimeEntryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TimeEntryDefaultArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    editedBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TimeEntryEditFieldRefs {
    readonly id: Prisma.FieldRef<"TimeEntryEdit", 'String'>;
    readonly createdAt: Prisma.FieldRef<"TimeEntryEdit", 'DateTime'>;
    readonly timeEntryId: Prisma.FieldRef<"TimeEntryEdit", 'String'>;
    readonly field: Prisma.FieldRef<"TimeEntryEdit", 'String'>;
    readonly originalValue: Prisma.FieldRef<"TimeEntryEdit", 'String'>;
    readonly updatedValue: Prisma.FieldRef<"TimeEntryEdit", 'String'>;
    readonly editedById: Prisma.FieldRef<"TimeEntryEdit", 'String'>;
}
export type TimeEntryEditFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntryEditSelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryEditOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryEditInclude<ExtArgs> | null;
    where: Prisma.TimeEntryEditWhereUniqueInput;
};
export type TimeEntryEditFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntryEditSelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryEditOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryEditInclude<ExtArgs> | null;
    where: Prisma.TimeEntryEditWhereUniqueInput;
};
export type TimeEntryEditFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TimeEntryEditFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TimeEntryEditFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TimeEntryEditCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntryEditSelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryEditOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryEditInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TimeEntryEditCreateInput, Prisma.TimeEntryEditUncheckedCreateInput>;
};
export type TimeEntryEditCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TimeEntryEditCreateManyInput | Prisma.TimeEntryEditCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TimeEntryEditCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntryEditSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TimeEntryEditOmit<ExtArgs> | null;
    data: Prisma.TimeEntryEditCreateManyInput | Prisma.TimeEntryEditCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TimeEntryEditIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TimeEntryEditUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntryEditSelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryEditOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryEditInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TimeEntryEditUpdateInput, Prisma.TimeEntryEditUncheckedUpdateInput>;
    where: Prisma.TimeEntryEditWhereUniqueInput;
};
export type TimeEntryEditUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TimeEntryEditUpdateManyMutationInput, Prisma.TimeEntryEditUncheckedUpdateManyInput>;
    where?: Prisma.TimeEntryEditWhereInput;
    limit?: number;
};
export type TimeEntryEditUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntryEditSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TimeEntryEditOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TimeEntryEditUpdateManyMutationInput, Prisma.TimeEntryEditUncheckedUpdateManyInput>;
    where?: Prisma.TimeEntryEditWhereInput;
    limit?: number;
    include?: Prisma.TimeEntryEditIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TimeEntryEditUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntryEditSelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryEditOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryEditInclude<ExtArgs> | null;
    where: Prisma.TimeEntryEditWhereUniqueInput;
    create: Prisma.XOR<Prisma.TimeEntryEditCreateInput, Prisma.TimeEntryEditUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TimeEntryEditUpdateInput, Prisma.TimeEntryEditUncheckedUpdateInput>;
};
export type TimeEntryEditDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntryEditSelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryEditOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryEditInclude<ExtArgs> | null;
    where: Prisma.TimeEntryEditWhereUniqueInput;
};
export type TimeEntryEditDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TimeEntryEditWhereInput;
    limit?: number;
};
export type TimeEntryEditDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntryEditSelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryEditOmit<ExtArgs> | null;
    include?: Prisma.TimeEntryEditInclude<ExtArgs> | null;
};
export {};

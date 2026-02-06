import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WorkOrderEquipmentModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkOrderEquipmentPayload>;
export type AggregateWorkOrderEquipment = {
    _count: WorkOrderEquipmentCountAggregateOutputType | null;
    _avg: WorkOrderEquipmentAvgAggregateOutputType | null;
    _sum: WorkOrderEquipmentSumAggregateOutputType | null;
    _min: WorkOrderEquipmentMinAggregateOutputType | null;
    _max: WorkOrderEquipmentMaxAggregateOutputType | null;
};
export type WorkOrderEquipmentAvgAggregateOutputType = {
    quantity: number | null;
    cost: number | null;
};
export type WorkOrderEquipmentSumAggregateOutputType = {
    quantity: number | null;
    cost: number | null;
};
export type WorkOrderEquipmentMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    workOrderId: string | null;
    name: string | null;
    quantity: number | null;
    cost: number | null;
    vendor: string | null;
};
export type WorkOrderEquipmentMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    workOrderId: string | null;
    name: string | null;
    quantity: number | null;
    cost: number | null;
    vendor: string | null;
};
export type WorkOrderEquipmentCountAggregateOutputType = {
    id: number;
    createdAt: number;
    updatedAt: number;
    workOrderId: number;
    name: number;
    quantity: number;
    cost: number;
    vendor: number;
    _all: number;
};
export type WorkOrderEquipmentAvgAggregateInputType = {
    quantity?: true;
    cost?: true;
};
export type WorkOrderEquipmentSumAggregateInputType = {
    quantity?: true;
    cost?: true;
};
export type WorkOrderEquipmentMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    workOrderId?: true;
    name?: true;
    quantity?: true;
    cost?: true;
    vendor?: true;
};
export type WorkOrderEquipmentMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    workOrderId?: true;
    name?: true;
    quantity?: true;
    cost?: true;
    vendor?: true;
};
export type WorkOrderEquipmentCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    workOrderId?: true;
    name?: true;
    quantity?: true;
    cost?: true;
    vendor?: true;
    _all?: true;
};
export type WorkOrderEquipmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderEquipmentWhereInput;
    orderBy?: Prisma.WorkOrderEquipmentOrderByWithRelationInput | Prisma.WorkOrderEquipmentOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderEquipmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WorkOrderEquipmentCountAggregateInputType;
    _avg?: WorkOrderEquipmentAvgAggregateInputType;
    _sum?: WorkOrderEquipmentSumAggregateInputType;
    _min?: WorkOrderEquipmentMinAggregateInputType;
    _max?: WorkOrderEquipmentMaxAggregateInputType;
};
export type GetWorkOrderEquipmentAggregateType<T extends WorkOrderEquipmentAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkOrderEquipment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorkOrderEquipment[P]> : Prisma.GetScalarType<T[P], AggregateWorkOrderEquipment[P]>;
};
export type WorkOrderEquipmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderEquipmentWhereInput;
    orderBy?: Prisma.WorkOrderEquipmentOrderByWithAggregationInput | Prisma.WorkOrderEquipmentOrderByWithAggregationInput[];
    by: Prisma.WorkOrderEquipmentScalarFieldEnum[] | Prisma.WorkOrderEquipmentScalarFieldEnum;
    having?: Prisma.WorkOrderEquipmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkOrderEquipmentCountAggregateInputType | true;
    _avg?: WorkOrderEquipmentAvgAggregateInputType;
    _sum?: WorkOrderEquipmentSumAggregateInputType;
    _min?: WorkOrderEquipmentMinAggregateInputType;
    _max?: WorkOrderEquipmentMaxAggregateInputType;
};
export type WorkOrderEquipmentGroupByOutputType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    workOrderId: string;
    name: string;
    quantity: number;
    cost: number | null;
    vendor: string | null;
    _count: WorkOrderEquipmentCountAggregateOutputType | null;
    _avg: WorkOrderEquipmentAvgAggregateOutputType | null;
    _sum: WorkOrderEquipmentSumAggregateOutputType | null;
    _min: WorkOrderEquipmentMinAggregateOutputType | null;
    _max: WorkOrderEquipmentMaxAggregateOutputType | null;
};
type GetWorkOrderEquipmentGroupByPayload<T extends WorkOrderEquipmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorkOrderEquipmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorkOrderEquipmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorkOrderEquipmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorkOrderEquipmentGroupByOutputType[P]>;
}>>;
export type WorkOrderEquipmentWhereInput = {
    AND?: Prisma.WorkOrderEquipmentWhereInput | Prisma.WorkOrderEquipmentWhereInput[];
    OR?: Prisma.WorkOrderEquipmentWhereInput[];
    NOT?: Prisma.WorkOrderEquipmentWhereInput | Prisma.WorkOrderEquipmentWhereInput[];
    id?: Prisma.StringFilter<"WorkOrderEquipment"> | string;
    createdAt?: Prisma.DateTimeFilter<"WorkOrderEquipment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkOrderEquipment"> | Date | string;
    workOrderId?: Prisma.StringFilter<"WorkOrderEquipment"> | string;
    name?: Prisma.StringFilter<"WorkOrderEquipment"> | string;
    quantity?: Prisma.IntFilter<"WorkOrderEquipment"> | number;
    cost?: Prisma.FloatNullableFilter<"WorkOrderEquipment"> | number | null;
    vendor?: Prisma.StringNullableFilter<"WorkOrderEquipment"> | string | null;
    workOrder?: Prisma.XOR<Prisma.WorkOrderScalarRelationFilter, Prisma.WorkOrderWhereInput>;
};
export type WorkOrderEquipmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    cost?: Prisma.SortOrderInput | Prisma.SortOrder;
    vendor?: Prisma.SortOrderInput | Prisma.SortOrder;
    workOrder?: Prisma.WorkOrderOrderByWithRelationInput;
};
export type WorkOrderEquipmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.WorkOrderEquipmentWhereInput | Prisma.WorkOrderEquipmentWhereInput[];
    OR?: Prisma.WorkOrderEquipmentWhereInput[];
    NOT?: Prisma.WorkOrderEquipmentWhereInput | Prisma.WorkOrderEquipmentWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"WorkOrderEquipment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkOrderEquipment"> | Date | string;
    workOrderId?: Prisma.StringFilter<"WorkOrderEquipment"> | string;
    name?: Prisma.StringFilter<"WorkOrderEquipment"> | string;
    quantity?: Prisma.IntFilter<"WorkOrderEquipment"> | number;
    cost?: Prisma.FloatNullableFilter<"WorkOrderEquipment"> | number | null;
    vendor?: Prisma.StringNullableFilter<"WorkOrderEquipment"> | string | null;
    workOrder?: Prisma.XOR<Prisma.WorkOrderScalarRelationFilter, Prisma.WorkOrderWhereInput>;
}, "id">;
export type WorkOrderEquipmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    cost?: Prisma.SortOrderInput | Prisma.SortOrder;
    vendor?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.WorkOrderEquipmentCountOrderByAggregateInput;
    _avg?: Prisma.WorkOrderEquipmentAvgOrderByAggregateInput;
    _max?: Prisma.WorkOrderEquipmentMaxOrderByAggregateInput;
    _min?: Prisma.WorkOrderEquipmentMinOrderByAggregateInput;
    _sum?: Prisma.WorkOrderEquipmentSumOrderByAggregateInput;
};
export type WorkOrderEquipmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkOrderEquipmentScalarWhereWithAggregatesInput | Prisma.WorkOrderEquipmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkOrderEquipmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkOrderEquipmentScalarWhereWithAggregatesInput | Prisma.WorkOrderEquipmentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WorkOrderEquipment"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WorkOrderEquipment"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"WorkOrderEquipment"> | Date | string;
    workOrderId?: Prisma.StringWithAggregatesFilter<"WorkOrderEquipment"> | string;
    name?: Prisma.StringWithAggregatesFilter<"WorkOrderEquipment"> | string;
    quantity?: Prisma.IntWithAggregatesFilter<"WorkOrderEquipment"> | number;
    cost?: Prisma.FloatNullableWithAggregatesFilter<"WorkOrderEquipment"> | number | null;
    vendor?: Prisma.StringNullableWithAggregatesFilter<"WorkOrderEquipment"> | string | null;
};
export type WorkOrderEquipmentCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    name: string;
    quantity?: number;
    cost?: number | null;
    vendor?: string | null;
    workOrder: Prisma.WorkOrderCreateNestedOneWithoutEquipmentInput;
};
export type WorkOrderEquipmentUncheckedCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workOrderId: string;
    name: string;
    quantity?: number;
    cost?: number | null;
    vendor?: string | null;
};
export type WorkOrderEquipmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    vendor?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    workOrder?: Prisma.WorkOrderUpdateOneRequiredWithoutEquipmentNestedInput;
};
export type WorkOrderEquipmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    vendor?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderEquipmentCreateManyInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workOrderId: string;
    name: string;
    quantity?: number;
    cost?: number | null;
    vendor?: string | null;
};
export type WorkOrderEquipmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    vendor?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderEquipmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    vendor?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderEquipmentListRelationFilter = {
    every?: Prisma.WorkOrderEquipmentWhereInput;
    some?: Prisma.WorkOrderEquipmentWhereInput;
    none?: Prisma.WorkOrderEquipmentWhereInput;
};
export type WorkOrderEquipmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WorkOrderEquipmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    vendor?: Prisma.SortOrder;
};
export type WorkOrderEquipmentAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
};
export type WorkOrderEquipmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    vendor?: Prisma.SortOrder;
};
export type WorkOrderEquipmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    vendor?: Prisma.SortOrder;
};
export type WorkOrderEquipmentSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
};
export type WorkOrderEquipmentCreateNestedManyWithoutWorkOrderInput = {
    create?: Prisma.XOR<Prisma.WorkOrderEquipmentCreateWithoutWorkOrderInput, Prisma.WorkOrderEquipmentUncheckedCreateWithoutWorkOrderInput> | Prisma.WorkOrderEquipmentCreateWithoutWorkOrderInput[] | Prisma.WorkOrderEquipmentUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.WorkOrderEquipmentCreateOrConnectWithoutWorkOrderInput | Prisma.WorkOrderEquipmentCreateOrConnectWithoutWorkOrderInput[];
    createMany?: Prisma.WorkOrderEquipmentCreateManyWorkOrderInputEnvelope;
    connect?: Prisma.WorkOrderEquipmentWhereUniqueInput | Prisma.WorkOrderEquipmentWhereUniqueInput[];
};
export type WorkOrderEquipmentUncheckedCreateNestedManyWithoutWorkOrderInput = {
    create?: Prisma.XOR<Prisma.WorkOrderEquipmentCreateWithoutWorkOrderInput, Prisma.WorkOrderEquipmentUncheckedCreateWithoutWorkOrderInput> | Prisma.WorkOrderEquipmentCreateWithoutWorkOrderInput[] | Prisma.WorkOrderEquipmentUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.WorkOrderEquipmentCreateOrConnectWithoutWorkOrderInput | Prisma.WorkOrderEquipmentCreateOrConnectWithoutWorkOrderInput[];
    createMany?: Prisma.WorkOrderEquipmentCreateManyWorkOrderInputEnvelope;
    connect?: Prisma.WorkOrderEquipmentWhereUniqueInput | Prisma.WorkOrderEquipmentWhereUniqueInput[];
};
export type WorkOrderEquipmentUpdateManyWithoutWorkOrderNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderEquipmentCreateWithoutWorkOrderInput, Prisma.WorkOrderEquipmentUncheckedCreateWithoutWorkOrderInput> | Prisma.WorkOrderEquipmentCreateWithoutWorkOrderInput[] | Prisma.WorkOrderEquipmentUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.WorkOrderEquipmentCreateOrConnectWithoutWorkOrderInput | Prisma.WorkOrderEquipmentCreateOrConnectWithoutWorkOrderInput[];
    upsert?: Prisma.WorkOrderEquipmentUpsertWithWhereUniqueWithoutWorkOrderInput | Prisma.WorkOrderEquipmentUpsertWithWhereUniqueWithoutWorkOrderInput[];
    createMany?: Prisma.WorkOrderEquipmentCreateManyWorkOrderInputEnvelope;
    set?: Prisma.WorkOrderEquipmentWhereUniqueInput | Prisma.WorkOrderEquipmentWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderEquipmentWhereUniqueInput | Prisma.WorkOrderEquipmentWhereUniqueInput[];
    delete?: Prisma.WorkOrderEquipmentWhereUniqueInput | Prisma.WorkOrderEquipmentWhereUniqueInput[];
    connect?: Prisma.WorkOrderEquipmentWhereUniqueInput | Prisma.WorkOrderEquipmentWhereUniqueInput[];
    update?: Prisma.WorkOrderEquipmentUpdateWithWhereUniqueWithoutWorkOrderInput | Prisma.WorkOrderEquipmentUpdateWithWhereUniqueWithoutWorkOrderInput[];
    updateMany?: Prisma.WorkOrderEquipmentUpdateManyWithWhereWithoutWorkOrderInput | Prisma.WorkOrderEquipmentUpdateManyWithWhereWithoutWorkOrderInput[];
    deleteMany?: Prisma.WorkOrderEquipmentScalarWhereInput | Prisma.WorkOrderEquipmentScalarWhereInput[];
};
export type WorkOrderEquipmentUncheckedUpdateManyWithoutWorkOrderNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderEquipmentCreateWithoutWorkOrderInput, Prisma.WorkOrderEquipmentUncheckedCreateWithoutWorkOrderInput> | Prisma.WorkOrderEquipmentCreateWithoutWorkOrderInput[] | Prisma.WorkOrderEquipmentUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.WorkOrderEquipmentCreateOrConnectWithoutWorkOrderInput | Prisma.WorkOrderEquipmentCreateOrConnectWithoutWorkOrderInput[];
    upsert?: Prisma.WorkOrderEquipmentUpsertWithWhereUniqueWithoutWorkOrderInput | Prisma.WorkOrderEquipmentUpsertWithWhereUniqueWithoutWorkOrderInput[];
    createMany?: Prisma.WorkOrderEquipmentCreateManyWorkOrderInputEnvelope;
    set?: Prisma.WorkOrderEquipmentWhereUniqueInput | Prisma.WorkOrderEquipmentWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderEquipmentWhereUniqueInput | Prisma.WorkOrderEquipmentWhereUniqueInput[];
    delete?: Prisma.WorkOrderEquipmentWhereUniqueInput | Prisma.WorkOrderEquipmentWhereUniqueInput[];
    connect?: Prisma.WorkOrderEquipmentWhereUniqueInput | Prisma.WorkOrderEquipmentWhereUniqueInput[];
    update?: Prisma.WorkOrderEquipmentUpdateWithWhereUniqueWithoutWorkOrderInput | Prisma.WorkOrderEquipmentUpdateWithWhereUniqueWithoutWorkOrderInput[];
    updateMany?: Prisma.WorkOrderEquipmentUpdateManyWithWhereWithoutWorkOrderInput | Prisma.WorkOrderEquipmentUpdateManyWithWhereWithoutWorkOrderInput[];
    deleteMany?: Prisma.WorkOrderEquipmentScalarWhereInput | Prisma.WorkOrderEquipmentScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type WorkOrderEquipmentCreateWithoutWorkOrderInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    name: string;
    quantity?: number;
    cost?: number | null;
    vendor?: string | null;
};
export type WorkOrderEquipmentUncheckedCreateWithoutWorkOrderInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    name: string;
    quantity?: number;
    cost?: number | null;
    vendor?: string | null;
};
export type WorkOrderEquipmentCreateOrConnectWithoutWorkOrderInput = {
    where: Prisma.WorkOrderEquipmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderEquipmentCreateWithoutWorkOrderInput, Prisma.WorkOrderEquipmentUncheckedCreateWithoutWorkOrderInput>;
};
export type WorkOrderEquipmentCreateManyWorkOrderInputEnvelope = {
    data: Prisma.WorkOrderEquipmentCreateManyWorkOrderInput | Prisma.WorkOrderEquipmentCreateManyWorkOrderInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderEquipmentUpsertWithWhereUniqueWithoutWorkOrderInput = {
    where: Prisma.WorkOrderEquipmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderEquipmentUpdateWithoutWorkOrderInput, Prisma.WorkOrderEquipmentUncheckedUpdateWithoutWorkOrderInput>;
    create: Prisma.XOR<Prisma.WorkOrderEquipmentCreateWithoutWorkOrderInput, Prisma.WorkOrderEquipmentUncheckedCreateWithoutWorkOrderInput>;
};
export type WorkOrderEquipmentUpdateWithWhereUniqueWithoutWorkOrderInput = {
    where: Prisma.WorkOrderEquipmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderEquipmentUpdateWithoutWorkOrderInput, Prisma.WorkOrderEquipmentUncheckedUpdateWithoutWorkOrderInput>;
};
export type WorkOrderEquipmentUpdateManyWithWhereWithoutWorkOrderInput = {
    where: Prisma.WorkOrderEquipmentScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderEquipmentUpdateManyMutationInput, Prisma.WorkOrderEquipmentUncheckedUpdateManyWithoutWorkOrderInput>;
};
export type WorkOrderEquipmentScalarWhereInput = {
    AND?: Prisma.WorkOrderEquipmentScalarWhereInput | Prisma.WorkOrderEquipmentScalarWhereInput[];
    OR?: Prisma.WorkOrderEquipmentScalarWhereInput[];
    NOT?: Prisma.WorkOrderEquipmentScalarWhereInput | Prisma.WorkOrderEquipmentScalarWhereInput[];
    id?: Prisma.StringFilter<"WorkOrderEquipment"> | string;
    createdAt?: Prisma.DateTimeFilter<"WorkOrderEquipment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkOrderEquipment"> | Date | string;
    workOrderId?: Prisma.StringFilter<"WorkOrderEquipment"> | string;
    name?: Prisma.StringFilter<"WorkOrderEquipment"> | string;
    quantity?: Prisma.IntFilter<"WorkOrderEquipment"> | number;
    cost?: Prisma.FloatNullableFilter<"WorkOrderEquipment"> | number | null;
    vendor?: Prisma.StringNullableFilter<"WorkOrderEquipment"> | string | null;
};
export type WorkOrderEquipmentCreateManyWorkOrderInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    name: string;
    quantity?: number;
    cost?: number | null;
    vendor?: string | null;
};
export type WorkOrderEquipmentUpdateWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    vendor?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderEquipmentUncheckedUpdateWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    vendor?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderEquipmentUncheckedUpdateManyWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    cost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    vendor?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderEquipmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workOrderId?: boolean;
    name?: boolean;
    quantity?: boolean;
    cost?: boolean;
    vendor?: boolean;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workOrderEquipment"]>;
export type WorkOrderEquipmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workOrderId?: boolean;
    name?: boolean;
    quantity?: boolean;
    cost?: boolean;
    vendor?: boolean;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workOrderEquipment"]>;
export type WorkOrderEquipmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workOrderId?: boolean;
    name?: boolean;
    quantity?: boolean;
    cost?: boolean;
    vendor?: boolean;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workOrderEquipment"]>;
export type WorkOrderEquipmentSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workOrderId?: boolean;
    name?: boolean;
    quantity?: boolean;
    cost?: boolean;
    vendor?: boolean;
};
export type WorkOrderEquipmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "workOrderId" | "name" | "quantity" | "cost" | "vendor", ExtArgs["result"]["workOrderEquipment"]>;
export type WorkOrderEquipmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
};
export type WorkOrderEquipmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
};
export type WorkOrderEquipmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
};
export type $WorkOrderEquipmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WorkOrderEquipment";
    objects: {
        workOrder: Prisma.$WorkOrderPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        workOrderId: string;
        name: string;
        quantity: number;
        cost: number | null;
        vendor: string | null;
    }, ExtArgs["result"]["workOrderEquipment"]>;
    composites: {};
};
export type WorkOrderEquipmentGetPayload<S extends boolean | null | undefined | WorkOrderEquipmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkOrderEquipmentPayload, S>;
export type WorkOrderEquipmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorkOrderEquipmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkOrderEquipmentCountAggregateInputType | true;
};
export interface WorkOrderEquipmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WorkOrderEquipment'];
        meta: {
            name: 'WorkOrderEquipment';
        };
    };
    findUnique<T extends WorkOrderEquipmentFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkOrderEquipmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkOrderEquipmentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderEquipmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WorkOrderEquipmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkOrderEquipmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkOrderEquipmentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderEquipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WorkOrderEquipmentFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkOrderEquipmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkOrderEquipmentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderEquipmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WorkOrderEquipmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkOrderEquipmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkOrderEquipmentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderEquipmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WorkOrderEquipmentFindManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderEquipmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderEquipmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WorkOrderEquipmentCreateArgs>(args: Prisma.SelectSubset<T, WorkOrderEquipmentCreateArgs<ExtArgs>>): Prisma.Prisma__WorkOrderEquipmentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderEquipmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WorkOrderEquipmentCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderEquipmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WorkOrderEquipmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorkOrderEquipmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderEquipmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WorkOrderEquipmentDeleteArgs>(args: Prisma.SelectSubset<T, WorkOrderEquipmentDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkOrderEquipmentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderEquipmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WorkOrderEquipmentUpdateArgs>(args: Prisma.SelectSubset<T, WorkOrderEquipmentUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkOrderEquipmentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderEquipmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WorkOrderEquipmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderEquipmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WorkOrderEquipmentUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkOrderEquipmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WorkOrderEquipmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorkOrderEquipmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderEquipmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WorkOrderEquipmentUpsertArgs>(args: Prisma.SelectSubset<T, WorkOrderEquipmentUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkOrderEquipmentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderEquipmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WorkOrderEquipmentCountArgs>(args?: Prisma.Subset<T, WorkOrderEquipmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorkOrderEquipmentCountAggregateOutputType> : number>;
    aggregate<T extends WorkOrderEquipmentAggregateArgs>(args: Prisma.Subset<T, WorkOrderEquipmentAggregateArgs>): Prisma.PrismaPromise<GetWorkOrderEquipmentAggregateType<T>>;
    groupBy<T extends WorkOrderEquipmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorkOrderEquipmentGroupByArgs['orderBy'];
    } : {
        orderBy?: WorkOrderEquipmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorkOrderEquipmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkOrderEquipmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WorkOrderEquipmentFieldRefs;
}
export interface Prisma__WorkOrderEquipmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    workOrder<T extends Prisma.WorkOrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrderDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WorkOrderEquipmentFieldRefs {
    readonly id: Prisma.FieldRef<"WorkOrderEquipment", 'String'>;
    readonly createdAt: Prisma.FieldRef<"WorkOrderEquipment", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"WorkOrderEquipment", 'DateTime'>;
    readonly workOrderId: Prisma.FieldRef<"WorkOrderEquipment", 'String'>;
    readonly name: Prisma.FieldRef<"WorkOrderEquipment", 'String'>;
    readonly quantity: Prisma.FieldRef<"WorkOrderEquipment", 'Int'>;
    readonly cost: Prisma.FieldRef<"WorkOrderEquipment", 'Float'>;
    readonly vendor: Prisma.FieldRef<"WorkOrderEquipment", 'String'>;
}
export type WorkOrderEquipmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderEquipmentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderEquipmentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderEquipmentInclude<ExtArgs> | null;
    where: Prisma.WorkOrderEquipmentWhereUniqueInput;
};
export type WorkOrderEquipmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderEquipmentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderEquipmentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderEquipmentInclude<ExtArgs> | null;
    where: Prisma.WorkOrderEquipmentWhereUniqueInput;
};
export type WorkOrderEquipmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderEquipmentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderEquipmentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderEquipmentInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderEquipmentWhereInput;
    orderBy?: Prisma.WorkOrderEquipmentOrderByWithRelationInput | Prisma.WorkOrderEquipmentOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderEquipmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderEquipmentScalarFieldEnum | Prisma.WorkOrderEquipmentScalarFieldEnum[];
};
export type WorkOrderEquipmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderEquipmentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderEquipmentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderEquipmentInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderEquipmentWhereInput;
    orderBy?: Prisma.WorkOrderEquipmentOrderByWithRelationInput | Prisma.WorkOrderEquipmentOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderEquipmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderEquipmentScalarFieldEnum | Prisma.WorkOrderEquipmentScalarFieldEnum[];
};
export type WorkOrderEquipmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderEquipmentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderEquipmentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderEquipmentInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderEquipmentWhereInput;
    orderBy?: Prisma.WorkOrderEquipmentOrderByWithRelationInput | Prisma.WorkOrderEquipmentOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderEquipmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderEquipmentScalarFieldEnum | Prisma.WorkOrderEquipmentScalarFieldEnum[];
};
export type WorkOrderEquipmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderEquipmentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderEquipmentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderEquipmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkOrderEquipmentCreateInput, Prisma.WorkOrderEquipmentUncheckedCreateInput>;
};
export type WorkOrderEquipmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WorkOrderEquipmentCreateManyInput | Prisma.WorkOrderEquipmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderEquipmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderEquipmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkOrderEquipmentOmit<ExtArgs> | null;
    data: Prisma.WorkOrderEquipmentCreateManyInput | Prisma.WorkOrderEquipmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WorkOrderEquipmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WorkOrderEquipmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderEquipmentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderEquipmentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderEquipmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkOrderEquipmentUpdateInput, Prisma.WorkOrderEquipmentUncheckedUpdateInput>;
    where: Prisma.WorkOrderEquipmentWhereUniqueInput;
};
export type WorkOrderEquipmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WorkOrderEquipmentUpdateManyMutationInput, Prisma.WorkOrderEquipmentUncheckedUpdateManyInput>;
    where?: Prisma.WorkOrderEquipmentWhereInput;
    limit?: number;
};
export type WorkOrderEquipmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderEquipmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkOrderEquipmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkOrderEquipmentUpdateManyMutationInput, Prisma.WorkOrderEquipmentUncheckedUpdateManyInput>;
    where?: Prisma.WorkOrderEquipmentWhereInput;
    limit?: number;
    include?: Prisma.WorkOrderEquipmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WorkOrderEquipmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderEquipmentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderEquipmentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderEquipmentInclude<ExtArgs> | null;
    where: Prisma.WorkOrderEquipmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderEquipmentCreateInput, Prisma.WorkOrderEquipmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WorkOrderEquipmentUpdateInput, Prisma.WorkOrderEquipmentUncheckedUpdateInput>;
};
export type WorkOrderEquipmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderEquipmentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderEquipmentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderEquipmentInclude<ExtArgs> | null;
    where: Prisma.WorkOrderEquipmentWhereUniqueInput;
};
export type WorkOrderEquipmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderEquipmentWhereInput;
    limit?: number;
};
export type WorkOrderEquipmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderEquipmentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderEquipmentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderEquipmentInclude<ExtArgs> | null;
};
export {};

import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WorkOrderTemplateModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkOrderTemplatePayload>;
export type AggregateWorkOrderTemplate = {
    _count: WorkOrderTemplateCountAggregateOutputType | null;
    _min: WorkOrderTemplateMinAggregateOutputType | null;
    _max: WorkOrderTemplateMaxAggregateOutputType | null;
};
export type WorkOrderTemplateMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    name: string | null;
    tasks: string | null;
    notes: string | null;
};
export type WorkOrderTemplateMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    name: string | null;
    tasks: string | null;
    notes: string | null;
};
export type WorkOrderTemplateCountAggregateOutputType = {
    id: number;
    createdAt: number;
    updatedAt: number;
    name: number;
    tasks: number;
    notes: number;
    _all: number;
};
export type WorkOrderTemplateMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    name?: true;
    tasks?: true;
    notes?: true;
};
export type WorkOrderTemplateMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    name?: true;
    tasks?: true;
    notes?: true;
};
export type WorkOrderTemplateCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    name?: true;
    tasks?: true;
    notes?: true;
    _all?: true;
};
export type WorkOrderTemplateAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderTemplateWhereInput;
    orderBy?: Prisma.WorkOrderTemplateOrderByWithRelationInput | Prisma.WorkOrderTemplateOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderTemplateWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WorkOrderTemplateCountAggregateInputType;
    _min?: WorkOrderTemplateMinAggregateInputType;
    _max?: WorkOrderTemplateMaxAggregateInputType;
};
export type GetWorkOrderTemplateAggregateType<T extends WorkOrderTemplateAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkOrderTemplate]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorkOrderTemplate[P]> : Prisma.GetScalarType<T[P], AggregateWorkOrderTemplate[P]>;
};
export type WorkOrderTemplateGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderTemplateWhereInput;
    orderBy?: Prisma.WorkOrderTemplateOrderByWithAggregationInput | Prisma.WorkOrderTemplateOrderByWithAggregationInput[];
    by: Prisma.WorkOrderTemplateScalarFieldEnum[] | Prisma.WorkOrderTemplateScalarFieldEnum;
    having?: Prisma.WorkOrderTemplateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkOrderTemplateCountAggregateInputType | true;
    _min?: WorkOrderTemplateMinAggregateInputType;
    _max?: WorkOrderTemplateMaxAggregateInputType;
};
export type WorkOrderTemplateGroupByOutputType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    tasks: string | null;
    notes: string | null;
    _count: WorkOrderTemplateCountAggregateOutputType | null;
    _min: WorkOrderTemplateMinAggregateOutputType | null;
    _max: WorkOrderTemplateMaxAggregateOutputType | null;
};
type GetWorkOrderTemplateGroupByPayload<T extends WorkOrderTemplateGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorkOrderTemplateGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorkOrderTemplateGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorkOrderTemplateGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorkOrderTemplateGroupByOutputType[P]>;
}>>;
export type WorkOrderTemplateWhereInput = {
    AND?: Prisma.WorkOrderTemplateWhereInput | Prisma.WorkOrderTemplateWhereInput[];
    OR?: Prisma.WorkOrderTemplateWhereInput[];
    NOT?: Prisma.WorkOrderTemplateWhereInput | Prisma.WorkOrderTemplateWhereInput[];
    id?: Prisma.StringFilter<"WorkOrderTemplate"> | string;
    createdAt?: Prisma.DateTimeFilter<"WorkOrderTemplate"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkOrderTemplate"> | Date | string;
    name?: Prisma.StringFilter<"WorkOrderTemplate"> | string;
    tasks?: Prisma.StringNullableFilter<"WorkOrderTemplate"> | string | null;
    notes?: Prisma.StringNullableFilter<"WorkOrderTemplate"> | string | null;
    workOrders?: Prisma.WorkOrderListRelationFilter;
};
export type WorkOrderTemplateOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tasks?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    workOrders?: Prisma.WorkOrderOrderByRelationAggregateInput;
};
export type WorkOrderTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.WorkOrderTemplateWhereInput | Prisma.WorkOrderTemplateWhereInput[];
    OR?: Prisma.WorkOrderTemplateWhereInput[];
    NOT?: Prisma.WorkOrderTemplateWhereInput | Prisma.WorkOrderTemplateWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"WorkOrderTemplate"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkOrderTemplate"> | Date | string;
    name?: Prisma.StringFilter<"WorkOrderTemplate"> | string;
    tasks?: Prisma.StringNullableFilter<"WorkOrderTemplate"> | string | null;
    notes?: Prisma.StringNullableFilter<"WorkOrderTemplate"> | string | null;
    workOrders?: Prisma.WorkOrderListRelationFilter;
}, "id">;
export type WorkOrderTemplateOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tasks?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.WorkOrderTemplateCountOrderByAggregateInput;
    _max?: Prisma.WorkOrderTemplateMaxOrderByAggregateInput;
    _min?: Prisma.WorkOrderTemplateMinOrderByAggregateInput;
};
export type WorkOrderTemplateScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkOrderTemplateScalarWhereWithAggregatesInput | Prisma.WorkOrderTemplateScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkOrderTemplateScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkOrderTemplateScalarWhereWithAggregatesInput | Prisma.WorkOrderTemplateScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WorkOrderTemplate"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WorkOrderTemplate"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"WorkOrderTemplate"> | Date | string;
    name?: Prisma.StringWithAggregatesFilter<"WorkOrderTemplate"> | string;
    tasks?: Prisma.StringNullableWithAggregatesFilter<"WorkOrderTemplate"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"WorkOrderTemplate"> | string | null;
};
export type WorkOrderTemplateCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    name: string;
    tasks?: string | null;
    notes?: string | null;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutTemplateInput;
};
export type WorkOrderTemplateUncheckedCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    name: string;
    tasks?: string | null;
    notes?: string | null;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutTemplateInput;
};
export type WorkOrderTemplateUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tasks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutTemplateNestedInput;
};
export type WorkOrderTemplateUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tasks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutTemplateNestedInput;
};
export type WorkOrderTemplateCreateManyInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    name: string;
    tasks?: string | null;
    notes?: string | null;
};
export type WorkOrderTemplateUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tasks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderTemplateUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tasks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderTemplateCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tasks?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
};
export type WorkOrderTemplateMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tasks?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
};
export type WorkOrderTemplateMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tasks?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
};
export type WorkOrderTemplateNullableScalarRelationFilter = {
    is?: Prisma.WorkOrderTemplateWhereInput | null;
    isNot?: Prisma.WorkOrderTemplateWhereInput | null;
};
export type WorkOrderTemplateCreateNestedOneWithoutWorkOrdersInput = {
    create?: Prisma.XOR<Prisma.WorkOrderTemplateCreateWithoutWorkOrdersInput, Prisma.WorkOrderTemplateUncheckedCreateWithoutWorkOrdersInput>;
    connectOrCreate?: Prisma.WorkOrderTemplateCreateOrConnectWithoutWorkOrdersInput;
    connect?: Prisma.WorkOrderTemplateWhereUniqueInput;
};
export type WorkOrderTemplateUpdateOneWithoutWorkOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderTemplateCreateWithoutWorkOrdersInput, Prisma.WorkOrderTemplateUncheckedCreateWithoutWorkOrdersInput>;
    connectOrCreate?: Prisma.WorkOrderTemplateCreateOrConnectWithoutWorkOrdersInput;
    upsert?: Prisma.WorkOrderTemplateUpsertWithoutWorkOrdersInput;
    disconnect?: Prisma.WorkOrderTemplateWhereInput | boolean;
    delete?: Prisma.WorkOrderTemplateWhereInput | boolean;
    connect?: Prisma.WorkOrderTemplateWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkOrderTemplateUpdateToOneWithWhereWithoutWorkOrdersInput, Prisma.WorkOrderTemplateUpdateWithoutWorkOrdersInput>, Prisma.WorkOrderTemplateUncheckedUpdateWithoutWorkOrdersInput>;
};
export type WorkOrderTemplateCreateWithoutWorkOrdersInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    name: string;
    tasks?: string | null;
    notes?: string | null;
};
export type WorkOrderTemplateUncheckedCreateWithoutWorkOrdersInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    name: string;
    tasks?: string | null;
    notes?: string | null;
};
export type WorkOrderTemplateCreateOrConnectWithoutWorkOrdersInput = {
    where: Prisma.WorkOrderTemplateWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderTemplateCreateWithoutWorkOrdersInput, Prisma.WorkOrderTemplateUncheckedCreateWithoutWorkOrdersInput>;
};
export type WorkOrderTemplateUpsertWithoutWorkOrdersInput = {
    update: Prisma.XOR<Prisma.WorkOrderTemplateUpdateWithoutWorkOrdersInput, Prisma.WorkOrderTemplateUncheckedUpdateWithoutWorkOrdersInput>;
    create: Prisma.XOR<Prisma.WorkOrderTemplateCreateWithoutWorkOrdersInput, Prisma.WorkOrderTemplateUncheckedCreateWithoutWorkOrdersInput>;
    where?: Prisma.WorkOrderTemplateWhereInput;
};
export type WorkOrderTemplateUpdateToOneWithWhereWithoutWorkOrdersInput = {
    where?: Prisma.WorkOrderTemplateWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderTemplateUpdateWithoutWorkOrdersInput, Prisma.WorkOrderTemplateUncheckedUpdateWithoutWorkOrdersInput>;
};
export type WorkOrderTemplateUpdateWithoutWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tasks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderTemplateUncheckedUpdateWithoutWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tasks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderTemplateCountOutputType = {
    workOrders: number;
};
export type WorkOrderTemplateCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workOrders?: boolean | WorkOrderTemplateCountOutputTypeCountWorkOrdersArgs;
};
export type WorkOrderTemplateCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderTemplateCountOutputTypeSelect<ExtArgs> | null;
};
export type WorkOrderTemplateCountOutputTypeCountWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
};
export type WorkOrderTemplateSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    name?: boolean;
    tasks?: boolean;
    notes?: boolean;
    workOrders?: boolean | Prisma.WorkOrderTemplate$workOrdersArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkOrderTemplateCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workOrderTemplate"]>;
export type WorkOrderTemplateSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    name?: boolean;
    tasks?: boolean;
    notes?: boolean;
}, ExtArgs["result"]["workOrderTemplate"]>;
export type WorkOrderTemplateSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    name?: boolean;
    tasks?: boolean;
    notes?: boolean;
}, ExtArgs["result"]["workOrderTemplate"]>;
export type WorkOrderTemplateSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    name?: boolean;
    tasks?: boolean;
    notes?: boolean;
};
export type WorkOrderTemplateOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "name" | "tasks" | "notes", ExtArgs["result"]["workOrderTemplate"]>;
export type WorkOrderTemplateInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workOrders?: boolean | Prisma.WorkOrderTemplate$workOrdersArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkOrderTemplateCountOutputTypeDefaultArgs<ExtArgs>;
};
export type WorkOrderTemplateIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type WorkOrderTemplateIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $WorkOrderTemplatePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WorkOrderTemplate";
    objects: {
        workOrders: Prisma.$WorkOrderPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        tasks: string | null;
        notes: string | null;
    }, ExtArgs["result"]["workOrderTemplate"]>;
    composites: {};
};
export type WorkOrderTemplateGetPayload<S extends boolean | null | undefined | WorkOrderTemplateDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkOrderTemplatePayload, S>;
export type WorkOrderTemplateCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorkOrderTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkOrderTemplateCountAggregateInputType | true;
};
export interface WorkOrderTemplateDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WorkOrderTemplate'];
        meta: {
            name: 'WorkOrderTemplate';
        };
    };
    findUnique<T extends WorkOrderTemplateFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkOrderTemplateFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkOrderTemplateClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WorkOrderTemplateFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkOrderTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkOrderTemplateClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WorkOrderTemplateFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkOrderTemplateFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkOrderTemplateClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WorkOrderTemplateFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkOrderTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkOrderTemplateClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WorkOrderTemplateFindManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WorkOrderTemplateCreateArgs>(args: Prisma.SelectSubset<T, WorkOrderTemplateCreateArgs<ExtArgs>>): Prisma.Prisma__WorkOrderTemplateClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WorkOrderTemplateCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WorkOrderTemplateCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorkOrderTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WorkOrderTemplateDeleteArgs>(args: Prisma.SelectSubset<T, WorkOrderTemplateDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkOrderTemplateClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WorkOrderTemplateUpdateArgs>(args: Prisma.SelectSubset<T, WorkOrderTemplateUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkOrderTemplateClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WorkOrderTemplateDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WorkOrderTemplateUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkOrderTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WorkOrderTemplateUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorkOrderTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WorkOrderTemplateUpsertArgs>(args: Prisma.SelectSubset<T, WorkOrderTemplateUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkOrderTemplateClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WorkOrderTemplateCountArgs>(args?: Prisma.Subset<T, WorkOrderTemplateCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorkOrderTemplateCountAggregateOutputType> : number>;
    aggregate<T extends WorkOrderTemplateAggregateArgs>(args: Prisma.Subset<T, WorkOrderTemplateAggregateArgs>): Prisma.PrismaPromise<GetWorkOrderTemplateAggregateType<T>>;
    groupBy<T extends WorkOrderTemplateGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorkOrderTemplateGroupByArgs['orderBy'];
    } : {
        orderBy?: WorkOrderTemplateGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorkOrderTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkOrderTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WorkOrderTemplateFieldRefs;
}
export interface Prisma__WorkOrderTemplateClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    workOrders<T extends Prisma.WorkOrderTemplate$workOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrderTemplate$workOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WorkOrderTemplateFieldRefs {
    readonly id: Prisma.FieldRef<"WorkOrderTemplate", 'String'>;
    readonly createdAt: Prisma.FieldRef<"WorkOrderTemplate", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"WorkOrderTemplate", 'DateTime'>;
    readonly name: Prisma.FieldRef<"WorkOrderTemplate", 'String'>;
    readonly tasks: Prisma.FieldRef<"WorkOrderTemplate", 'String'>;
    readonly notes: Prisma.FieldRef<"WorkOrderTemplate", 'String'>;
}
export type WorkOrderTemplateFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderTemplateSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderTemplateOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderTemplateInclude<ExtArgs> | null;
    where: Prisma.WorkOrderTemplateWhereUniqueInput;
};
export type WorkOrderTemplateFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderTemplateSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderTemplateOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderTemplateInclude<ExtArgs> | null;
    where: Prisma.WorkOrderTemplateWhereUniqueInput;
};
export type WorkOrderTemplateFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderTemplateSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderTemplateOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderTemplateInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderTemplateWhereInput;
    orderBy?: Prisma.WorkOrderTemplateOrderByWithRelationInput | Prisma.WorkOrderTemplateOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderTemplateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderTemplateScalarFieldEnum | Prisma.WorkOrderTemplateScalarFieldEnum[];
};
export type WorkOrderTemplateFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderTemplateSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderTemplateOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderTemplateInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderTemplateWhereInput;
    orderBy?: Prisma.WorkOrderTemplateOrderByWithRelationInput | Prisma.WorkOrderTemplateOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderTemplateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderTemplateScalarFieldEnum | Prisma.WorkOrderTemplateScalarFieldEnum[];
};
export type WorkOrderTemplateFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderTemplateSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderTemplateOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderTemplateInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderTemplateWhereInput;
    orderBy?: Prisma.WorkOrderTemplateOrderByWithRelationInput | Prisma.WorkOrderTemplateOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderTemplateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderTemplateScalarFieldEnum | Prisma.WorkOrderTemplateScalarFieldEnum[];
};
export type WorkOrderTemplateCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderTemplateSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderTemplateOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderTemplateInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkOrderTemplateCreateInput, Prisma.WorkOrderTemplateUncheckedCreateInput>;
};
export type WorkOrderTemplateCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WorkOrderTemplateCreateManyInput | Prisma.WorkOrderTemplateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderTemplateCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderTemplateSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkOrderTemplateOmit<ExtArgs> | null;
    data: Prisma.WorkOrderTemplateCreateManyInput | Prisma.WorkOrderTemplateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderTemplateUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderTemplateSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderTemplateOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderTemplateInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkOrderTemplateUpdateInput, Prisma.WorkOrderTemplateUncheckedUpdateInput>;
    where: Prisma.WorkOrderTemplateWhereUniqueInput;
};
export type WorkOrderTemplateUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WorkOrderTemplateUpdateManyMutationInput, Prisma.WorkOrderTemplateUncheckedUpdateManyInput>;
    where?: Prisma.WorkOrderTemplateWhereInput;
    limit?: number;
};
export type WorkOrderTemplateUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderTemplateSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkOrderTemplateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkOrderTemplateUpdateManyMutationInput, Prisma.WorkOrderTemplateUncheckedUpdateManyInput>;
    where?: Prisma.WorkOrderTemplateWhereInput;
    limit?: number;
};
export type WorkOrderTemplateUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderTemplateSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderTemplateOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderTemplateInclude<ExtArgs> | null;
    where: Prisma.WorkOrderTemplateWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderTemplateCreateInput, Prisma.WorkOrderTemplateUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WorkOrderTemplateUpdateInput, Prisma.WorkOrderTemplateUncheckedUpdateInput>;
};
export type WorkOrderTemplateDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderTemplateSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderTemplateOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderTemplateInclude<ExtArgs> | null;
    where: Prisma.WorkOrderTemplateWhereUniqueInput;
};
export type WorkOrderTemplateDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderTemplateWhereInput;
    limit?: number;
};
export type WorkOrderTemplate$workOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderWhereInput;
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
export type WorkOrderTemplateDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderTemplateSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderTemplateOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderTemplateInclude<ExtArgs> | null;
};
export {};

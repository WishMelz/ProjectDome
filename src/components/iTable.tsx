import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { IColumnProp, headerCellStyle } from '@/serviceType'

@Component({
    components: {},
})
export default class HTable extends Vue {
    @Prop() private data!: Array<IColumnProp> //表格显示的数据
    @Prop() private columns!: Array<IColumnProp> //列属性
    @Prop() private loading!: boolean //加载
    @Prop() private columnFormatter!: Function //格式化内容的函数
    @Prop() private selectionKey!: string //决定selectionChange多选事件后的返回值，没有此参数则返回整个对象
    @Prop() private align!: string
    @Prop() private rowKey?: string //行数据的 Key.在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问
    @Prop() private expandRowKeys?: any
    @Prop() private showSummary!: boolean //是否显示统计
    @Prop() private selectionedRows?: any[] //如果此项有值 multipleKey必填
    @Prop() private multipleKey!: string //用来匹配默认选中的key
    @Prop() private filterChange?: Function //筛选函数
    @Prop() private height?: string //表格高度
    @Prop() private spanMethod?: Function //合并行或列的计算方法  Function({ row, column, rowIndex, columnIndex })
    @Prop({ default: false }) private border!: boolean
    $refs!: {
        table: HTMLFormElement
    }
    ref = 'table'
    /**
     * @description 将多选的结果传递给父组件。TSX写法 为onSelectionChange
     */
    @Emit('selectionChange')
    handleSelectionChange(val: any) {
        if (this.selectionKey) {
            const arr = val.map((item: any) => {
                return item[this.selectionKey]
            })
            this.toggleRowSelection(arr)
            return arr
        }
        this.toggleRowSelection(val)
        return val
    }
    @Watch('data', { immediate: true, deep: true })
    selectionedRowsHandle(newVal: any, oldVal: any) {
        if (newVal) {
            if (this.multipleKey && this.selectionedRows) {
                const selectionedKeyList = this.selectionedRows.map(
                    (selection: any) => selection[this.multipleKey],
                )
                this.$nextTick(() => {
                    this.data.forEach((item: any) => {
                        if (
                            selectionedKeyList.includes(item[this.multipleKey])
                        ) {
                            this.$refs.table.toggleRowSelection(item, true)
                        }
                    })
                })
            }
        }
    }
    @Emit('toggleRowSelection')
    toggleRowSelection(val: any) {}
    @Watch('expandRowKeys')
    onExpandRowKeysChange(val: any) {
        if (val?.length) {
            this.$nextTick(() => {
                this.expandAll()
            })
        }
    }

    expandAll() {
        const els: any = document.getElementsByClassName(
            'el-table__expand-icon',
        )
        for (let i = 0; i < els.length; i++) {
            els[i].click()
        }
    }

    renderColumn(columns: Array<IColumnProp>) {
        let res = columns.map((item: IColumnProp) => {
            if (item.type) {
                //有多选的
                return (
                    <el-table-column
                        type={item.type}
                        index={item.index}
                        label={item.label}
                        width="55"
                    ></el-table-column>
                )
            }
            if (item.children) {
                //嵌套表格
                const childrenColumns = this.renderColumn(item.children)
                return (
                    <el-table-column
                        fixed={item.fixed}
                        label={item.label}
                        width={item.width}
                        prop={item.prop}
                        formatter={this.columnFormatter}
                        show-overflow-tooltip={item.showTooltip}
                        align={this.align ? this.align : ''}
                    >
                        {childrenColumns}
                    </el-table-column>
                )
            } else {
                return (
                    <el-table-column
                        fixed={item.fixed}
                        label={item.label}
                        width={item.width}
                        prop={item.prop}
                        sortable={item.sortable}
                        formatter={this.columnFormatter}
                        show-overflow-tooltip={item.showTooltip}
                        align={this.align ? this.align : ''}
                        filters={item.filters}
                    ></el-table-column>
                )
            }
        })

        return res
    }

    emptyFunc() {}

    renderTable() {
        const columns = this.renderColumn(this.columns)
        return (
            <el-table
                ref={this.ref}
                header-cell-style={headerCellStyle}
                data={this.data}
                show-summary={this.showSummary || false}
                onSelection-change={this.handleSelectionChange}
                v-loading={this.loading}
                row-key={this.rowKey}
                onFilter-change={this.filterChange || this.emptyFunc}
                span-method={this.spanMethod || this.emptyFunc}
                height={this.height}
                border={this.border}
                {...{
                    props: this.$attrs,
                    on: this.$listeners,
                }}
            >
                {columns}
            </el-table>
        )
    }

    render() {
        return <div>{this.data && this.renderTable()}</div>
    }
}

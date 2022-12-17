
import { deepClone } from '@/utils/util'
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
@Component
export default class HPagination extends Vue {
    @Prop() private params!: any
    @Prop() private total!: number
    @Prop() private pageSizesProp!: Array<number>

    layout = 'total, sizes, prev, pager, next, jumper'
    pageSizes = this.pageSizesProp || [10, 20, 50, 100]
    pageNum = this.params?.pageNum || 1

    @Emit('sizeChange')
    handleSizeChange() {}

    @Emit('currentChange')
    handleCurrentChange() {}

    render() {
        return (
            <el-pagination
                background
                onSize-change={this.handleSizeChange}
                onCurrent-change={this.handleCurrentChange}
                current-page={this.params.pageNum}
                page-sizes={this.pageSizes}
                page-size={this.params.pageSize}
                layout={this.layout}
                total={this.total}
            ></el-pagination>
        )
    }
}

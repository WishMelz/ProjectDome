
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import { IOptionProp } from '@/serviceType'
@Component({
    components: {},
})
export default class HSelect extends Vue {
    @Prop() private optionData!: Array<IOptionProp>
    @Prop() private value!: any
    @Prop() private disabled?: boolean
    @Prop() private clearable?: boolean
    @Prop() private valueKey?: boolean //作为 value 唯一标识的键名，绑定值为对象类型时必填
    @Prop() private multiple?: boolean
    @Prop() private placeholder?: string
    @Prop() private filterable?: boolean //是否启用搜索
    @Prop() private filterMethod?: any //自定义搜索方法
    @Prop() private remoteMethod?: any //远程搜索方法

    selectedArr = null

    created() {
        this.selectedArr = this.value //默认值 可多选情况下为数组
    }
    @Watch('value')
    onValueChange(val: any) {
        this.selectedArr = val
    }

    @Emit('change')
    change(val: any) {
        return val
    }

    render() {
        const options = this.optionData?.map((item: IOptionProp) => {
            let value, label
            if (this.valueKey) {
                //需要绑定为对象
                value = item
            } else {
                value = item?.dictValue || item.value
            }
            label = item?.dictLabel || item.label
            return (
                <el-option value={value} label={label}>
                    {label}
                </el-option>
            )
        })
        const placeholder = this.placeholder || '请选择'

        return (
            <el-select
                v-model={this.selectedArr}
                placeholder={placeholder}
                value-key={this.valueKey}
                onChange={(e: any) => this.change(e)}
                disabled={this.disabled}
                multiple={this.multiple}
                clearable={this.clearable}
                filterable={this.filterable}
                filter-method={this.filterMethod}
                remote={this.remoteMethod ? true : false}
                remote-method={this.remoteMethod}
            >
                {options}
            </el-select>
        )
    }
}

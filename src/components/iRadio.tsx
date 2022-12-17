
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { IOptionProp } from '@/serviceType'

@Component({
    components: {},
})
export default class HRadio extends Vue {
    @Prop() private data!: Array<IOptionProp>
    @Prop() private value!: any
    @Prop() private disabled?: boolean
    radio = null

    @Watch('value')
    changeValue(val: any) {
        this.radio = val
    }

    @Emit('change')
    change(val: any) {
        this.radio = val
        return val
    }

    created() {
        this.radio = this.value
    }

    render() {
        const radioItems = this.data.map((item: IOptionProp) => {
            return (
                <el-radio label={item.value} disabled={item.disabled}>
                    {item.label}
                </el-radio>
            )
        })
        return (
            <el-radio-group
                v-model={this.radio}
                onChange={this.change}
                disabled={this.disabled}
            >
                {radioItems}
            </el-radio-group>
        )
    }
}


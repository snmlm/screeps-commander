<template lang="pug">
v-dialog(v-model='show' persistent)
    v-card
        v-card-title.title.font-weight-regular.justify-space-between.pb-1 参数配置
        v-card-text
            //- 这里不应该直接改 prop 的值，但是我懒的写 get 了。
            v-text-field(v-model="value.match" label='占位符' hide-details disabled)
            v-text-field.mt-4(v-model="value.label" :rules="rules" :counter="inputLimit" label='标签' clearable)
            v-text-field(v-model="value.default" label='默认值' hide-details clearable)

        v-divider
        v-card-actions
            v-btn(@click="cancel") 取消
            v-spacer
            v-btn(color="primary" dark @click="confirm") 确定
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class ParamConfig extends Vue {
    // 要修改的 param 的值
    @Prop({
        required: true,
        default: {
            match: '',
            default: '',
            label: ''
        }
    })
    value!: CommandParam

    // 是否显示该弹出框
    @Prop({
        required: true
    })
    show!: boolean

    // 输入字数限制
    inputLimit = 20

    // label 长度验证
    rules = [(v: string) => !v || v.length <= this.inputLimit || '超过字数限制']

    /**
     * 保存编辑结果
     * 会将修改后的 param 返回给父组件处理
     */
    @Emit('on-confirm')
    confirm(): CommandParam {
        // 这些处理都是针对 label 的
        if (this.value.label === '') this.value.label = '未命名参数'
        if (this.value.label.length > this.inputLimit) this.value.label = this.value.label.substring(0, this.inputLimit)

        return this.value
    }

    // 取消编辑
    @Emit('on-cancel')
    cancel() { }
}
</script>

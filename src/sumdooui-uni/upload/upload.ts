import type { PropType, ExtractPropTypes } from 'vue'
import type { UploadTypes } from './types'

export const upload_props = {
    /** 已上传的文件列表 */
    modelValue   : { type: Array as PropType<UploadTypes.UploadFile[]>, default: () => [] },
    /** 是否禁用 */
    disabled     : { type: Boolean, default: undefined },
    /** 是否支持预览图片 */
    preview      : { type: Boolean, default: undefined },
    /** 上传方法 */
    requestMethod: { type: Function },
    /** 上传数量限制 */
    max          : { type: Number, default: 1 },
    /** 是否支持多选 */
    multiple     : { type: Boolean, default: undefined },
    /** 上传前钩子 */
    beforeUpload : { type: Function },
    /** 显示文件列表 */
    showFileList : { type: Boolean, default: undefined },
}

export type UploadProps = ExtractPropTypes<typeof upload_props>

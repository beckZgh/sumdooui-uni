
export namespace UploadTypes {
    export interface UploadFile {
        src     : string
        tempFilePath?: string
        size   ?: number
        status ?: 'uploading' | 'success' | 'fail'
    }
}

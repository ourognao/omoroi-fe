import Vue from 'vue'
import vUploader from 'v-uploader'

const uploaderConfig = () => {
  return {
    uploadFileUrl: `${process.env.baseUrl}/pictures/upload`,
    deleteFileUrl: `${process.env.baseUrl}/pictures/delete`
  }
}

Vue.use(vUploader, uploaderConfig)

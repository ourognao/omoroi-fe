import Vue from 'vue'
import vUploader from 'v-uploader'

const uploaderConfig = () => {
  return {
    uploadFileUrl: `${process.env.baseUrl}/pictures/upload`,
    deleteFileUrl: `${process.env.baseUrl}/pictures/delete`,
    showMessage: (vue, message) => {
      // using v-dialogs to show message
      // vue.$vDialog.alert(message, null, {messageType: 'error'});
    }
  }
}

Vue.use(vUploader, uploaderConfig)

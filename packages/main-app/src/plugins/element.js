import { DataType } from 'wl-core'
import {
  Button,
  Menu,
  Submenu,
  Input,
  MenuItem,
  MenuItemGroup,
  Scrollbar,
  Loading,
  Message, 
  MessageBox
} from 'element-ui'

export function myMessage (options) {
  DataType.isObject(options)
    ? Message({
      showClose: true,
      ...options
    })
    : Message({
      showClose: true,
      message: options
    })
}

export function myConfirm (message, title = '提示', options = {}) {
  let _options = {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    ...options
  }
  return MessageBox.confirm(message, title, _options)
}

export default {
  components: [
    Button, Menu, Submenu, MenuItem, MenuItemGroup, Scrollbar, Input
  ],
  serve: [Loading],
  methods: [myMessage, myConfirm]
}

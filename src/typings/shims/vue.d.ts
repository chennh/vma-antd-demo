import Vue from 'vue'
import VueRouter, { RawLocation } from 'vue-router'
import { MessageOptions, MessageType, ConfigType, ConfigDuration, ConfigOnClose, MessageConfigOptions } from 'ant-design-vue'

declare module 'vue/types/vue' {
  interface Vue {
    success(content: MessageOptions): MessageType;
    success(content: ConfigType, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    warning(content: MessageOptions): MessageType;
    warning(content: ConfigType, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    warn(content: MessageOptions): MessageType;
    warn(content: ConfigType, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    info(content: MessageOptions): MessageType;
    info(content: ConfigType, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    error(content: MessageOptions): MessageType;
    error(content: ConfigType, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    loading(content: MessageOptions): MessageType;
    loading(content: ConfigType, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    open: (config: MessageOptions) => MessageType;
    config: (options: MessageConfigOptions) => void;
    destroy: () => void;
  }
}

declare module 'vue-router/types/router' {
  interface VueRouter {
    goRouter(param: RawLocation)
  }
}

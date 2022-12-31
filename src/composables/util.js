import {ElNotification} from 'element-plus';

// 消息提示
export function toast(message, type = 'success', dangerouslyUserHTMLString = false) {
    ElNotification({
        message,
        type,
        dangerouslyUserHTMLString,
        duration: 3000,
    });
}

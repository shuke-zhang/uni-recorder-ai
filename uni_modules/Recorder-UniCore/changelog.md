## 1.0.250331（2025-03-31）
增加RecordApp.UniNativeUtsPlugin_OnJsCall接口，App端搭配原生插件使用时，可绑定接收配套原生录音插件事件：原生插件新增PcmPlayer播放器，支持流式播放、完整播放，App端边录音边播放更流畅
## 1.0.250111（2025-01-11）
修复vue3 Fragments(multi-root 多个根节点)的兼容性问题；修复uniapp Android自带的XXPermissions库在后台无法请求权限的问题（仅限搭配原生录音插件可用）
## 1.0.241020（2024-10-20）
适配HBuilder4.28 vue3 setup编译环境下$root.$scope无法读取的bug，HBuilder4.29已修复此编译bug，但似乎还是有不能使用的问题。如果setup内不能使用，可尝试新建个vue组件，然后使用选项式api来调用录音功能，页面的setup内使用此vue组件
## 1.0.240910（2024-09-10）
- 新增RecordApp.UniMainCallBack_Register接口，允许App renderjs层多次回调数据给逻辑层
- iOS App请求权限时，会预先检查NSMicrophoneUsageDescription是否声明，避免无声明时调用录音会崩溃
- 新增appNativePlugin_sampleRate原生插件录音选项
- Android App已提供后台录音保活功能，启用后App在后台或锁屏后可继续正常录音
## 1.0.240625（2024-06-25）
调整UniWebViewCallAsync调用失败时返回更详细信息。android_audioSource默认值由1改成0，新增ios_categoryOptions原生插件录音选项
## 1.0.240409（2024-04-09）
增加功能调用，完善demo项目
## 1.0.231208（2023-12-08）
完善文档，增加asr语音识别示例
## 1.0.231201（2023-12-04）
第一次发布

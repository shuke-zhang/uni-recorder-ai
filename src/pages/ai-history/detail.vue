z<route lang="json" pages="home">
  {
       "style": { "navigationBarTitleText": "历史记录","navigationStyle": "custom" }
  }
</route>

<script setup lang="ts">
import { defaultSendMsgPre } from '../recorder-ai/hooks/useAiPage'
import { listChatHistory } from '@/api/chat-history'
import type { AiMessage } from '@/hooks'
import { userMsgFormat } from '@/utils'

const router = useRouter()
const [state, actions] = useListData(listChatHistory, {
  filter() {
    return {
    }
  },
  onComplete(cb) {
    const result: AiMessage[] = []
    // 把原始list倒序遍历
    state.list.slice().reverse().forEach((item) => {
      if (item.userInput || item.userAudio) {
        result.push({
          role: 'user',
          content: item.userInput || '',
          userInputTime: item.userInputTime || '',
          userAudioUrl: item.userAudio || '',
        })
      }
      if (item.assistantOutput || item.assistantAudio) {
        result.push({
          role: 'assistant',
          content: item.assistantOutput || '',
          assistantAudioTime: item.assistantAudioTime || '',
          assistantAudioUrl: item.assistantAudio || '',
        })
      }
    })
    state.list = result
  },
})
const scaleVm = getPageExpose('pages/scale/index')

function handleToRecorderPage() {
  console.log('触发handleToRecorderPage')

  router.replace('/pages/recorder-ai/index')
  scaleVm.init()
}
</script>

<template>
  <nav-bar @custom-click="handleToRecorderPage">
    <text>
      历史记录
    </text>
  </nav-bar>
  <list-data
    :actions="actions"
    :state="state"
    with-navbar
    :auto-scroll-to-bottom="true"
  >
    <view v-for="(msg, index) in (state.list as AiMessage[])" :key="index" class="py-16rpx">
      <text class="flex-center font-size-16rpx color-black-2 mb-4rpx">
        {{ msg.userInputTime || msg.assistantAudioTime }}
      </text>
      <!-- 用户消息 -->
      <view v-if="msg.role === 'user'" class=" flex  flex-justify-end ">
        <view class="message-bubble p-32rpx border-rd-16rpx   bg-#95ec69 color-#576b95 max-w-80%">
          <text selectable class="text-28rpx">
            <!-- 首先判断 用户消息临时加载状态 如果是则代表是语音识别消息 否则展示已经添加进去的消息 -->
            {{
              userMsgFormat(defaultSendMsgPre, msg.content as string, true)

            }}
          </text>
        </view>
      </view>

      <!-- AI消息（含加载状态） -->
      <view v-if="msg.role === 'assistant'" class="flex justify-start opacity-60">
        <Icon-font name="zhipu" class="mt-20rpx mr-10rpx" />

        <view class="flex mt-16rpx mb-16rpx flex-justify-start bg-#ffffff color-#333333 max-w-80% border-rd-16rpx">
          <view
            class="message-bubble  p-32rpx border-rd-16rpx w-100%"
            :class="[msg.streaming && !(msg.content && msg.content!.length) ? 'flex-center w-120rpx h-120rpx ' : '']"
          >
            <view v-if="msg.content">
              <UaMarkdown :source="`${msg.content}`" :show-line="false" />

              <!-- <view class="h-2rpx  bg-black-3 my-10rpx" />

                <view class="flex items-center justify-end ">
                  <view class="border-rd-16rpx size-60rpx bg-#e8ecf5 flex-center">
                    <icon-font name="copy" :color="COLOR_PRIMARY" :size="28" />
                  </view>
                  <view class="border-rd-16rpx size-60rpx  bg-#e8ecf5 flex-center  ml-20rpx">
                    <icon-font name="sound" :color="COLOR_PRIMARY" :size="28" />
                  </view>
                </view> -->
            </view>
          </view>
        </view>
      </view>
    </view>
  </list-data>
</template>

<style  lang="scss">
.message-bubble {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

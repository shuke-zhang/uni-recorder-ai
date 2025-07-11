import type { ChatHistoryModel } from '@/model/chat'
import { request } from '@/utils/request'

/**
 * 获取ai聊天记录列表
 */
export function listChatHistory(data?: listParams<ChatHistoryModel>) {
  return request.post<ResponseData<ResponseRecords<ChatHistoryModel>> >(
    {
      url: `/chatHistory/list/v1`,
      data: {
        page: data,
      },
      withToken: false,
    },
  )
}

/**
 * 根据id查询ai聊天记录
 */
export function getChatHistory(id: number) {
  return request.get<ResponseList<ChatHistoryModel>>(
    {
      url: `/chatHistory/${id}`,
      withToken: false,

    },
  )
}

/**
 * 新增ai聊天记录
 */
export function addChatHistory(data: ChatHistoryModel) {
  console.log('触发addChatHistory', data)

  return request.post<ResponseList<ChatHistoryModel>>(
    {
      url: `/chatHistory/add/v1`,
      data,
      withToken: false,
    },
  )
}

export function addChatHistory2(data: ChatHistoryModel) {
  console.log('触发 addChatHistory2', data)
}

/**
 * 删除ai聊天记录
 */
export function deleteChatHistory(idList: string[]) {
  const queryString = idList.map(id => `idList=${id}`).join('&')

  return request.delete<ResponseList<ChatHistoryModel>>(
    {
      url: `/chatHistory/delete?${queryString}`,
      withToken: false,

    },
  )
}

import { billListParamsType, billListType, billPopupType } from '@/types/bill';
import http from '@/utils/request';

// api接口
const api = {
  billList: '/api/bill/list', // 账单列表
  billType: '/api/type/list', // 账单类型
};

/**
 * @description: 获取账单列表
 * @param {billListParamsType} data 分页参数
 * @return 账单列表
 */
export function getBillListAPI(data: billListParamsType) {
  return http.get<billListType>(api.billList, data);
}

/**
 * @description: 获取账单类型列表
 * @return 账单类型
 */
export function getBillTypeListAPI() {
  return http.get<{ list: billPopupType[] }>(api.billType);
}

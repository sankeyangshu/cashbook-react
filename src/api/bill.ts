import {
  billAddType,
  billDetailType,
  billListParamsType,
  billListType,
  billPopupType,
  billUpdateType,
} from '@/types/bill';
import http from '@/utils/request';

// api接口
const api = {
  billList: '/api/bill/list', // 账单列表
  billType: '/api/type/list', // 账单类型
  billAdd: '/api/bill/add', // 新增账单
  billDetail: '/api/bill/detail', // 账单详情
  billDelete: '/api/bill/delete', // 删除账单
  billUpdate: '/api/bill/update', // 修改账单
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

/**
 * @description: 新增账单
 * @param {billPopupType} data 账单类型
 * @return 账单
 */
export function addBillAPI(data: billAddType) {
  return http.post(api.billAdd, data);
}

/**
 * @description: 获取账单详情
 * @param {object} data 账单id
 * @return 账单详情
 */
export function getBillDetailAPI(data: { id: number | string }) {
  return http.get<billDetailType>(api.billDetail, data);
}

/**
 * @description: 删除
 * @param {object} data 账单id
 * @return 删除结果
 */
export function removeBillDetailAPI(data: { id: number | string }) {
  return http.post(api.billDelete, data);
}

/**
 * @description: 编辑账单
 * @param {billUpdateType} data 账单id
 * @return 编辑结果
 */
export function updateBillDetailAPI(data: billUpdateType) {
  return http.post(api.billUpdate, data);
}

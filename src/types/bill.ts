/**
 * 账单类型
 */
export interface billType {
  bills: billItemType[];
  date: string;
}

/**
 * 账单item类型
 */
export interface billItemType {
  amount: string;
  date: string;
  id: number;
  pay_type: number;
  remark: string;
  type_id: number;
  type_name: string;
}

/**
 * 账单列表参数类型
 */
export interface billListParamsType {
  page: number;
  page_size: number;
  date: string;
  type_id: string | number;
}

/**
 * 账单列表返回类型
 */
export interface billListType {
  list: billType[];
  totalExpense: number;
  totalIncome: number;
  totalPage: number;
}

/**
 * 账单类型弹窗
 */
export interface billPopupType {
  id: number;
  name: string;
  type: string;
  user_id: number;
}

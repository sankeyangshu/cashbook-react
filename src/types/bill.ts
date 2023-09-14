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
  type?: string;
  user_id?: number;
}

/**
 * 新增账单类型
 */
export interface billAddType {
  amount: string; // 账单金额小数点后保留两位
  type_id: number; // 账单种类id
  type_name: string; // 账单种类名称
  date: number; // 日期传时间戳
  pay_type: number; // 账单类型传 1 或 2
  remark: string; // 备注
}

/**
 * 编辑账单类型
 */
export interface billUpdateType extends billAddType {
  id: number;
}

/**
 * 账单详情类型
 */
export interface billDetailType extends billItemType {
  user_id: number;
}

/**
 * 收入或支出类型
 */
export type payInterface = 'income' | 'expense';

/**
 * 总账单收入或支出类型
 */
export interface totalDataType {
  number: number;
  pay_type: number;
  type_id: number;
  type_name: string;
}

/**
 * 总账单类型
 */
export interface totalAllDataType {
  total_data: totalDataType[];
  total_expense: string;
  total_income: string;
}

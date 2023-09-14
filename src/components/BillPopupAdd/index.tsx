import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Input, NumberKeyboard, Popup, Toast } from 'react-vant';
import { ArrowDown } from '@react-vant/icons';
import { getBillTypeListAPI, addBillAPI, updateBillDetailAPI } from '@/api/bill';
import { billPopupType, billDetailType, payInterface } from '@/types/bill';
import { IconList } from '@/utils';
import BillPopupDate, { billDateRefType } from '@/components/BillPopupDate';
import CustomIcon from '@/components/CustomIcon';
import dayjs from 'dayjs';
import mCss from './index.module.less';

/**
 * 账单增加弹窗节点类型
 */
export interface billAddRefType {
  show: () => void;
  close: () => void;
}

interface billPopupAddType {
  onReload: () => Promise<void>;
  billDetail?: billDetailType;
}

const BillPopupAdd = forwardRef<billAddRefType, billPopupAddType>(
  ({ onReload, billDetail }, ref) => {
    const [showAddPopup, setShowAddPopup] = useState(false); // 是否显示弹窗
    const [payType, setPayType] = useState<payInterface>('expense'); // 支出或收入类型
    const datePayRef = useRef<billDateRefType>(null); // 日期筛选组件ref
    const [payDate, setPayDate] = useState<Date | string>(new Date()); // 日期
    const [currentType, setCurrentType] = useState<billPopupType>(); // 当前选中账单类型
    const [expense, setExpense] = useState<billPopupType[]>([]); // 支出类型数组
    const [income, setIncome] = useState<billPopupType[]>([]); // 收入类型数组
    const [remark, setRemark] = useState(''); // 备注
    const [showRemark, setShowRemark] = useState(false); // 备注输入框展示控制
    const [amount, setAmount] = useState(''); // 账单金额

    const billDetailID = billDetail && billDetail.id; // 账单id

    useEffect(() => {
      // 如果账单id存在
      if (billDetailID) {
        setPayType(billDetail.pay_type === 1 ? 'expense' : 'income');
        setCurrentType({
          id: billDetail.type_id,
          name: billDetail.type_name,
        });
        setRemark(billDetail.remark);
        setAmount(billDetail.amount);
        setPayDate(dayjs(Number(billDetail.date)).toDate());
      }
    }, [billDetail]);

    // 在子组件中使用 useImperativeHandle 自定义引用对象
    useImperativeHandle(ref, () => ({
      // 在引用对象中定义方法
      show: () => {
        // 显示弹窗
        setShowAddPopup(true);
      },
      close: () => {
        setShowAddPopup(false);
      },
    }));

    useEffect(() => {
      getBillTypeList();
    }, []);

    // 切换支出或收入类型
    const onChangePayType = (type: payInterface) => {
      setPayType(type);
      // 判断切换后的类型是支出或收入，切换之后，默认给相应类型的第一个值
      if (type === 'expense') {
        // 支出
        setCurrentType(expense[0]);
      } else if (type === 'income') {
        // 收入
        setCurrentType(income[0]);
      }
    };

    // 选择时间
    const onSelectPayDate = (value: string) => {
      setPayDate(value);
    };

    // 获取账单类型
    const getBillTypeList = async () => {
      const {
        data: { list },
      } = await getBillTypeListAPI();
      // 获取支出和收入标签，1代表支出,2代表收入
      const _expense = list.filter((item) => Number(item.type) === 1);
      const _income = list.filter((item) => Number(item.type) === 2);
      setExpense(_expense);
      setIncome(_income);
      // 没有 billDetailID 的情况下，说明是新建账单。
      if (!billDetailID) {
        setCurrentType(_expense[0]); // 新建账单，类型默认是支出类型数组的第一项
      }
    };

    // 输入金额
    const onInputAmount = (value: string) => {
      // 当输入的值为 '.' 且已经存在 '.'，或者第一个字符为 '0' 且下一个字符不是 '.'，则不进行字符串相加。
      if ((value === '.' && amount.includes('.')) || (amount === '0' && value !== '.')) return;

      // 小数点后保留两位，当超过两位时，不让其字符串继续相加。
      if (value !== '.' && amount && amount.includes('.') && amount.split('.')[1].length >= 2)
        return;
      setAmount(amount + value);
    };

    // 删除金额
    const onDeleteAmount = () => {
      // 当用户点击删除按钮时
      const _amount = amount.slice(0, amount.length - 1);
      setAmount(_amount);
    };

    // 添加账单
    const onAddBill = async () => {
      // 判断用户输入的金额是否存在
      if (!amount) {
        Toast.info('请输入具体金额');
        return;
      }

      // 账单参数
      const data = {
        amount: Number(amount).toFixed(2), // 账单金额小数点后保留两位
        type_id: currentType!.id, // 账单种类id
        type_name: currentType!.name, // 账单种类名称
        date: dayjs(payDate).unix() * 1000, // 日期传时间戳
        pay_type: payType === 'expense' ? 1 : 2, // 账单类型传 1 或 2
        remark: remark, // 备注
      };

      try {
        if (billDetailID) {
          const params = {
            ...data,
            id: billDetailID,
          };
          // 如果有 id 需要调用详情更新接口
          await updateBillDetailAPI(params);
          Toast.success('修改成功');
        } else {
          await addBillAPI(data);

          // 重置数据
          setAmount('');
          setPayType('expense');
          setCurrentType(expense[0]);
          setPayDate(new Date());
          setRemark('');
          Toast.success('添加成功');
        }

        // 关闭弹窗
        setShowAddPopup(false);
        // 刷新首页数据
        if (onReload) onReload();
      } catch (error: any) {
        Toast.fail(error.msg);
      }
    };

    return (
      <Popup
        visible={showAddPopup}
        position="bottom"
        onClickOverlay={() => setShowAddPopup(false)}
        onClickCloseIcon={() => setShowAddPopup(false)}
        title={billDetailID ? '编辑账单' : '添加账单'}
        teleport={() => document.body}
        closeable
        round
      >
        <div className={mCss['add-popup']}>
          <div className={mCss.filter}>
            <div className={mCss.type}>
              <span
                className={`${mCss.expense} ${payType === 'expense' && mCss.active}`}
                onClick={() => onChangePayType('expense')}
              >
                支出
              </span>
              <span
                className={`${mCss.income} ${payType === 'income' && mCss.active}`}
                onClick={() => onChangePayType('income')}
              >
                收入
              </span>
            </div>
            <div
              className={mCss.time}
              onClick={() => datePayRef.current && datePayRef.current.show()}
            >
              {dayjs(payDate).format('MM-DD')} <ArrowDown className={mCss.arrow} />
            </div>
          </div>
          <div className={mCss.money}>
            <span className={mCss.sufix}>¥</span>
            <span className={`${mCss.amount} ${mCss.animation}`}>{amount}</span>
          </div>
          <div className={mCss['type-warp']}>
            <div className={mCss['type-body']}>
              {(payType === 'expense' ? expense : income).map((item) => (
                <div
                  onClick={() => setCurrentType(item)}
                  key={item.id}
                  className={mCss['type-item']}
                >
                  <span
                    className={`${mCss['icon-wrap']} ${payType === 'expense' && mCss.expense} ${
                      payType === 'income' && mCss.income
                    } ${currentType!.id === item.id && mCss.active}`}
                  >
                    <CustomIcon
                      className={mCss.icon}
                      name={item.id ? IconList[item.id - 1] : 'qita'}
                    />
                  </span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={mCss.remark}>
            {showRemark ? (
              <Input.TextArea
                value={remark}
                autoSize
                showWordLimit
                rows={3}
                maxLength={50}
                placeholder="请输入备注信息"
                onChange={(val) => setRemark(val)}
                onBlur={() => setShowRemark(false)}
              />
            ) : (
              <span onClick={() => setShowRemark(true)}>{remark || '添加备注'}</span>
            )}
          </div>
          <NumberKeyboard
            visible
            theme="custom"
            extraKey="."
            closeButtonText="完成"
            onInput={onInputAmount}
            onDelete={onDeleteAmount}
            onClose={onAddBill}
          />
          <BillPopupDate ref={datePayRef} onSelect={onSelectPayDate} />
        </div>
      </Popup>
    );
  }
);

export default BillPopupAdd;

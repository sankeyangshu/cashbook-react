import { useState, forwardRef, useEffect } from 'react';
import { Popup } from 'react-vant';
import { getBillTypeListAPI } from '@/api/bill';
import { billPopupType } from '@/types/bill';
import mCss from './index.module.less';

interface billPropType {
  onSelect: (item: billPopupType) => void;
}

const BillPopupType = forwardRef<any, billPropType>(({ onSelect }, ref) => {
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [expenseType, setExpenseType] = useState<billPopupType[]>([]); // 支出类型标签
  const [incomeType, setIncomeType] = useState<billPopupType[]>([]); // 收入类型标签
  const [active, setActive] = useState<string | number>('all'); // 当前选中的标签

  // 获取账单类型列表
  const getBillTypeList = async () => {
    const {
      data: { list },
    } = await getBillTypeListAPI();
    // 获取支出和收入标签，1代表支出,2代表收入
    setExpenseType(list.filter((item) => Number(item.type) === 1));
    setIncomeType(list.filter((item) => Number(item.type) === 2));
  };

  useEffect(() => {
    getBillTypeList();
  }, []);

  if (ref) {
    (ref as any).current = {
      // 外部可以通过 ref.current.show 来控制组件的显示
      show: () => {
        setIsShowPopup(true);
      },
      // 外部可以通过 ref.current.close 来控制组件的隐藏
      close: () => {
        setIsShowPopup(false);
      },
    };
  }

  // 选择账单类型
  const onClickBillType = (item: billPopupType | { id: string }) => {
    setActive(item.id);
    setIsShowPopup(false);
    // 父组件传入的 onSelect，为了获取类型
    onSelect(item as billPopupType);
  };

  return (
    <>
      <Popup
        visible={isShowPopup}
        position="bottom"
        onClickOverlay={() => setIsShowPopup(false)}
        onClickCloseIcon={() => setIsShowPopup(false)}
        teleport={() => document.body}
        title="选择账单类型"
        closeable
        round
      >
        <div className={mCss.popupType}>
          <div className={mCss.content}>
            <div
              className={`${mCss.all} ${active === 'all' && mCss.active}`}
              onClick={() => onClickBillType({ id: 'all' })}
            >
              全部类型
            </div>
            <div className={mCss.title}>支出</div>
            <div className={mCss.item}>
              {expenseType.map((item, index) => (
                <p
                  key={index}
                  className={`${active === item.id && mCss.active}`}
                  onClick={() => onClickBillType(item)}
                >
                  {item.name}
                </p>
              ))}
            </div>
            <div className={mCss.title}>收入</div>
            <div className={mCss.item}>
              {incomeType.map((item, index) => (
                <p
                  key={index}
                  className={`${active === item.id && mCss.active}`}
                  onClick={() => onClickBillType(item)}
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
});

export default BillPopupType;

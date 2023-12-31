import { useState, forwardRef, useImperativeHandle } from 'react';
import { Popup, DatetimePicker } from 'react-vant';
import dayjs from 'dayjs';

interface billPropDate {
  onSelect: (item: string) => void;
  mode?: 'date' | 'year-month';
}

/**
 * 日期筛选弹窗节点类型
 */
export interface billDateRefType {
  show: () => void;
  close: () => void;
}

const BillPopupDate = forwardRef<billDateRefType, billPropDate>(
  ({ onSelect, mode = 'date' }, ref) => {
    const [showDatePopup, setShowDatePopup] = useState(false); // 是否显示弹窗
    const [nowDate, setNowDate] = useState(new Date()); // 当前的日期

    // 在子组件中使用 useImperativeHandle 自定义引用对象
    useImperativeHandle(ref, () => ({
      // 在引用对象中定义方法
      show: () => {
        // 子组件的逻辑代码
        setShowDatePopup(true);
      },
      close: () => {
        setShowDatePopup(false);
      },
    }));

    // 选择时间
    const onConfirmDate = (item: Date) => {
      setNowDate(item);
      setShowDatePopup(false);
      if (mode === 'year-month') {
        onSelect(dayjs(item).format('YYYY-MM'));
      } else if (mode === 'date') {
        onSelect(dayjs(item).format('YYYY-MM-DD'));
      }
    };

    return (
      <Popup
        visible={showDatePopup}
        position="bottom"
        onClose={() => setShowDatePopup(false)}
        teleport={() => document.body}
      >
        <DatetimePicker
          value={nowDate}
          type={mode}
          title="请选择"
          onChange={setNowDate}
          onCancel={() => setShowDatePopup(false)}
          onConfirm={onConfirmDate}
          formatter={(type: string, val: string) => {
            if (type === 'year') {
              return `${val}年`;
            }
            if (type === 'month') {
              return `${val}月`;
            }
            if (type === 'day') {
              return `${val}日`;
            }
            return val;
          }}
        />
      </Popup>
    );
  }
);

export default BillPopupDate;

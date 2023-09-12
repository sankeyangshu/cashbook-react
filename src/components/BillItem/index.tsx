import { FC, useEffect, useState } from 'react';
import { billType } from '@/types/bill';
import { Cell } from 'react-vant';
import { IconList } from '@/utils';
import dayjs from 'dayjs';
import CustomIcon from '../CustomIcon';
import mCss from './index.module.less';

type billPropType = {
  bill: billType;
};

const BillItem: FC<billPropType> = ({ bill }) => {
  const [income, setIncome] = useState(0); // 收入
  const [expense, setExpense] = useState(0); // 支出

  // 计算当日收支总和
  useEffect(() => {
    // pay_type：1 为支出；2 为收入
    const _income = bill.bills
      .filter((i) => i.pay_type === 2)
      .reduce((curr, item) => {
        curr += Number(item.amount);
        return curr;
      }, 0);
    setIncome(_income);

    const _expense = bill.bills
      .filter((i) => i.pay_type === 1)
      .reduce((curr, item) => {
        curr += Number(item.amount);
        return curr;
      }, 0);
    setExpense(_expense);
  }, [bill.bills]);

  return (
    <>
      <div className={mCss.bill}>
        <div className={mCss.header}>
          <div className={mCss.date}>{bill.date}</div>
          <div className={mCss.money}>
            <span>
              <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt="支" />
              <span className={mCss.num}>¥{expense.toFixed(2)}</span>
            </span>
            <span>
              <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
              <span className={mCss.num}>¥{income.toFixed(2)}</span>
            </span>
          </div>
        </div>
        {bill &&
          bill.bills.map((item) => (
            <Cell
              key={item.id}
              title={
                <div className={mCss.title}>
                  <CustomIcon
                    className={mCss.icon}
                    name={item.type_id ? IconList[item.type_id - 1] : 'qita'}
                  />
                  <span>{item.type_name}</span>
                </div>
              }
              value={
                <span style={{ color: item.pay_type == 2 ? '#d81d1d' : '#39be77' }}>{`${
                  item.pay_type == 1 ? '-' : '+'
                }${item.amount}`}</span>
              }
              label={
                <div>
                  {dayjs(Number(item.date)).format('HH:mm')} {item.remark ? `| ${item.remark}` : ''}
                </div>
              }
            ></Cell>
          ))}
      </div>
    </>
  );
};

export default BillItem;

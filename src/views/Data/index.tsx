import { useEffect, useRef, useState } from 'react';
import { Progress } from 'react-vant';
import { CalendarO } from '@react-vant/icons';
import { getBillTotalDetailAPI } from '@/api/bill';
import { payInterface, totalDataType } from '@/types/bill';
import { IconList } from '@/utils';
import BillPopupDate, { billDateRefType } from '@/components/BillPopupDate';
import CustomIcon from '@/components/CustomIcon';
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import mCss from './index.module.less';

const Data = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM'));
  const billDateRef = useRef<billDateRefType>(null); // 日期筛选ref

  const [totalType, setTotalType] = useState<payInterface>('expense'); // 收入或支出类型
  const [totalExpense, setTotalExpense] = useState(0); // 总支出
  const [totalIncome, setTotalIncome] = useState(0); // 总收入
  const [expenseData, setExpenseData] = useState<totalDataType[]>([]); // 支出数据
  const [incomeData, setIncomeData] = useState<totalDataType[]>([]); // 收入数据

  const [pieType, setPieType] = useState<payInterface>('expense'); // 控制饼图的收入与支出
  const pieChartRef = useRef<HTMLDivElement>(null); //拿到DOM容器

  // 获取账单总数据
  const getBillTotalDetail = async () => {
    const { data } = await getBillTotalDetailAPI({ date: currentTime });

    // 总收支
    setTotalExpense(Number(data.total_expense));
    setTotalIncome(Number(data.total_income));

    // 过滤并排序支出和收入
    const expense_data = data.total_data
      .filter((item) => item.pay_type === 1)
      .sort((a, b) => b.number - a.number); // 过滤出账单类型为支出的项
    const income_data = data.total_data
      .filter((item) => item.pay_type === 2)
      .sort((a, b) => b.number - a.number); // 过滤出账单类型为收入的项
    setExpenseData(expense_data);
    setIncomeData(income_data);

    // 绘制饼图
    setPieChart(pieType === 'expense' ? expense_data : income_data);
  };

  // 绘制饼图
  const setPieChart = (data: totalDataType[]) => {
    if (pieChartRef) {
      // echart初始化容器
      const chart = echarts.init(pieChartRef.current);

      // 配置项
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        // 图例
        legend: {
          data: data.map((item) => item.type_name),
        },
        series: [
          {
            name: '支出',
            type: 'pie',
            radius: '55%',
            data: data.map((item) => {
              return {
                value: item.number,
                name: item.type_name,
              };
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };

      // 绘制
      chart.setOption(option);
    }
  };

  useEffect(() => {
    getBillTotalDetail();
  }, [currentTime]);

  // 切换收入或支出
  const onChangeTotalType = (type: payInterface) => {
    setTotalType(type);
  };

  // 切换饼图收入或支出
  const onChangePieType = (type: payInterface) => {
    setPieType(type);
  };

  useEffect(() => {
    // 重绘饼图
    setPieChart(pieType === 'expense' ? expenseData : incomeData);
  }, [pieType]);

  // 显示日期选择弹窗
  const onClickShowDatePopup = () => {
    billDateRef.current && billDateRef.current.show();
  };

  // 筛选日期
  const onSelectDate = (item: string) => {
    if (item !== currentTime) {
      setCurrentTime(item);
    }
  };

  return (
    <div className={mCss.data}>
      <div className={mCss.total}>
        <div className={mCss.time} onClick={onClickShowDatePopup}>
          <span>{currentTime}</span>
          <CalendarO className={mCss.date} />
        </div>
        <div className={mCss.title}>共支出</div>
        <div className={mCss.expense}>¥{totalExpense}</div>
        <div className={mCss.income}>共收入¥{totalIncome}</div>
      </div>
      <div className={mCss.structure}>
        <div className={mCss.head}>
          <span className={mCss.title}>收支构成</span>
          <div className={mCss.tab}>
            <span
              onClick={() => onChangeTotalType('expense')}
              className={`${mCss.expense} ${totalType === 'expense' && mCss.active}`}
            >
              支出
            </span>
            <span
              onClick={() => onChangeTotalType('income')}
              className={`${mCss.income} ${totalType === 'income' && mCss.active}`}
            >
              收入
            </span>
          </div>
        </div>
        <div className={mCss.content}>
          {(totalType === 'expense' ? expenseData : incomeData).map((item) => (
            <div key={item.type_id} className={mCss.item}>
              <div className={mCss.left}>
                <div className={mCss.type}>
                  <span
                    className={`${totalType === 'expense' && mCss.expense} ${
                      totalType === 'income' && mCss.income
                    }`}
                  >
                    <CustomIcon name={item.type_id ? IconList[item.type_id - 1] : 'qita'} />
                  </span>
                  <span className={mCss.name}>{item.type_name}</span>
                  <span className={mCss.num}>¥{item.number.toFixed(2) || 0}</span>
                </div>
              </div>
              <div className={mCss.right}>
                <div className={mCss.percent}>
                  <Progress
                    percentage={Number(
                      (item.number / Number(totalType === 'expense' ? totalExpense : totalIncome)) *
                        100
                    ).toFixed(2)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={mCss.proportion}>
          <div className={mCss.head}>
            <span className={mCss.title}>收支构成</span>
            <div className={mCss.tab}>
              <span
                onClick={() => onChangePieType('expense')}
                className={`${mCss.expense} ${pieType === 'expense' && mCss.active}`}
              >
                支出
              </span>
              <span
                onClick={() => onChangePieType('income')}
                className={`${mCss.income} ${pieType === 'income' && mCss.active}`}
              >
                收入
              </span>
            </div>
          </div>
          {/* 饼图的 DOM 节点 */}
          <div className={mCss.pie} ref={pieChartRef}></div>
        </div>
      </div>
      <BillPopupDate ref={billDateRef} mode="year-month" onSelect={onSelectDate} />
    </div>
  );
};

export default Data;

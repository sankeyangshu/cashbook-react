import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { PullRefresh, List, Empty, FloatingBall } from 'react-vant';
import { billPopupType, billType } from '@/types/bill';
import { getBillListAPI } from '@/api/bill';
import BillPopupType, { billPopupRefType } from '@/components/BillPopupType';
import BillPopupDate, { billDateRefType } from '@/components/BillPopupDate';
import BillPopupAdd, { billAddRefType } from '@/components/BillPopupAdd';
import dayjs from 'dayjs';
import BillItem from '@/components/BillItem';
import CustomIcon from '@/components/CustomIcon';
import mCss from './index.module.less';

const Home = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')); // 当前筛选时间
  const [page, setPage] = useState(1); // 分页
  const [totalPage, setTotalPage] = useState(0); // 分页总数
  const [billList, setBillList] = useState<billType[]>([]); // 账单列表
  const [totalExpense, setTotalExpense] = useState(0); // 总支出
  const [totalIncome, setTotalIncome] = useState(0); // 总收入
  const [finished, setFinished] = useState(false); // 是否加载完成

  const billTypeRef = useRef<billPopupRefType>(null); // 账单类型ref
  const [currentSelect, setCurrentSelect] = useState<Partial<billPopupType>>({}); // 当前筛选类型

  const billDateRef = useRef<billDateRefType>(null); // 日期筛选ref

  const billAddRef = useRef<billAddRefType>(null); // 新增账单ref

  // 获取账单列表
  const getBillList = async () => {
    const { data } = await getBillListAPI({
      page,
      page_size: 10,
      date: currentTime,
      type_id: currentSelect.id || 'all',
    });
    if (page === 1) {
      setBillList(data.list);
    } else {
      setBillList(billList.concat(data.list));
    }
    setTotalExpense(Number(data.totalExpense.toFixed(2)));
    setTotalIncome(Number(data.totalIncome.toFixed(2)));
    setTotalPage(data.totalPage);
  };

  useEffect(() => {
    getBillList(); // 初始化
  }, [page, currentSelect, currentTime]);

  // 下拉刷新
  const onRefreshData = async () => {
    setFinished(false);
    // 判断是否是第一页，如果是第一页，那就不需要加载新数据
    if (page !== 1) {
      setPage(1);
    } else {
      getBillList();
    }
  };

  // 上拉加载新数据
  const onLoadRefreshData = async () => {
    // 判断数据是否加载完毕
    if (page < totalPage) {
      setPage(page + 1);
    } else {
      setFinished(true);
    }
  };

  // 显示账单类型
  const onClickShowBillPopup = () => {
    billTypeRef.current && billTypeRef.current.show();
  };

  // 筛选账单类型
  const onSelectBillType = (item: billPopupType) => {
    // 只有选择了不同的类型才会重新请求
    if (item.id !== currentSelect.id) {
      setFinished(false);
      // 触发刷新列表，将分页重置为 1
      setPage(1);
      setCurrentSelect(item);
    }
  };

  // 显示日期筛选弹窗
  const onClickShowDatePopup = () => {
    billDateRef.current && billDateRef.current.show();
  };

  // 筛选日期
  const onSelectDate = (item: string) => {
    if (item !== currentTime) {
      setFinished(false);
      setPage(1);
      setCurrentTime(item);
    }
  };

  // 新增账单
  const onClickAddBill = () => {
    billAddRef.current && billAddRef.current.show();
  };

  return (
    <div className={mCss.home}>
      <div className={mCss.header}>
        <div className={mCss.type} onClick={onClickShowBillPopup}>
          <span className={mCss.title}>类型</span>
          <Icon icon="grommet-icons:apps-rounded" fontSize={20} color="#ffffff" />
        </div>
        <div className={mCss.dataWrap}>
          <div className={mCss.date} onClick={onClickShowDatePopup}>
            {currentTime}
            <Icon icon="ep:arrow-down-bold" style={{ marginLeft: 7 }} />
          </div>
          <div className={mCss.expense}>
            总支出：¥<span>{totalExpense}</span>
          </div>
          <div className={mCss.expense}>
            总收入：¥<span>{totalIncome}</span>
          </div>
        </div>
      </div>
      <div className={mCss.content}>
        {billList.length > 0 ? (
          <PullRefresh onRefresh={onRefreshData}>
            <List finished={finished} onLoad={onLoadRefreshData} finishedText="没有更多了">
              {billList.map((item, index) => (
                <BillItem bill={item} key={index} />
              ))}
            </List>
          </PullRefresh>
        ) : (
          <Empty description="暂无账单" />
        )}
      </div>
      <BillPopupType ref={billTypeRef} onSelect={onSelectBillType} />
      <BillPopupDate ref={billDateRef} mode="year-month" onSelect={onSelectDate} />
      <BillPopupAdd ref={billAddRef} onReload={getBillList} />
      <FloatingBall>
        <div className={mCss.addIcon} onClick={onClickAddBill}>
          <CustomIcon name="tianjia" />
        </div>
      </FloatingBall>
    </div>
  );
};

export default Home;

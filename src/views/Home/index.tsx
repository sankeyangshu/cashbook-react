import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { PullRefresh, List } from 'react-vant';
import { billType } from '@/types/bill';
import { getBillListAPI } from '@/api/bill';
import dayjs from 'dayjs';
import BillItem from '@/components/BillItem';
import mCss from './index.module.less';

const Home = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')); // 当前筛选时间
  const [page, setPage] = useState(1); // 分页
  const [totalPage, setTotalPage] = useState(0); // 分页总数
  const [billList, setBillList] = useState<billType[]>([]); // 账单列表
  const [finished, setFinished] = useState(false); // 是否加载完成

  // 获取账单列表
  const getBillList = async () => {
    const { data } = await getBillListAPI({ page, page_size: 10, date: currentTime });
    if (page === 1) {
      setBillList(data.list);
    } else {
      setBillList(billList.concat(data.list));
    }
    setTotalPage(data.totalPage);
  };

  useEffect(() => {
    getBillList(); // 初始化
  }, [page]);

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
    console.log('first');
    // 判断数据是否加载完毕
    if (page < totalPage) {
      setPage(page + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className={mCss.home}>
      <div className={mCss.header}>
        <div className={mCss.type}>
          <span className={mCss.title}>类型</span>
          <Icon icon="grommet-icons:apps-rounded" fontSize={20} color="#ffffff" />
        </div>
        <div className={mCss.dataWrap}>
          <div className={mCss.date}>
            2022-06
            <Icon icon="ep:arrow-down-bold" style={{ marginLeft: 7 }} />
          </div>
          <div className={mCss.expense}>
            总支出：¥<span>200</span>
          </div>
          <div className={mCss.expense}>
            总收入：¥<span>500</span>
          </div>
        </div>
      </div>
      <div className={mCss.content}>
        <PullRefresh onRefresh={onRefreshData}>
          <List finished={finished} onLoad={onLoadRefreshData} finishedText="没有更多了">
            {billList.map((item, index) => (
              <BillItem bill={item} key={index} />
            ))}
          </List>
        </PullRefresh>
      </div>
    </div>
  );
};

export default Home;

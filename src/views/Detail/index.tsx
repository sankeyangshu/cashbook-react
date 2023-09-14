import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Dialog, Toast } from 'react-vant';
import { getBillDetailAPI, removeBillDetailAPI } from '@/api/bill';
import { billDetailType } from '@/types/bill';
import { IconList } from '@/utils';
import BillPopupAdd, { billAddRefType } from '@/components/BillPopupAdd';
import dayjs from 'dayjs';
import Header from '@/components/Header';
import CustomIcon from '@/components/CustomIcon';
import mCss from './index.module.less';

const Detail = () => {
  // 获取路由传递的参数
  const navigateTo = useNavigate();
  const [params] = useSearchParams();
  const id = params.get('id') as string;

  const [billDetail, setbillDetail] = useState<billDetailType>();

  const billEditRef = useRef<billAddRefType>(null); // 编辑账单ref

  // 获取账单详情
  const getBillDetails = async () => {
    const { data } = await getBillDetailAPI({ id });
    setbillDetail(data);
  };

  useEffect(() => {
    getBillDetails();
  }, []);

  // 删除账单
  const onClickDeleteDetail = () => {
    Dialog.confirm({
      title: '删除',
      message: '确认删除账单吗?',
      onConfirm: async () => {
        await removeBillDetailAPI({ id });
        Toast.success('删除成功');
        navigateTo(-1);
      },
      onCancel: () => {
        Toast.info('取消删除');
      },
    });
  };

  // 编辑账单
  const onClickEditDetail = () => {
    billEditRef.current && billEditRef.current.show();
  };

  return (
    <div className={mCss.detail}>
      <Header title="账单详情" />
      <div className={mCss.card}>
        <div className={mCss.type}>
          <span
            className={`${billDetail?.pay_type === 1 && mCss.expense} ${
              billDetail?.pay_type === 2 && mCss.income
            }`}
          >
            <CustomIcon
              className={mCss.icon}
              name={billDetail?.type_id ? IconList[billDetail.type_id - 1] : 'qita'}
            />
          </span>
          <span>{billDetail?.type_name || ''}</span>
        </div>
        {billDetail?.pay_type === 1 ? (
          <div className={`${mCss.amount} ${mCss.expense}`}>-{billDetail.amount}</div>
        ) : (
          <div className={`${mCss.amount} ${mCss.income}`}>+{billDetail?.amount}</div>
        )}
        <div className={mCss.info}>
          <div className={mCss.time}>
            <span>记录时间</span>
            <span>{dayjs(Number(billDetail?.date)).format('YYYY-MM-DD HH:mm')}</span>
          </div>
          <div className={mCss.remark}>
            <span>备注</span>
            <span>{billDetail?.remark || '-'}</span>
          </div>
        </div>
        <div className={mCss.operation}>
          <span onClick={onClickDeleteDetail}>
            <CustomIcon name="shanchu" />
            删除
          </span>
          <span onClick={onClickEditDetail}>
            <CustomIcon name="tianjia" />
            编辑
          </span>
        </div>
      </div>
      <BillPopupAdd ref={billEditRef} billDetail={billDetail} onReload={getBillDetails} />
    </div>
  );
};

export default Detail;

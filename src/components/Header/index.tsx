import { NavBar } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

interface HeaderPropsType {
  title: string;
}

const Header: FC<HeaderPropsType> = ({ title = '' }) => {
  const navigate = useNavigate();

  return <NavBar title={title} fixed placeholder onClickLeft={() => navigate(-1)} />;
};

export default Header;

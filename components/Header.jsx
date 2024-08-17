import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/store/atom';
import styled from 'styled-components';
import { useState } from 'react';
import Search from "@/components/Search";
const Header = () => {

  const router = useRouter();
  const { isLogin } = useRecoilValue(loginState);
    console.log('isLogin',isLogin)
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/login');
  };

  const mainHome = () => {
    router.push('/main');
  };

  const myProfilePage = () => {
    router.push('/profile');
  };

  const postPage = () => {
    router.push('/post');
  };


  return (
    <HeaderWrapper>
      <div>
        <LinkStyle onClick={mainHome}>
            <InfoRound>홈</InfoRound>
        </LinkStyle>
      </div>
      <HeaderRight>
        <Search />
        <CustomBtn onClick={postPage}>새 글 작성</CustomBtn>
        <CustomBtn onClick={myProfilePage}>프로필</CustomBtn>
        <CustomBtn onClick={handleLogout}>Logout</CustomBtn>
      </HeaderRight>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #f5f6fa;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #e5e5e5;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  > P {
    margin: 20px;
    font-size: 20px;
    font-weight: 600;
  }
`;

const LinkStyle = styled.div`
  text-decoration: none;
  color: #212529;
  font-size: 20px;
  font-weight: 600;
  position: relative;
`;

const CustomBtn = styled.button`
  height: 2rem;
  margin-right: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  border-radius: 1rem;
  outline: none;
  font-weight: bold;
  word-break: keep-all;
  background: #f8f9fa;
  border: 1px solid #212529;
  color: #212529;
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  &:hover {
    background: #212529;
    color: #f8f9fa;
  }
`;

const InfoRound = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #005bb5;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

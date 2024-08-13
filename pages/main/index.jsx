import React, { useEffect, useState } from 'react';
import { logout } from "@/apis/auth/auth.api";
import { getItems } from "@/apis/item/item.api";
import { useRouter } from 'next/router';

function MainPage(props) {
    const router = useRouter();

    useEffect(()=>{
        handlegetItem()
      },[])
      
      const handlegetItem = async () => {
        try {
          const result = await getItems();
          console.log('아이탬',result)
        } catch (error) {
          console.error('아이탬 가져오기 오류:', error);
        }
      };

    const logoutBtn = async () => {
        try {
            const result = await logout();
            console.log('로그아웃 API 응답:', result); // 로그아웃 API의 응답을 확인

            if(result) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.clear();
                console.log('로컬스토리지 토큰 삭제 완료');
                router.push('/');
            } else {
                console.log('로그아웃 실패 또는 응답 없음');
            }
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
        }
    };

    return (
        <div>
            로그인 성공 ㅊㅊ
            <p onClick={logoutBtn}>로그아웃</p>
        </div>
    );
}

export default MainPage;

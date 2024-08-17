import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Profile(props) {


    return (
        <Container>
            <h1>여기 뭘 설정 할 것인지 고민하기</h1>
        </Container>
    );
}

export default Profile;


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f0f2f5;
    margin-top: 50px;
`;

const ItemCard = styled.div`
    width: 100%;
    max-width: 600px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
    transition: box-shadow 0.3s ease;
    
    &:hover {
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
    }
`;

const Title = styled.h2`
    font-size: 20px;
    margin-bottom: 10px;
    color: #333;
`;

const Content = styled.p`
    font-size: 16px;
    margin-bottom: 15px;
    color: #555;
`;

const LikeCount = styled.span`
    font-size: 14px;
    color: #777;
`;


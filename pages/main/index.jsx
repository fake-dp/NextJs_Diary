import React, { useEffect, useState } from 'react';
import { getItems, deleteItems, patchItems, itemLike, itemUnlike } from "@/apis/item/item.api";
import styled from 'styled-components';
import withAuth from '@/hooks/withAuth';
import { useRecoilState } from "recoil";
import { itemListState } from "@/store/atom";
import { useRouter } from 'next/router';
function MainPage() {
    const router = useRouter();
    const [items, setItems] = useRecoilState(itemListState);
    const [editingId, setEditingId] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState(''); 
    console.log('items',items)
    useEffect(() => {
        handleGetItems();
    }, []);

    const handleGetItems = async () => {
        try {
            const result = await getItems();
            setItems(result);
        } catch (error) {
            console.error('아이템 가져오기 오류:', error);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            await deleteItems(id);
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('삭제 오류:', error);
        }
    };

    const handleEdit = (e,id, currentTitle, currentContent) => {
        e.stopPropagation();
        setEditingId(id);
        setNewTitle(currentTitle);
        setNewContent(currentContent);
    };

    const handleSaveEdit = async (e,id) => {
        e.stopPropagation();
        try {
            const updatedItem = await patchItems(id, { title: newTitle, content: newContent });
            setItems(items.map(item => item.id === id ? updatedItem : item));
            setEditingId(null); 
        } catch (error) {
            console.error('수정 오류:', error.respons);
        }
    };

    const handleCancelEdit = (e) => {
        e.stopPropagation();
        setEditingId(null);
        setNewTitle(''); 
        setNewContent('');
    };

    const handleLike = async (e, id) => {
        e.stopPropagation();
        try {
            const likedItem = await itemLike(id);
            console.log('likedItem',likedItem)
            // setItems(items.map(item => item.id === id ? { ...item, likeCount: likedItem.likeCount } : item));
            handleGetItems()
        } catch (error) {
            console.error('좋아요 오류:', error);
        }
    };

    const handleUnlike = async (e, id) => {
        e.stopPropagation();
        try {
            const unlikedItem = await itemUnlike(id);
            console.log('unlikedItem',unlikedItem)
            // setItems((prevItems) =>
            //     prevItems.map(item =>
            //         item.id === id ? { ...item, likeCount: unlikedItem.likeCount } : item
            //     )
            // );
        } catch (error) {
            console.error('싫어요 오류:', error);
        }
    };
    

    const detailPage = (id) => {
        if (editingId !== id) {
            router.push(`/detail/${id}`);
        }
    };

    return (
        <Container>
            {items.map((item) => (
                <ItemCard key={item.id} onClick={() => detailPage(item.id)}>
                    {editingId === item.id ? (
                        <div>
                            <Input
                                value={newTitle}
                                onClick={(e) => e.stopPropagation()} 
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                            <TextArea
                                value={newContent}
                                onClick={(e) => e.stopPropagation()} 
                                onChange={(e) => setNewContent(e.target.value)}
                            />
                            <ButtonContainer>
                                <Button onClick={(e) => handleCancelEdit(e)}>취소</Button>
                                <Button onClick={(e) => handleSaveEdit(e,item.id)}>저장</Button>
                            </ButtonContainer>
                        </div>
                    ) : (
                        <>
                            <Title>{item.title}</Title>
                            <Content>{item.content}</Content>
                            <LikeCount>좋아요: {item.likeCount}</LikeCount>
                            <ButtonContainer>
                                <LikeButton onClick={(e) => handleLike(e, item.id)}>좋아요</LikeButton>
                                <UnlikeButton onClick={(e) => handleUnlike(e, item.id)}>싫어요</UnlikeButton>
                                <Button onClick={(e) => handleEdit(e, item.id, item.title, item.content)}>수정</Button>
                                <Button onClick={(e) => handleDelete(e, item.id)}>삭제</Button>
                            </ButtonContainer>
                        </>
                    )}
                </ItemCard>
            ))}
        </Container>
    );
}

export default withAuth(MainPage);


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
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
    cursor: pointer;
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
`;

const Button = styled.button`
    padding: 8px 12px;
    font-size: 14px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    & + & {
        margin-left: 10px;
    }
`;

const LikeButton = styled(Button)`
    background-color: #28a745;

    &:hover {
        background-color: #218838;
    }
`;

const UnlikeButton = styled(Button)`
    background-color: #dc3545;

    &:hover {
        background-color: #c82333;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    margin-bottom: 10px;

    &:focus {
        border-color: #888;
        outline: none;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    resize: vertical;

    &:focus {
        border-color: #888;
        outline: none;
    }
`;

/* 
 * API 요청 및 뉴스 데이터가 들어 있는 배열을 컴포넌트 배열로 변환하여 렌더링해 주는 컴포넌트
 */ 

import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';


const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const NewsList = ({ category }) => {
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=25981a230a9049aebdb8dc79e277454a`,);
    }, [category]);

    // 대기 중
    if(loading) {
        return <NewsListBlock>대기중 ...</NewsListBlock>;
    }

    // 아직 response 값이 설정되지 않았을 경우
    if(!response) {
        return null;
    }

    // 에러가 발생할 경우
    if(error) {
        return <NewsListBlock>에러 발생</NewsListBlock>
    }

    // response 데이터가 유효할 경우
    const { articles } = response.data;
    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;
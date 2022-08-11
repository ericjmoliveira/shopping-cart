import styled from 'styled-components';

export const Container = styled.div`
    h2 {
        color: #000;
    }
`;

export const Category = styled.div`
    margin: 40px 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;

    @media (max-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 40px;
    }
`;

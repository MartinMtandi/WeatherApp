import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'react-feather';

interface CarouselProps {
  children: React.ReactNode[];
  itemsPerPage?: number;
}

const Carousel: React.FC<CarouselProps> = ({ children, itemsPerPage = 2 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(children.length / itemsPerPage);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * itemsPerPage;
  const visibleItems = children.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container>
      <ButtonWrapper position="left">
        <Button onClick={handlePrev} disabled={totalPages <= 1}>
          <ChevronLeft size={20} />
        </Button>
      </ButtonWrapper>
      <Content>
        {visibleItems}
      </Content>
      <ButtonWrapper position="right">
        <Button onClick={handleNext} disabled={totalPages <= 1}>
          <ChevronRight size={20} />
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  
  & > * {
    flex: 1;
    min-width: 0;
  }
`;

const ButtonWrapper = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.position === 'left' ? 'left: -40px;' : 'right: -40px;'}
  z-index: 1;
`;

const Button = styled.button<{ disabled?: boolean }>`
  background: transparent;
  border: none;
  color: ${props => props.disabled ? '#6b7280' : '#ddd'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: scale(1.1);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;

export default Carousel;

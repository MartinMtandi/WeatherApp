import React from 'react';
import styled from 'styled-components';
import Typography from './Typography';
import WindIcon from './icons/WindIcon';
import HumidityIcon from './icons/HumidityIcon';
import UVIcon from './icons/UVIcon';
import PressureIcon from './icons/PressureIcon';

interface SquareProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  type: 'wind' | 'humidity' | 'uv' | 'pressure';
}

const Square: React.FC<SquareProps> = ({ title, value, unit, subtitle, type }) => {
  const renderIcon = () => {
    switch (type) {
      case 'wind':
        return <WindIcon />;
      case 'humidity':
        return <HumidityIcon value={Number(value)} />;
      case 'uv':
        return <UVIcon value={Number(value)} />;
      case 'pressure':
        return <PressureIcon />;
      default:
        return null;
    }
  };

  return (
    <Container data-testid={`${type}-square`}>
      <Header>
        <Typography fontSize='14px' fontWeight='300'>{title}</Typography>
        {type === 'wind' && <DirectionLabel>N</DirectionLabel>}
      </Header>
      <Content>
        <IconContainer>
          {renderIcon()}
        </IconContainer>
        <ValueContainer>
          <Value>
            <Typography data-testid={`${type}-value`} fontSize='24px' fontWeight='500'>{value}</Typography>
            {unit && <Typography data-testid={`${type}-unit`} fontSize='14px' fontWeight='300'>{unit}</Typography>}
          </Value>
          {subtitle && (
            <Typography fontSize='12px' color='#6b7280' fontWeight='300'>
              {subtitle}
            </Typography>
          )}
        </ValueContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background: #011D33;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DirectionLabel = styled.div`
  color: #ddd;
  font-size: 14px;
  font-weight: 300;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
`;

const ValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Value = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

export default Square;

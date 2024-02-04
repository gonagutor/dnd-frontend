import * as React from 'react';
import Card from '@mui/joy/Card';
import { DashboardPage } from 'admin/components/DashboardPage';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-right: 1rem;
  gap: 1rem;
`;

export function Index() {
  return (
    <DashboardPage currentPage="dashboard">
      <Container>
        <Card variant="solid" style={{ minWidth: '320px', flexGrow: 1 }}>
          <h3>New users</h3>
          <div style={{ height: '4rem' }} />
        </Card>
        <Card
          variant="solid"
          style={{ minWidth: '320px', flexGrow: 1, background: 'darkorange' }}
        >
          <h3>New users</h3>
          <div style={{ height: '4rem' }} />
        </Card>
      </Container>
    </DashboardPage>
  );
}

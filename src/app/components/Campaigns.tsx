import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export default function Campaigns() {
  const { t } = useTranslation('titles');
  return (
    <CampaignsContainer>
      <CampaignsTitle>{t('campaignList')}</CampaignsTitle>
      <CampaingList />
    </CampaignsContainer>
  );
}

const CampaignsContainer = styled.div`
  flex-shrink: 0;
  margin: 1rem;
`;

const CampaignsTitle = styled.h2`
  color: var(--text-lighter, #d3bb7c);
  text-shadow: 0px 0px 4px #301005;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 1rem;
`;

const CampaingList = () => {
  const campaigns: JSX.Element[] = [];
  return <div>{campaigns}</div>;
};

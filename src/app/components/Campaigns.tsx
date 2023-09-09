import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import defaultImage from '../assets/barbarian.png';

export default function Campaigns() {
  const { t } = useTranslation('titles');
  return (
    <CampaignsContainer>
      <CampaignsTitle>{t('campaignList')}</CampaignsTitle>
      <CampaingList campaigns={10} />
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

const Campaign = styled.div`
  display: flex;
  width: 20rem;
  height: 15rem;
  padding: 1rem;
  margin-right: 1rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: var(--Border-Radius-XS, 2rem) var(--Border-Radius-XS, 2rem)
    var(--Border-Radius-S, 4rem) var(--Border-Radius-XS, 2rem);
`;

const CampaignListContainer = styled.div`
  display: flex;
  overflow: scroll;
`;

const CampaignLore = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-shrink: 0;
  font-size: 0.8rem;

  color: var(--text-loader, #e7d8b0);
  text-shadow: 0px 0px 4px #301005;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: normal;
`;

const CampaignName = styled.h3`
  color: var(--text-loader, #e7d8b0);
  text-shadow: 0px 0px 4px #301005;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CampaingList = ({ campaigns }: { campaigns: number }) => {
  const camps: JSX.Element[] = [];
  for (let i = 0; i < campaigns; i++) {
    camps.push(
      <Campaign
        style={{
          background: `url(${defaultImage})`,
          backgroundSize: 'cover',
        }}
      >
        <CampaignLore>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui hic at
          officia vel quod! Quod assumenda, harum velit ducimus, nihil officiis
          animi totam porro dolores illo veniam. Quaerat, ipsa possimus!
        </CampaignLore>
        <CampaignName>Curse of Strahd</CampaignName>
      </Campaign>,
    );
  }
  return <CampaignListContainer>{camps}</CampaignListContainer>;
};

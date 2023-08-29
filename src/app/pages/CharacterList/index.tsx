import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function CharacterList() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>My HomePage</span>
    </>
  );
}

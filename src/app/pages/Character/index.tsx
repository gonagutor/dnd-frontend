import * as React from 'react';
import Navbar from 'app/components/Navbar';
import Title from 'app/components/Title';
import Characters from 'app/components/Characters';

export function Character() {
  return (
    <div>
      <Title />
      <Characters />
      <Navbar />
    </div>
  );
}

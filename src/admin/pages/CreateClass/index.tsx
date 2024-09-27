import * as React from 'react';
import { DashboardPage } from 'admin/components/DashboardPage';
import styled from 'styled-components';
import _ from 'lodash';
import MultiLocalizedInput from 'admin/components/forms/MultilocalizedInput';

const Container = styled.div``;

export function CreateClass() {
  const [dndClass, setDndClass] = React.useState({});

  const setField =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setDndClass(_.set({ ...dndClass }, field, e.currentTarget.value));

  const setFieldAsNumber =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setDndClass(_.set({ ...dndClass }, field, e.currentTarget.valueAsNumber));

  const setTranslatableField =
    (field: string) => (translations: Record<string, string>) => {
      setDndClass({
        ...dndClass,
        [field]: translations,
      });
    };

  React.useEffect(() => {
    console.log(dndClass);
  }, [dndClass]);

  return (
    <DashboardPage currentPage="class">
      <Container>
        <section>
          <label>
            Short name{' '}
            <input
              type="text"
              onChange={setField('shortname')}
              placeholder="short-name"
              value={dndClass['shortname']}
            />
          </label>
          <MultiLocalizedInput
            field="Name"
            setLocalizedField={setTranslatableField('name')}
          />
          <div>
            <label>
              Source{' '}
              <input
                type="text"
                onChange={setField('source')}
                placeholder="source"
                value={dndClass['source']}
              />
            </label>
            <label>
              Page{' '}
              <input
                type="number"
                onChange={setFieldAsNumber('page')}
                placeholder="page"
                value={dndClass['page']}
              />
            </label>
          </div>
          <div>
            <label>
              Dice count{' '}
              <input
                type="number"
                onChange={setFieldAsNumber('hitDice.count')}
                placeholder="Dice count"
                value={dndClass['hitDice.count']}
              />
            </label>
            <label>
              Dice sides{' '}
              <input
                type="number"
                onChange={setFieldAsNumber('hitDice.faces')}
                placeholder="Dice sides"
                value={dndClass['hitDice.faces']}
              />
            </label>
          </div>
        </section>
        <section>
          <div></div>
        </section>
      </Container>
    </DashboardPage>
  );
}

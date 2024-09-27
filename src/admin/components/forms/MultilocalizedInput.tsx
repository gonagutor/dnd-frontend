import React from 'react';
import LocalizedInput from './LocalizedInput';

export default function MultiLocalizedInput({
  field,
  setLocalizedField,
}: Readonly<{
  field: string;
  setLocalizedField: (translations: Record<string, string>) => void;
}>) {
  const [translations, setTranslations] = React.useState<Array<Array<string>>>(
    [],
  );

  const addTranslation = () => setTranslations([...translations, ['', '']]);

  const editText = (index: number) => (text: string) => {
    const newTranslations = [...translations];
    newTranslations[index][1] = text;

    setTranslations(newTranslations);
  };

  const editKey = (index: number) => (key: string) => {
    const newTranslations = [...translations];
    newTranslations[index][0] = key;

    setTranslations(newTranslations);
  };

  React.useEffect(() => {
    const localizedFields: Record<string, string> = {};
    translations.forEach(
      translation => (localizedFields[translation[0]] = translation[1]),
    );

    setLocalizedField(localizedFields);
  }, [translations]);

  return (
    <div>
      <label>{field}</label>
      <div>
        <span>Language code</span> <span>Translation</span>
        <button onClick={addTranslation}>+</button>
      </div>
      <ul>
        {translations.map((value, index) => (
          <LocalizedInput
            key={`${field}-${index}`}
            translation={value}
            editKey={editKey(index)}
            editText={editText(index)}
          />
        ))}
      </ul>
    </div>
  );
}

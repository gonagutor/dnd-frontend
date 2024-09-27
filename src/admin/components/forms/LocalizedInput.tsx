import React from 'react';

export default function LocalizedInput({
  translation,
  editKey,
  editText,
}: Readonly<{
  translation: Array<string>;
  editKey: (key: string) => void;
  editText: (text: string) => void;
}>) {
  const [key, text] = translation;

  return (
    <li>
      <input
        type="text"
        onChange={e => editKey(e.currentTarget.value)}
        value={key}
      />
      <input
        type="text"
        onChange={e => editText(e.currentTarget.value)}
        value={text}
      />
    </li>
  );
}

import React from 'react';
import { Clazz } from 'common/models/class.model';

export const CreateClassContext = React.createContext<Clazz>({});
export const CreateClassProvided = CreateClassContext.Provider;
export const CreateClassConsumer = CreateClassContext.Consumer;

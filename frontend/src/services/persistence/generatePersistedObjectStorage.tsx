import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { usePersistence } from "./PersistenceContext";

export type PersistedObject<T> = {
  createdAt: Date;
  id: string;
} & T;

export type PersistedObjectService<TCreateObject, TObjectName extends string> =
  Record<`${Uncapitalize<TObjectName>}s`, PersistedObject<TCreateObject>[]>
  & Record<`add${Capitalize<TObjectName>}`, (object: TCreateObject) => PersistedObject<TCreateObject>>
  & Record<`remove${Capitalize<TObjectName>}ById`, (id: string) => boolean>
  & Record<`remove${Capitalize<TObjectName>}`, (object: PersistedObject<TCreateObject>) => boolean>
  & Record<`set${Capitalize<TObjectName>}s`, (objects: PersistedObject<TCreateObject>[]) => void>;

export function generatePersistedObjectStorage<TCreateObject, TObjectName extends string>(
  objectName: TObjectName,
  persistenceKey: string,
  parsePersistedObjects: (persistedObjects: string | null) => PersistedObject<TCreateObject>[],
  stringifyPersistedObjects: (persistedObjects: PersistedObject<TCreateObject>[]) => string
): {
  provider: (props: PropsWithChildren) => JSX.Element;
  useObjects: () => PersistedObjectService<TCreateObject, TObjectName>;
  context: React.Context<PersistedObjectService<TCreateObject, TObjectName> | null>;
} {
  const context = createContext<PersistedObjectService<TCreateObject, TObjectName> | null>(null);

  const PersistedObjectStorageProvider = (props: PropsWithChildren): JSX.Element => {
    const persistence = usePersistence();
    const [persistedObjects, setPersistedObjects] = useState<PersistedObject<TCreateObject>[]>([]);

    useEffect(() => {
      const parsedFromPersistence = parsePersistedObjects(persistence.get(persistenceKey));
      setPersistedObjects(parsedFromPersistence);
    }, [
      persistence,
      setPersistedObjects,
      parsePersistedObjects,
      persistenceKey
    ]);

    const setPersistedObjectsAndPersist = useCallback(
      (newPersistedObjects: PersistedObject<TCreateObject>[]): void => {
        setPersistedObjects(newPersistedObjects);
        persistence.set(persistenceKey, stringifyPersistedObjects(newPersistedObjects));
      },
      [
        persistence,
        setPersistedObjects,
        stringifyPersistedObjects,
        persistenceKey
      ]
    );

    const addPersistedObject = useCallback(
      (createPersistedObject: TCreateObject): PersistedObject<TCreateObject> => {
        const persistedObject = {
          ...createPersistedObject,
          createdAt: new Date(),
          id: uuidv4()
        };

        const newPersistedObjects = [...persistedObjects, persistedObject];

        setPersistedObjectsAndPersist(newPersistedObjects);
        return persistedObject;
      },
      [
        persistedObjects,
        setPersistedObjectsAndPersist
      ]
    );

    const removePersistedObjectById = useCallback(
      (id: string): boolean => {
        const newPersistedObjects = persistedObjects.filter(favorite => {
          if (favorite.id === id) {
            return false;
          }

          return true;
        });

        if (newPersistedObjects.length > 0) {
          return false;
        }

        setPersistedObjectsAndPersist(newPersistedObjects);
        return true;
      },
      [
        persistedObjects,
        setPersistedObjectsAndPersist
      ]
    );

    const removePersistedObject = useCallback(
      (persistedObject: PersistedObject<TCreateObject>): boolean => removePersistedObjectById(persistedObject.id),
      [
        removePersistedObjectById
      ]
    );

    const objectNameUncapitalized = objectName.charAt(0).toLowerCase() + objectName.slice(1);
    const objectNameCapitalized = objectName.charAt(0).toUpperCase() + objectName.slice(1);

    const providerValue = {
      ["add" + objectNameCapitalized]: addPersistedObject,
      ["remove" + objectNameCapitalized + "ById"]: removePersistedObjectById,
      ["remove" + objectNameCapitalized]: removePersistedObject,
      ["set" + objectNameCapitalized + "s"]: setPersistedObjectsAndPersist,
      [objectNameUncapitalized + "s"]: persistedObjects
    } as PersistedObjectService<TCreateObject, TObjectName>;

    return (
      <context.Provider value={providerValue}>
        {props.children}
      </context.Provider>
    );
  };

  const useObjects = (): PersistedObjectService<TCreateObject, TObjectName> => {
    const persistedObjectService = useContext(context);

    if (persistedObjectService === null) {
      throw new Error("useObjects must be used within a ContextProvider.");
    }

    return persistedObjectService;
  };

  return {
    provider: PersistedObjectStorageProvider,
    useObjects,
    context
  };
}

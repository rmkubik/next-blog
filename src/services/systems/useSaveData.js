import { mergeDeepRight, update } from "ramda";

import useLocalStorage from "../useLocalStorage";

const useSaveData = () => {
  const [saveData, setSaveData] = useLocalStorage(
    "com.ryankubik.decoding-systems",
    {
      systems: [],
    }
  );

  const getSystem = (key) => {
    const savedSystem = saveData.systems.find((system) => system.key === key);

    return (
      savedSystem || {
        key,
        stars: 0,
      }
    );
  };

  const setSystem = (key) => (data) => {
    const systemIndex = saveData.systems.findIndex(
      (system) => system.key === key
    );

    const system = getSystem(key);
    const newSystemData = mergeDeepRight(system, data);
    const newSystems =
      systemIndex > -1
        ? update(systemIndex, newSystemData, saveData.systems)
        : [newSystemData];

    const newSaveData = mergeDeepRight(saveData, { systems: newSystems });

    setSaveData(newSaveData);
  };

  return {
    getSystem,
    saveData,
    setSystem,
  };
};

export default useSaveData;

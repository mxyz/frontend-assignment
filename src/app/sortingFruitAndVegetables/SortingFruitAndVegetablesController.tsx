import { IItem, ITEM_TYPE } from "~/pages";
import ItemListPresenter from "./presenters/ItemListPresenter";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import useGetUsers from "~/hooks/useGetUsers";

interface IPropsSortingFruitAndVegetablesController {
  ssgProps: { itemList: IItem[] };
}

const SortingFruitAndVegetablesController = (
  props: IPropsSortingFruitAndVegetablesController
) => {
  const {
    ssgProps: { itemList },
  } = props;

  const { departments } = useGetUsers();
  const [fruitAndVegetableList, setFruitAndVegetableList] = useState<IItem[]>(
    []
  );
  const [fruitList, setFruitList] = useState<IItem[]>([]);
  const [vegetableList, setVegetableList] = useState<IItem[]>([]);
  const [timeoutIds, setTimeoutIds] = useState<{
    [key: string]: NodeJS.Timeout;
  }>({});
  // print department data once
  useEffect(() => {
    if (departments) {
      console.log("Departments Data", departments);
    }
  }, [departments]);

  useEffect(() => {
    if (itemList) {
      setFruitAndVegetableList(itemList);
    }
  }, [itemList]);

  const onClickItemInSpecificList = useCallback(
    (item: IItem) => {
      console.log(fruitAndVegetableList);
      switch (item.type) {
        case ITEM_TYPE.FRUIT:
          setFruitList((prevState) =>
            prevState.filter((prevItem) => prevItem.name !== item.name)
          );
          break;
        case ITEM_TYPE.VEGETABLE:
          setVegetableList((prevState) =>
            prevState.filter((prevItem) => prevItem.name !== item.name)
          );
          break;
      }
      setFruitAndVegetableList((prevState) => [...prevState, item]);
      if (timeoutIds[item.name]) {
        clearTimeout(timeoutIds[item.name]); // Clear the corresponding timeout
      }
    },
    [fruitAndVegetableList, timeoutIds]
  );

  const onClickItemInList = useCallback((item: IItem) => {
    setFruitAndVegetableList((prevState) =>
      prevState.filter((prevItem) => prevItem.name !== item.name)
    );
    switch (item.type) {
      case ITEM_TYPE.FRUIT:
        setFruitList((fruit) => [...fruit, item]);
        break;
      case ITEM_TYPE.VEGETABLE:
        setVegetableList((vegetable) => [...vegetable, item]);
        break;
    }
    const timeoutId = setTimeout(() => {
      setFruitList((prevState) => prevState.filter((fruit) => fruit !== item));
      setVegetableList((prevState) =>
        prevState.filter((vegetable) => vegetable !== item)
      );
      setFruitAndVegetableList((prevState) => [...prevState, item]);
    }, 5000);
    setTimeoutIds((prevState) => ({ ...prevState, [item.name]: timeoutId }));
  }, []);

  return (
    <div className="container mx-auto px-16 pb-16 md:px-0">
      <section id="assignment-1">
        <div>1. Auto Delete Todo List</div>
        <div className="flex space-x-8 min-h-[60vh] ">
          <ItemListPresenter
            className="w-1/3"
            itemList={fruitAndVegetableList}
            onItemClick={onClickItemInList}
          />
          <ItemListPresenter
            className="w-1/3"
            itemList={fruitList}
            onItemClick={onClickItemInSpecificList}
            type={ITEM_TYPE.FRUIT}
          />
          <ItemListPresenter
            className="w-1/3"
            itemList={vegetableList}
            onItemClick={onClickItemInSpecificList}
            type={ITEM_TYPE.VEGETABLE}
          />
        </div>
      </section>
      <section id="assignment-2">
        <div>2. Create data from API (OPTIONAL)</div>
        <div className="italic text-red-500">
          *Please see the easier reading list in Console
        </div>
        <div>{JSON.stringify(departments, null, 2)}</div>
      </section>
    </div>
  );
};
export default SortingFruitAndVegetablesController;

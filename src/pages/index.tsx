import { GetStaticProps } from "next";
import SortingFruitAndVegetablesController from "~/app/sortingFruitAndVegetables/SortingFruitAndVegetablesController";

export enum ITEM_TYPE {
  FRUIT = "Fruit",
  VEGETABLE = "Vegetable",
}

export interface IItem {
  type: ITEM_TYPE;
  name: string;
}

// change type into enum for easier usage
export const ITEM_LIST: IItem[] = [
  {
    type: ITEM_TYPE.FRUIT,
    name: "Apple",
  },
  {
    type: ITEM_TYPE.VEGETABLE,
    name: "Broccoli",
  },
  {
    type: ITEM_TYPE.VEGETABLE,
    name: "Mushroom",
  },
  {
    type: ITEM_TYPE.FRUIT,
    name: "Banana",
  },
  {
    type: ITEM_TYPE.VEGETABLE,
    name: "Tomato",
  },
  {
    type: ITEM_TYPE.FRUIT,
    name: "Orange",
  },
  {
    type: ITEM_TYPE.FRUIT,
    name: "Mango",
  },
  {
    type: ITEM_TYPE.FRUIT,
    name: "Pineapple",
  },
  {
    type: ITEM_TYPE.VEGETABLE,
    name: "Cucumber",
  },
  {
    type: ITEM_TYPE.FRUIT,
    name: "Watermelon",
  },
  {
    type: ITEM_TYPE.VEGETABLE,
    name: "Carrot",
  },
];

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      itemList: ITEM_LIST,
    },
    revalidate: 86400, // 1 day
  };
};

export default SortingFruitAndVegetablesController;

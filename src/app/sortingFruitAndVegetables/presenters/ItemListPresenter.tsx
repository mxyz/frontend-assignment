import { IItem, ITEM_TYPE } from "~/pages";
import ItemButton from "../components/ItemButton";
import classNames from "classnames";

export interface IPropsItemListPresenter {
  className?: string;
  itemList: IItem[];
  onItemClick: (item: IItem) => void;
  type?: ITEM_TYPE;
}

const ItemListPresenter = (props: IPropsItemListPresenter) => {
  const { className, itemList, onItemClick, type } = props;
  return (
    <div
      className={classNames(
        "flex flex-col space-y-2",
        {
          "border-solid border-2 border-gray-400": type,
        },
        className
      )}
    >
      {type && (
        <div className="bg-gray-300 justify-center w-full flex">{type}</div>
      )}
      {itemList.map((item, index) => (
        <ItemButton
          key={index}
          label={item.name}
          onClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
};

export default ItemListPresenter;

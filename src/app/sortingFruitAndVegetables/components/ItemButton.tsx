import { useEffect } from "react";

export interface IPropsItemButton {
  label: string;
  onClick?: () => void;
}

const ItemButton = (props: IPropsItemButton) => {
  const { label, onClick } = props;
  return (
    <button
      className="border-solid border-2 border-gray-400 bg-white text-black"
      onClick={onClick}
    >
      {label}
      <></>
    </button>
  );
};

export default ItemButton;

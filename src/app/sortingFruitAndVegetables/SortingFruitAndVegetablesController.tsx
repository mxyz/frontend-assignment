interface IPropsSortingFruitAndVegetablesController {
  ssgProps: { itemList?: { type: string; name: string }[] };
}

const SortingFruitAndVegetablesController = (
  props: IPropsSortingFruitAndVegetablesController
) => {
  const {
    ssgProps: { itemList },
  } = props;

  console.log(itemList);

  return (
    <div className="container mx-auto px-16 pb-16 md:px-0">
      <div>test</div>
    </div>
  );
};
export default SortingFruitAndVegetablesController;

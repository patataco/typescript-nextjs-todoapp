interface CheckboxProps {
  label: string;
  item: SelectedItem;
  selectedItems: Array<SelectedItem>;
  setSelectedItems: (SelectedItem: object) => void;
}
interface SelectedItem {
  id: number;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  selectedItems,
  setSelectedItems,
  item,
}) => {
  return (
    <>
      <input
        type="checkbox"
        id={item.label}
        onChange={() => {
          setSelectedItems(item);
        }}
      />
      <label htmlFor={item.label}>
        <span>{item.label}</span>
      </label>
    </>
  );
};

export default Checkbox;

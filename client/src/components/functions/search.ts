export const searchTodos = (e: any, setFilterData: Function, data: any[]) => {
  const value = e.target.value
    .replace(/ /g, "|")
    .replace(new RegExp("\\\\", "g"), "\\\\")
    .replace(new RegExp("\\+", "g"), "\\+")
    .replace(/,/g, "|")
    .trim();

  const re = new RegExp(value, "gi");

  let filterData = data.filter((todo: any) => {
    return re.test(todo.description);
  });

  filterData = value.length < 1 ? (filterData = []) : filterData;
  setFilterData(filterData);
};

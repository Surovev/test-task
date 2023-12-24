import { useState } from "react"
import { Columns, Test } from "../types/dataType";
import { statusPreority } from "../constants/constants";

type TableProps = {
  renderedData: Test[];
  setRenderedData: React.Dispatch<React.SetStateAction<Test[] | []>>;
}

export const useTable = ({ setRenderedData, renderedData }: TableProps) => {
  const [statusOrder, setStatusOrder] = useState<string>('asc');
  const [typeOrder, setTypeOrder] = useState<string>('');
  const [selectedColumn, setSelectedColumn] = useState<Columns>(Columns.NAME);


  const statusSortHandler = () => {

    setTypeOrder('');
    const arr = renderedData;

    arr.sort(function (a, b) {
      if (statusOrder === 'asc') {
        setStatusOrder('desc');
        return statusPreority[a.status] - statusPreority[b.status];
      } else {
        setStatusOrder('asc');
        return statusPreority[b.status] - statusPreority[a.status];

      }
    });

    setRenderedData(arr)
  }

  const sortHandler = () => {

    renderedData.sort(function (a, b) {

      if (typeOrder === 'asc') {
        setTypeOrder('desc');
        return (a[selectedColumn] ? a[selectedColumn] as string : 'a')!.localeCompare(b[selectedColumn] ? b[selectedColumn] as string : 'a');
      } else {
        setTypeOrder('asc');
        return (b[selectedColumn] ? b[selectedColumn] as string : 'a')!.localeCompare(a[selectedColumn] ? a[selectedColumn] as string : 'a');
      }
    });

    setRenderedData(renderedData)
  }


  return { statusSortHandler, sortHandler, setSelectedColumn, typeOrder, selectedColumn, statusOrder }
}

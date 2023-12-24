import classNames from 'classnames';
import { Columns, Status, Test } from '../../types/dataType';
import { Link } from 'react-router-dom';
import { useTable } from '../../hooks/useTable';

type TableProps = {
    renderedData: Test[];
    setRenderedData: React.Dispatch<React.SetStateAction<Test[] | []>>;
}



function Table({ renderedData, setRenderedData }: TableProps) {

    const { statusSortHandler, sortHandler, setSelectedColumn, typeOrder, selectedColumn, statusOrder } = useTable({ renderedData, setRenderedData });



    const tableNameClass = classNames({ 'table__name table__name_title': true, 'table__name_title-desc': typeOrder === 'desc' && selectedColumn === Columns.NAME, 'table__name_title-asc': typeOrder === 'asc' && selectedColumn === Columns.NAME });
    const tableTypeClass = classNames({ 'table__type table__type_title': true, 'table__type_title-desc': typeOrder === 'desc' && selectedColumn === Columns.TYPE, 'table__type_title-asc': typeOrder === 'asc' && selectedColumn === Columns.TYPE });
    const tableStatusClass = classNames({ 'table__status table__status_title': true, 'table__status_title-desc': statusOrder === 'desc' && selectedColumn === Columns.STATUS, 'table__status_title-asc': statusOrder === 'asc' && selectedColumn === Columns.STATUS });
    const tableSiteClass = classNames({ 'table__site table__site_title': true, 'table__site_title-desc': typeOrder === 'desc' && selectedColumn === Columns.URL, 'table__site_title-asc': typeOrder === 'asc' && selectedColumn === Columns.URL });



    return (
        <>
            <div className="table">
                <div className="table__row table__row_title">
                    <div className={tableNameClass} onClick={() => { setSelectedColumn(Columns.NAME); sortHandler() }}>Name</div>
                    <div className={tableTypeClass} onClick={() => { setSelectedColumn(Columns.TYPE); sortHandler() }}>Type</div>
                    <div className={tableStatusClass} onClick={() => { setSelectedColumn(Columns.STATUS); statusSortHandler() }}>Status</div>
                    <div className={tableSiteClass} onClick={() => { setSelectedColumn(Columns.URL); sortHandler() }}>SITE</div>
                </div>
                {renderedData.map(element => {
                    return <div key={element.id} className={"table__row " + (element.status)}>
                        <div className="table__name">{element.name}</div>
                        <div className="table__type">{element.type}</div>
                        <div className={"table__status " + (element.status)}>{element.status}</div>
                        <div className="table__site">{element.url ? element.url.replace(/^https?:\/\//, '') : ''}</div>
                        <div className="table__button-wrap">
                            {element.status === Status.DRAFT ? (<Link to={`finalize/${element.id}`} className="table__button" >Finalize</Link>) : (<Link to={`results/${element.id}`} className="table__button">Results</Link>)}
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default Table;

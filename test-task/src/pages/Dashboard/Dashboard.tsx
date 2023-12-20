import axios from "axios";
import { useEffect, useState } from "react";
import { Site, Test } from "../../types/dataType";
import classNames from 'classnames';

function Dashboard() {

  const [tests, setTests] = useState<[] | Test[]>([]);
  const [sites, setSites] = useState<[] | Site[]>([]);
  const [renderedData, setRenderedData] = useState<[] | Test[]>([]);
  const [mergedTests, setMergedTests] = useState<[] | Test[]>([]);
  const [statusOrder, setStatusOrder] = useState<string>('asc');
  const [typeOrder, setTypeOrder] = useState<string>('');

  const statusPreority = {
    "ONLINE": 1,
    "PAUSED": 2,
    "STOPPED": 3,
    "DRAFT": 4,
  }


  useEffect(() => {
    axios.get<Site[]>('http://localhost:3100/sites')
      .then((response) => {
        setSites(response.data)
      }, (error) => {
        console.log(error);
      });

    axios.get<Test[]>('http://localhost:3100/tests')
      .then((response) => {
        setTests(response.data)
      }, (error) => {
        console.log(error);
      });
  }, [])

  useEffect(() => {

    if (sites.length > 0 && tests.length > 0) {
      const result: any = [];

      tests.forEach((test) => {
        const site = sites.find((o) => {
          if (o.id === test.id) {
            return o.url; // stop searching
          }
        })
        result.push({ ...test, url: site?.url })

      })
      console.log(result);

      setMergedTests(result);
      setRenderedData(mergedTests)

    }

  }, [sites, tests]);

  useEffect(() => {
    if (mergedTests.length > 0) {

    }
  }, [mergedTests])

  const handleFilter = (event: any) => {

    if (event.target.value === '') {
      setRenderedData(mergedTests);
    } else {
      setRenderedData(renderedData.filter(test => {
        return test.name.toLowerCase().includes(event.target.value.toLowerCase());
      }))
    }
  }

  const statusSortHandler = () => {
    const arr = mergedTests;

    arr.sort(function (a, b) {
      if (statusOrder === 'asc') {
        setStatusOrder('desc');
        return statusPreority[a.status] - statusPreority[b.status];
      } else {
        setStatusOrder('asc');
        return statusPreority[b.status] - statusPreority[a.status];

      }
    });

    setMergedTests(arr);
    setRenderedData(arr)
  }

  const sortHandler = (sort: keyof Test) => {

    renderedData.sort(function (a, b) {

      if (typeOrder === 'asc') {
        setTypeOrder('desc');
        return (a[sort] ? a[sort] as string : 'a')!.localeCompare(b[sort] ? b[sort] as string : 'a');
      } else {
        setTypeOrder('asc');
        return (b[sort] ? b[sort] as string : 'a')!.localeCompare(a[sort] ? a[sort] as string : 'a');
      }
    });

    setRenderedData(renderedData)
  }
   
  const tebleNameClass = classNames({'table__name table__name_title': true, 'table__name_title-desc': typeOrder === 'desc', 'table__name_title-asc': typeOrder === 'asc'});



  return (
    <div className="dashboard">
      <h2 className="title">Dashboard</h2>
      <div className="search-form">
        <span className="search-form__icon"></span>
        <input type="text" placeholder="What test are you looking for" className="search-form__input" onChange={(e) => { handleFilter(e) }} />
      </div>
      <div className="table">
        <div className="table__row table__row_title">
          <div className={tebleNameClass} onClick={() => { sortHandler('name') }}>Name</div>
          <div className="table__type table__type_title" onClick={() => { sortHandler('type') }}>Type</div>
          <div className="table__status table__status_title" onClick={statusSortHandler}>Status</div>
          <div className="table__site table__site_title" onClick={() => { sortHandler('url') }}>SITE</div>
        </div>
        {renderedData.map(element => {
          return <div className="table__row">
            <div className="table__name">{element.name}</div>
            <div className="table__type">{element.type}</div>
            <div className="table__status">{element.status}</div>
            <div className="table__site">{element.url ? element.url.replace(/^https?:\/\//, '') : ''}</div>
            <div className="table__button-wrap">
              <button className="table__button">Results</button>
            </div>
          </div>
        })}
      </div>
    </div>
  );
}

export default Dashboard;

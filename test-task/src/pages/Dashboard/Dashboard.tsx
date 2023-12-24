import { useEffect, useState } from "react";
import { Site, Test } from "../../types/dataType";
import Table from "../../components/Table/Table";
import { getSites, getTests } from "../../utils/MainApi";

function Dashboard() {

  const [tests, setTests] = useState<[] | Test[]>([]);
  const [sites, setSites] = useState<[] | Site[]>([]);
  const [renderedData, setRenderedData] = useState<[] | Test[]>([]);
  const [mergedTests, setMergedTests] = useState<[] | Test[]>([]);
  const [searchState, setSearchState] = useState<string>('');


  useEffect(() => {

    getSites
      .then((response) => {
        setSites(response.data);
      }, (error) => {
        console.log(error);
      });

    getTests
      .then((response) => {
        setTests(response.data)
      }, (error) => {
        console.log(error);
      });
  }, [])

  useEffect(() => {
    if (renderedData.length > 0) {
      return;
    }

    if (sites.length > 0 && tests.length > 0) {
      const result: any = [];

      tests.forEach((test) => {
        const site = sites.find((o) => {
          if (o.id === test.id) {
            return o.url;
          }
        })
        result.push({ ...test, url: site?.url })

      })
      console.log(result);

      setMergedTests(result);
      setRenderedData(mergedTests)

    }

  }, [mergedTests, sites, tests]);

  useEffect(() => {
    if (mergedTests.length > 0) {

    }
  }, [mergedTests])

  const handleFilter = (searchValue: string) => {

    if (searchValue === '') {
      setRenderedData(mergedTests);
    } else {
      setRenderedData(renderedData.filter(test => {
        return test.name.toLowerCase().includes(searchValue.toLowerCase());
      }))
    }
  }


  return (
    <div className="dashboard">
      <h2 className="title">Dashboard</h2>
      <div className="search-form">
        <span className="search-form__icon"></span>
        <input value={searchState} type="text" placeholder="What test are you looking for" className="search-form__input" onChange={(e) => { handleFilter(e.target.value); setSearchState(e.target.value) }} />
      </div>
      {renderedData.length > 0 ? (<Table renderedData={renderedData} setRenderedData={setRenderedData} />) :
        (<>
          <div className="table__empty">
            <div className="table__empty-content">
              <p className="table__empty-subtitle">Your search did not match any results.</p>
              <button className="table__button table__button_reset" onClick={() => { setRenderedData(mergedTests); setSearchState('') }}>Reset</button>
            </div>
          </div>
        </>)}
    </div>
  );
}

export default Dashboard;

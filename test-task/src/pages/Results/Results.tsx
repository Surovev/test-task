import { useNavigate } from "react-router-dom";

function Results() {

  const navigate = useNavigate();
  return (
    <div className="result-page">
      <div className="results-page__header">
        <h2 className="result-page__title">Results</h2>
        <p className="result-page__subtitle">Order basket redesing</p>
      </div>
      <div className="result-page__navigate" onClick={() => { navigate(-1) }}>
        <i className="result-page__button-icon"></i>
        <span className="result-page__button">Back</span>
      </div>
    </div>
  );
}

export default Results;

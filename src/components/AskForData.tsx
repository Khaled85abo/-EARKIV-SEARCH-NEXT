import { useRef, useState } from "react";
const BASE_URL =
  "https://elasticsearch-oss-earkiv-dev.apps.k8s.gu.se/sharepoint";
const AskForData = () => {
  const [data, setData] = useState({
    hits: [],
    loading: false,
    error: "",
  });
  const [server, setServer] = useState(true);
  const [url, setUrl] = useState(BASE_URL);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchDataFromServer = async (url: string) => {
    setData((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch("/api/elastic", {
        method: "POST",
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setData((prev) => ({ ...prev, hits: data, error: "" }));
    } catch (error: any) {
      if (error?.message) {
        setData((prev) => ({
          ...prev,
          error: error.message || "There has been an error",
          hits: [],
        }));
      }
    } finally {
      setData((prev) => ({ ...prev, loading: false }));
    }
  };
  const fetchData = async (url: string) => {
    setData((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch(url);
      const data = await res.json();
      setData((prev) => ({ ...prev, hits: data, error: "" }));
    } catch (error: any) {
      if (error?.message) {
        setData((prev) => ({
          ...prev,
          error: error.message || "There has been an error",
          hits: [],
        }));
      }
    } finally {
      setData((prev) => ({ ...prev, loading: false }));
    }
  };

  const getData = async (url: string) => {
    setUrl(url);
    if (server) {
      fetchDataFromServer(url);
    } else {
      fetchData(url);
    }
  };
  return (
    <div>
      <div className="layout layout__container">
        <div className="layout__container layout__container--dynamic u-mt-200 u-pb-150 u-pb-200-large-up">
          <div className="row layout__inner">
            <div className="columns small-12">
              <ul>
                <li className="u-mb-50">
                  <button
                    onClick={() =>
                      getData("https://elasticsearch-oss:9200/sharepoint")
                    }>
                    https://elasticsearch-oss:9200/sharepoint
                  </button>
                </li>
                <li className="u-mb-50">
                  <button
                    onClick={() =>
                      getData("elasticsearch-oss:9200/sharepoint")
                    }>
                    elasticsearch-oss:9200/sharepoint
                  </button>
                </li>
                <li className="u-mb-50">
                  <button
                    onClick={() =>
                      getData("https://172.30.34.183:9200/sharepoint")
                    }>
                    https://172.30.34.183:9200/sharepoint
                  </button>
                </li>
                <li className="u-mb-50">
                  <button
                    onClick={() => getData("172.30.34.183:9200/sharepoint")}>
                    172.30.34.183:9200/sharepoint
                  </button>
                </li>
                <li className="u-mb-50">
                  <button
                    onClick={() =>
                      getData("http://172.30.34.183:9200/sharepoint")
                    }>
                    http://172.30.34.183:9200/sharepoint
                  </button>
                </li>
                <li className="u-mb-50">
                  <button
                    onClick={() => getData("http://127.0.0.1:9200/sharepoint")}>
                    http://127.0.0.1:9200/sharepoint
                  </button>
                </li>
                <li className="u-mb-50">
                  <button
                    onClick={() =>
                      getData(
                        "http://elasticsearch-oss-earkiv-dev.apps.k8s.gu.se/sharepoint"
                      )
                    }>
                    http://elasticsearch-oss-earkiv-dev.apps.k8s.gu.se/sharepoint
                  </button>
                </li>
                <li className="u-mb-50">
                  <button
                    onClick={() =>
                      getData(
                        "https://elasticsearch-oss-earkiv-dev.apps.k8s.gu.se/sharepoint"
                      )
                    }>
                    https://elasticsearch-oss-earkiv-dev.apps.k8s.gu.se/sharepoint
                  </button>
                </li>
                <li className="u-mb-50">
                  <button
                    onClick={() =>
                      getData(
                        "https://elasticsearch-oss-earkiv-dev.apps.k8s.gu.se:9200/sharepoint"
                      )
                    }>
                    https://elasticsearch-oss-earkiv-dev.apps.k8s.gu.se:9200/sharepoint
                  </button>
                </li>
                <li className="u-mb-50">
                  <input type="text" ref={inputRef} />
                  <button
                    onClick={() => getData(inputRef.current?.value || "")}>
                    fetch url
                  </button>
                </li>
                <li className="u-mb-50">
                  <button onClick={() => setServer((prev) => !prev)}>
                    {server ? "Using Server fetch" : "Using client fetch"}
                  </button>
                </li>
              </ul>
            </div>
            <div className="columns small-12 u-mt-100">
              <div>
                URL:<b> {url}</b>
              </div>
            </div>
            <div className="columns small-12 u-mt-100">
              {data.loading ? (
                <h3>Loading...</h3>
              ) : data.error ? (
                <div>{data.error}</div>
              ) : (
                data.hits && <div>{JSON.stringify(data.hits)}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskForData;

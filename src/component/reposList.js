import React, { useCallback, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { AiFillGithub } from "react-icons/ai";
import { SearchInput } from "./search";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { AiFillStar } from "react-icons/ai";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import Toast from 'react-bootstrap/Toast';

const ReposList = () => {

  const sortOptions = [
    { label: "Most stars", sort: "stars" },
    { label: "Watchers count", sort: "forks" },
    { label: "Username", sort: "user" },
    { label: "Created", sort: "created" },
    { label: "Updated", sort: "pushed" },
  ];
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);

  const { q } = useParams();

  const fetchData = useCallback(
    ({ input, sort, order, perPage, pg }) => {
      setLoading(true);

      const queryTerm = `q=` + encodeURIComponent(input || q);
      const querySort = `${sort ? `&sort=${sort}` : ""}`;
      const queryOrder = `${order ? `&order=${order}` : ""}`;
      const queryPerPage = `&per_page=${perPage || 30}`;
      const queryPage = `&page=${page || 1}`;
      const queryString = queryTerm + querySort + queryOrder + queryPerPage + queryPage;

      let url = `https://api.github.com/search/repositories?${queryString}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData({
            totalCount: data.total_count,
            items: data.items,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError(true);
        });
    },
    [page, q]
  );

  useEffect(() => {
    fetchData({ input: q });
  }, [q, page, fetchData]);

  const handleSubmit = (input) => {
    setPage(1);
    fetchData({ input: input });
  };

  const selectSort = (e) => {
    fetchData({ sort: e });
  };

  const handlePagination = (direction) => {
    let offset = page * 31;
    let results = data?.totalCount || 0;
    if (direction === "prev" && page >= 2) {
      setPage(page - 1);
    }
    if (direction === "next" && page > 0 && offset < results) {
      setPage(page + 1);
    }
  };
  return (
    <Container fluid className="p-0">
      <Navbar variant="light" bg="light" fluid>
        <Container fluid>
          <Navbar.Brand href="#">
            <AiFillGithub className="logo" />
          </Navbar.Brand>
          <div className="justify-content-end">
            <SearchInput value={q} onSubmit={handleSubmit} />
          </div>
        </Container>
      </Navbar>

      <div className="d-flex justify-content-end">
        <Dropdown className="d-inline mx-2" onSelect={selectSort}>
          <Dropdown.Toggle id="dropdown-autoclose-true">
            Sort Repositories
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {sortOptions.map((opt) => (
              <Dropdown.Item key={opt.label} eventKey={opt.sort}>
                {opt.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {error && <div className="toaster">
        <Toast onClose={() => setError(false)} show={error}>
          <Toast.Header  >
          </Toast.Header>
          <Toast.Body>Oh no, looks like something went wrong...</Toast.Body>
        </Toast>
      </div>}
      {loading && (
        <div className="spinner">
          <Spinner animation="grow" />
        </div>
      )}
      <div className="cards">
        <div className="cards-list">
          {data?.items !== undefined && data?.items.map((repo) => (
            <Card className="repo-card" key={repo.id}>
              <Card.Img variant="top" src={repo.owner.avatar_url} />
              <Card.Body>
                <Card.Title>{repo.full_name}</Card.Title>
                <Card.Text>{repo.description}</Card.Text>
              </Card.Body>
              <Card.Footer className="repo-card-footer">
                <small className="text-muted">
                  <AiFillStar style={{ marginBottom: "5px" }} />{" "}
                  {repo.stargazers_count}
                </small>
                <small className="text-muted">{repo.language}</small>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>

      <div className="pagination">
        <Pagination>
          <Pagination.Prev
            className="pagination-button"
            onClick={() => handlePagination("prev")}
          />
          <Pagination.Next
            className="pagination-button"
            onClick={() => handlePagination("next")}
          />
        </Pagination>
      </div>
    </Container>
  );
};

export default ReposList;

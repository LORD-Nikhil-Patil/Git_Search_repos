import React, { useCallback, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { AiFillGithub } from "react-icons/ai";
import { SearchInput } from "./search";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { AiFillStar } from "react-icons/ai";
const ReposList = () => {
    const sortOptions = [
        { label: "Most stars", sort: "stars" },
        { label: "Watchers count", sort: "forks" },
        { label: "Username", sort: "user" },
        { label: "Created", sort: "created" },
        { label: "Updated", sort: "pushed" }
    ]
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(false);

    const { q } = useParams();

    const fetchData = useCallback(
        ({ input, sort, order, perPage, pg }) => {
            setLoading(true);

            //Query Parameters - Reference: https://docs.github.com/en/rest/reference/repos
            const queryTerm = `q=` + encodeURIComponent(input || q);
            const querySort = `${sort ? `&sort=${sort}` : ""}`;
            const queryOrder = `${order ? `&order=${order}` : ""}`;
            const queryPerPage = `&per_page=${perPage || 30}`;
            const queryPage = `&page=${page || 1}`;
            const queryString =
                queryTerm + querySort + queryOrder + queryPerPage + queryPage;

            //console.log("Github API Search Query: ", queryString);
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
    console.log("useEffect", data?.items.map(res => res));

    return (
        <Container fluid className="p-0">
            <Navbar variant="light" bg="light" fluid>
                <Container fluid>
                    <Navbar.Brand href="#">
                        <AiFillGithub className="logo" />
                    </Navbar.Brand>
                    <div className="justify-content-end">
                        <SearchInput value={q} />
                    </div>
                </Container>
            </Navbar>
            <div className="cards-list" >
                {data?.items.map(repo => (
                    <Card className="repo-card" key={repo.id} >
                        <Card.Img variant="top" src={repo.owner.avatar_url} />
                        <Card.Body>
                            <Card.Title>{repo.full_name}</Card.Title>
                            <Card.Text>
                                {repo.description}

                            </Card.Text>

                        </Card.Body>
                        <Card.Footer className="repo-card-footer">
                            <small className="text-muted"><AiFillStar style={{marginBottom:"5px"}} /> {repo.stargazers_count}</small>
                            <small className="text-muted">{repo.language}</small>
                        </Card.Footer>

                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default ReposList;

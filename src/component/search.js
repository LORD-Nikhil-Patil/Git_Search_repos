import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SearchInput = ({ value = "", onSubmit }) => {
    const [input, setInput] = useState(value);

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const routeChange = (input) => {
        let path = `/search/${input}`;
    };

    const handleKeyPress = (e) => {
        input ? handleSubmit() : alert("Please enter search term to get results");
    };

    const handleSubmit = () => {
        console.log(input)
        routeChange(input);
        onSubmit(input);
    };
    
    return (
        <Form className="d-flex flex-row ">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    placeholder="search"
                    value={input}
                    onChange={handleInput}
                />
            </Form.Group>
            <Button
                className="form pb-2"
                variant="primary"
                type="submit"
                size="sm"
                onClick={handleKeyPress}
            >
                search
            </Button>
        </Form>
    );
};

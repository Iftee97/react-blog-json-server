import React from "react";
import { useParams } from "react-router-dom"; // for route parameters
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom/"; // for redirects

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch(`http://localhost:8000/blogs/${id}`);
    const history = useHistory();

    const handleClick = () => {
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: "DELETE"
        }).then(() => {
            history.push("/"); // redirects to the home page
        });
    };

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by: {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleClick}>Delete Blog</button>
                </article>
            )}
        </div>
    );
};

export default BlogDetails;

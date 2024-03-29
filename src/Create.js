import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // for redirects

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("mario");
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        const blog = {
            title,
            body,
            author
        };

        setIsPending(true);

        fetch(" http://localhost:8000/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log("new blog added");
            setIsPending(false);
            history.push("/"); // redirects to the home page
        });
    };

    return (
        <div className="create">
            <h2>Add New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <label>Blog Body:</label>
                <textarea required
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                ></textarea>

                <label>Blog Author:</label>
                <select
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                >
                    <option value="mario">Mario</option>
                    <option value="yoshi">Yoshi</option>
                </select>

                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div >
    );
};

export default Create;

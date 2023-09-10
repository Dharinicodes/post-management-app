import { useEffect, useState } from "react";
import { POSTS_URL } from "../utils/constants";
import PostCard from "./PostCard";
import { Container } from "./stylingComponent";
import SearchIcon from "@mui/icons-material/Search";

const Body = () => {
  const [listOfPostCards, setListOfPostCards] = useState([]);

  const [searchedPost, setSearchedPost] = useState("");

  const [filteredPost, setFilteredPost] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(POSTS_URL);

    const json = await data.json();

    setListOfPostCards(json);

    setFilteredPost(json);
  };

  const handleDelete = (postId) => {
    const postList = listOfPostCards.filter((post) => postId !== post.id);
    setFilteredPost(postList);
  };

  return (
    <div>
      <div className="search-filter">
        <input
          className="search-inpt"
          placeholder="search posts"
          type="text"
          value={searchedPost}
          onChange={(e) => {
            setSearchedPost(e.target.value);
          }}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
            const filteredPost = listOfPostCards.filter((post) =>
              post.title.includes(searchedPost)
            );

            setFilteredPost(filteredPost);
          }}
        >
          <SearchIcon sx={{ fontSize: 25 }} />
        </button>
      </div>
      <Container>
        {filteredPost.map((post) => (
          <PostCard key={post.id} postData={post} handleDelete={handleDelete} />
        ))}
      </Container>
    </div>
  );
};

export default Body;

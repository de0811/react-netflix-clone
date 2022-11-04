import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";

const SearchPage = () => {
  console.log("useLocation()", useLocation());
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const [searchMovies, setSearchMovies] = useState([]);

  const navigate = useNavigate();

  let query = useQuery();
  const searchTxt = useDebounce(query.get("q"), 500);
  console.log("searchTerm", searchTxt);

  useEffect(() => {
    if (searchTxt) {
      fetchSearchMovie(searchTxt);
    }
  }, [searchTxt]);
  const fetchSearchMovie = async (searchTxt) => {
    try {
      console.log(`/search/multi?include_adult=false&query=${searchTxt}`);
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTxt}`
      );
      setSearchMovies(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderSearcbhResults = () => {
    return searchMovies.length > 0 ? (
      <section className="search-container">
        {searchMovies.map((movie, idx) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={idx}>
                <div
                  className="movie__column-poster"
                  onClick={() => {
                    navigate(`/${movie.id}`);
                  }}
                >
                  <img
                    src={movieImageUrl}
                    alt="movie"
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          } else {
            return <div key={idx}></div>;
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자 하는 검색어 "{searchTxt}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
  };

  return renderSearcbhResults();
};

export default SearchPage;

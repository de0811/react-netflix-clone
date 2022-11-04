import axios from "../api/axios";
import { useEffect, useState } from "react";
import { requests } from "../api/requests";
import "./Banner.css";
import { truncate } from "../api/util";
import styled from "styled-components";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isPlay, setIsPlay] = useState(false);

  const fetchData = async () => {
    //현재 상영중인 영화 가져오기
    const request = await axios.get(requests.fetchNowPlaying);
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return !isPlay ? (
    <header
      className="banner"
      style={{
        ...(movie && movie.backdrop_path
          ? {
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            }
          : {}),
        ...{
          backgroundPosition: "top center",
          backgroundSize: "cover",
        },
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button
            className="banner__button play"
            onClick={() => setIsPlay(true)}
          >
            play
          </button>
          <button className="banner__button info">
            <div className="space"></div> More Information
          </button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 100)}
        </h1>
      </div>
      <div className="banner_fadeBottom" />
    </header>
  ) : (
    <Container>
      <HomeContainer>
        <Iframe
          src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
          // src={`https://www.youtube.com/embed/bV2f7chLm6w`}
          title="YouTube video player"
          width="640"
          height="360"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        ></Iframe>
      </HomeContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Banner;

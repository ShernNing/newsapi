import { useEffect, useState } from "react";
import "./App.css";
import NewsCards from "./components/Cards/NewsCards";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [news, setNews] = useState([]);
  const [loadMore, setLoadMore] = useState(5);
  const [category, setCategory] = useState("technology");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getNews = async () => {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=${loadMore}&category=${category}&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const data = await res.json();
      console.log(data, "from fetch");
      console.log(news, "news");
      setNews(data.articles);
    };

    getNews().catch((error) => setError(error));
  }, [loadMore, category]);

  const filterNews = news.filter((news) =>
    news.title.toLowerCase().includes(search)
  );

  console.log(filterNews, "filterNews");

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className='App'>
        <Container maxWidth='md'>
          <div>
            <Navbar setCategory={setCategory} setSearch={setSearch} />
            {/* <form>
              <input
                type='text'
                placeholder='Search..'
                onChange={(e) => setSearch(e.target.value)}
              />
            </form> */}
          </div>
          {error ? `Error: ${error.message}, Failed to fetch` : null}
          <div>
            {filterNews.map((data, key) => (
              <NewsCards data={data} key={key} />
            ))}
            <button
              className='button'
              onClick={() => setLoadMore(loadMore + 5)}
            >
              Load More
            </button>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

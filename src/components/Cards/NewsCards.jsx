import React from "react";
import "./NewsCard.css";

function NewsCards({ data }) {
  return (
    <div className='card'>
      <img
        className='image'
        src={data.urlToImage ? data.urlToImage : null}
        alt={data.name}
      />
      <a href={data.url} target='__blank'>
        <h2 className='title'>{data.title}</h2>
      </a>
      <a href={data.url} target='__blank'>
        <h3 className='desc'>{data.description}</h3>
      </a>
      {/* <h3 className='author'>by {data.author}</h3> */}
      <h3 className='more'>
        Read more:{" "}
        <a className='source' href={data.url} target='__blank'>
          {data.source.name}
        </a>
      </h3>
    </div>
  );
}

export default NewsCards;

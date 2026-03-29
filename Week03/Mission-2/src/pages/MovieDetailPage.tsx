import React from 'react'
import { useParams } from 'react-router-dom';

const MovieDetailPage = () => {
    const params = useParams();
    console.log(params);
  return (
    <div>
      detail
    </div>
  )
}

export default MovieDetailPage

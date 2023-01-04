import React from 'react'

import bgImage from '../../../images/new-workout-bg.jpg'
import Layout from "../../common/Layout/Layout";

const NotFound = () => {
  return (
    <>
      <Layout bgImage={bgImage} heading='Page not found'/>
      <div className='wrapper-inner-page'>404 page not found</div>
    </>
  );
}

export default NotFound

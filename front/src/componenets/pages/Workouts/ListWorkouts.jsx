import bgImage from '../../../images/profile-bg.jpg'

import {useQuery} from 'react-query'
import {api} from '../../../api/api'
import {Link} from "react-router-dom";
import Alert from "../../ui/Alert/Alert";
import Layout from "../../common/Layout/Layout";
import React from "react";

const ListWorkouts = () => {

  const {data, isSuccess} = useQuery(
    'workouts',
    () =>
      api({
        url: `/workouts`,
      }),
    {
      refetchOnWindowFocus: false,
    }
  )

  console.log(data)
  return (
    <>
      <Layout bgImage={bgImage} heading={"List Workouts"}/>
      {isSuccess ? (<div className='wrapper'>
            {data.map((workout, index) => (
              <div key={`exercises ${index}`}>
                <Link to={`/workout/${workout._id}`}>
                  <span>{workout.name}</span>
                </Link>
              </div>
            ))}
          </div>
        ) :
        <Alert type="warning" text="Workouts not found"/>
      }
    </>
  )
}

export default ListWorkouts

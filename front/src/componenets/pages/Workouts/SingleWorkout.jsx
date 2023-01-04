import Header from '../../common/Header/Header'

import bgImage from '../../../images/profile-bg.jpg'

import {useMutation, useQuery} from 'react-query'

import styles from './SingleWorkout.scss'
import stylesLayout from '../../common/Layout/Layout.module.scss'
import {api} from '../../../api/api'
import {useNavigate, useParams} from "react-router-dom";
import Alert from "../../ui/Alert/Alert";
import Loader from "../../ui/Loader/Loader";
import React from "react";

const SingleWorkout = () => {
  const navigate = useNavigate()

  const {id} = useParams()
  const {data, isSuccess} = useQuery(
    'workouts',
    () =>
      api({
        url: `/workouts/${id}`,
      }),
    {
      refetchOnWindowFocus: false,
    }
  )


  const {
    mutate,
    isLoading,
    error,
  } = useMutation("exercises", ({exerciseId, time}) =>
    api({
      url: `/workouts/${id}`,
      type: "POST",
      body: {exerciseId, time},
      auth: false
    }), {
    onSuccess(data) {
      navigate(`/exercise/${data._id}`)
    }
  })

  console.log(data)
  return (
    <>
      <div
        className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
        style={{backgroundImage: `url(${bgImage})`, height: 356}}
      >
        <Header/>

        <div className={styles.center}>

          {isSuccess && (
            <>
              <h1 className={stylesLayout.heading}>{data.name}</h1>
              <time className={styles.time}>{data.minutes + " min"}</time>
            </>
          )}
        </div>
        {error && <Alert type='error' text={error}/>}
        {isSuccess && <Alert text='Exercises log created'/>}
        {isLoading && <Loader/>}
      </div>
      {isSuccess ? (<div className='wrapper'>
            {data.exercises.map((exercise, index) => (
              <>
                <div className={styles.item} key={`exercises ${index}`}>
                  <button aria-label="Move to exercises" to={`/exercise/${exercise._id}`} onClick={() => mutate({
                    exerciseId: exercise._id,
                    times: exercise.times
                  })}>
                    <span>{exercise.name}</span>
                    <img src={`/uploads/exercises/${exercise.imageName}.svg`} alt={`${exercise.imageName}`} height={34}/>
                  </button>
                </div>
                {index % 2 === 0 && <div className={styles.line}></div>}
              </>
            ))}
          </div>
        ) :
        <Alert type="warning" text="Exercises not found"/>
      }
    </>
  )
}

export default SingleWorkout

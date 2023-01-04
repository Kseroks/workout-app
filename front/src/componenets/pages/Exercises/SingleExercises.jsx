import Header from '../../common/Header/Header'

import checkCompletedImage from '../../../images/exercises/check-completed.svg'
import checkImage from '../../../images/exercises/check.svg'
import bgImage from '../../../images/ex-bg-1.jpg'

import {useMutation, useQuery} from 'react-query'

import styles from "./SingleExercises.module.scss"
import stylesLayout from '../../common/Layout/Layout.module.scss'
import {api} from '../../../api/api'
import {useParams} from "react-router-dom";
import Alert from "../../ui/Alert/Alert";
import cn from "classnames";
import Loader from "../../ui/Loader/Loader";
import React from "react";

const SingleExercises = () => {

	const {id} = useParams()
	const {data, isSuccess, refetch} = useQuery(
		'workouts',
		() =>
			api({
				url: `/exercises/log/${id}`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const {
		mutate: change,
		isLoading: isLoadingChange,
		error: errorChange,
	} = useMutation("change log state", ({timeIndex, key, value}) =>
		api({
			url: "/exercises/log",
			type: "PUT",
			body: {timeIndex, key, value, logId: id},
			auth: false
		}), {
		onSuccess(data) {
			refetch()

		}
	})


	console.log(2321313)
	return (
		<>
			<div
				className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
				style={{backgroundImage: `url(${bgImage})`, height: 356}}
			>
				<Header/>
				<div className={styles.center}>
					{isSuccess && (
						<div>
							<img
								src={`/uploads/exercises/${data.exercise.imageName}.svg`}
								alt={data.exercise.imageName}
								height={34}
							/>

							<h1 className={stylesLayout.heading}>{data.exercises.name}</h1>
						</div>
					)}
				</div>
			</div>

			{errorChange && <Alert type={"error"} text={errorChange}/>}
			{isLoadingChange && <Loader/>}

			{isSuccess ? (<div className='wrapper'>
						<div className="row">
							<div>
								<span>Previous</span>
							</div>
							<div>
								<span>Repeat & Weight</span>
							</div>
							<div>
								<span>Completed</span>
							</div>
						</div>
						{data.times.map((item, index) => (
							<div className={cn(styles.row, {
								[styles.completed]: ""
							})} key={`time ${index}`}>
								<div className={styles.opacity}>
									<input type="number" value={item.prevWeight} disabled={true}/>
									<i>kg </i>
									<input type="number" value={item.prevRepeat} disabled={true}/>
								</div>

								<div>
									<input type="number" value={item.weight} onChange={(e) => change({
										timeIndex: index,
										key: "weight",
										value: e.target.value
									})}
												 disabled={item.completed}
									/>
									<i>kg </i>
									<input type="number" value={item.repeat} onChange={(e) => change({
										timeIndex: index,
										key: "repeat",
										value: e.target.value
									})}
												 disabled={item.completed}
									/>
								</div>

								<div>
									<img src={item.completed ? checkCompletedImage : checkImage} className={styles.checkbox}
											 alt={"checkbox"} onChange={() => change({
										timeIndex: index,
										key: "completed",
										value: !item.completed
									})}/>
								</div>
							</div>
						))}
					</div>
				) :
				<Alert type="warning" text="Exercises not found"/>
			}
		</>
	)
}

export default SingleExercises

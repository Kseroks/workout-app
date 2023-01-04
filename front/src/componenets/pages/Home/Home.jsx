import React from 'react';
import Layout from "../../common/Layout/Layout";
import bgImage from "../../../images/home-bg.jpg"
import Button from "../../ui/Button/Button";
import styles from "./Home.module.scss"
import Counters from "../../ui/Counters/Counters";
import {useQuery} from "react-query";
import {api} from "../../../api/api";
import {useAuth} from "../../../hooks/useAuth";

const Home = () => {
  const {isAuth} = useAuth()
  const {data, isSuccess} = useQuery("home counters", () =>
    api({
      url: "users/profile"
    }), {
    refetchOnWindowFocus: false,
    enabled: isAuth

  })
  return (
    <Layout height={"100%"} bgImage={bgImage}>
      <Button text={"new"} type={"main"}/>
      <h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
      {(isSuccess && isAuth) && <Counters minutes={data.minutes} kgs={data.kgs} workouts={data.workouts}/>}
    </Layout>
  );
};

export default Home;
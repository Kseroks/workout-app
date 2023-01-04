import Home from "./componenets/pages/Home/Home";
import Auth from "./componenets/pages/Auth/Auth";
import NewWorkout from "./componenets/pages/NewWorkout/NewWorkout";
import NewExercises from "./componenets/pages/NewExercises/NewExercises";
import Profile from "./componenets/pages/Profile/Profile";
import SingleWorkout from "./componenets/pages/Workouts/SingleWorkout";
import ListWorkouts from "./componenets/pages/Workouts/ListWorkouts";
import SingleExercises from "./componenets/pages/Exercises/SingleExercises";

export const routes = [
  {
    path: '/',
    exact: true,
    element: Home,
    auth: false,
  },
  {
    path: '/auth',
    exact: false,
    element: Auth,
    auth: false,
  },
  {
    path: '/new-workout',
    exact: false,
    element: NewWorkout,
    auth: true,
  },
  {
    path: '/new-exercises',
    exact: false,
    element: NewExercises,
    auth: true,
  },
  {
    path: '/profile',
    exact: false,
    element: Profile,
    auth: true,
  },
  {
    path: '/workouts/:id',
    exact: false,
    element: SingleWorkout,
    auth: true,
  }, {
    path: '/workout',
    exact: false,
    element: ListWorkouts,
    auth: true,
  }, {
    path: '/exercise/:id',
    exact: false,
    element: SingleExercises,
    auth: true,
  }
]

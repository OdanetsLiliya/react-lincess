import { RootStateType } from "../../Stores"

export const getWorkouts = (state: RootStateType) => state.workout?.workouts;
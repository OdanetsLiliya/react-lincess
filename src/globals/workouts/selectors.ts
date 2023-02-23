import { RootStateType } from "../../stores"

export const getWorkouts = (state: RootStateType) => state.workout?.workouts;
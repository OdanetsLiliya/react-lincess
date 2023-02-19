export const headerPaths = [
    {
        url: `/workouts`,
        name: "Тренировки"
    },
    // TO DO : add later
    /* {
        url: `/coaches-list`,
        name: "Список тренеров"

    }, */
    {
        url: `/profile`,
        name: "Профиль"

    },
    {
        url: `/administration`,
        name: "Администрирование",
        role: 'admin',
    } 
]

export const breadCrumbsRoutes : { [key: string | number]: string[] } = {
    '/administration/add-workout': ['Администрирование', 'Добавить тренировку'],
    '/workouts/edit-workout/:id': ['Тренировки', 'Редактирование'],
}
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = 'SET_USERS';

export type UserType = {
    id: number,
    photoUrl: string,
    fullName: string,
    followed: boolean,
    status: string,
    location: LocationType
}

export type LocationType = {
    city: string,
    country: string
}

let initialState = {
    users: [] as Array<UserType>
};

const usersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FOLLOW :
            return {
                // первым делом, мы создаем копию всего state
                ...state,
                // далее создаем копию массива, внутри которой мы будем что-то менять
                // для этого очень хорошо подходит метод массива map, т.к. он на основе
                //  старого массива возвращает новый массив и позволяет сделать в нем изменения
                users: state.users.map ( u => {
                    // если u.id в пробегаемом массиве равна той userId, которая пришла в action
                    // мы далжны сделать в нем изменения: followed поменять на противоположный
                    if (u.id === action.userId) {
                        // но мы не можем изменить пользователя, который к нам пришел, т.к.
                        // массив, который к нам пришел должен остаться неизменным,
                        // то мы создаем копию этого пользователя и вернуть уже его копию
                        return {...u, followed: true}
                    }
                    // если id совпадают мы возвращаем копию, если нет то тот же самый объект
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map ( u => {
                    if (u.id === action.userId) {
                        return {...u, followed:false}
                    }
                    return u;
                })
            };
        case SET_USERS: {
            //придут пользователи(users), я возьму старый стейт,
            //пользователей, которые там были и перезатру их
            //теми пользователями, которые пришли
            return {
                ...state,
                users: [...state.users,...action.users]
            };
        }

        default :
            return state
    }
};

// В АС нужен userId, чтобы понимать за каким юзером нам следить.
// В АС он попадет как параметр.

export const followAC = (userId: number) => ({type: FOLLOW, userId});
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId});
// массив пользователей изначально бдует пустой, т.е. нам нужен АС, кот.
// будет сетать user. users придут к нам с сервера, мы возьмем их
// и засетаем в стейт
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users});

export default usersReducer;
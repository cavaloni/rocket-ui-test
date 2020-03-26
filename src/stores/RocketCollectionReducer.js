import { ACTIONS } from '../actions/Rockets'

const initialState = {
    rockets: {},
    fetching: false,
}

const actionHandlers = {
    [ACTIONS.REQUEST_ROCKET]: ({ state }) => ({
        ...state,
        fetching: true,
    }),
    [ACTIONS.RECEIVE_ROCKET]: ({ state, action }) => ({
        ...state,
        fetching: false,
        rockets: {
            ...state.rockets,
            [action.payload.rocket.rocket_id]: action.payload.rocket,
        },
    }),
}

export default (state = initialState, action) =>
    actionHandlers[action.type]
        ? actionHandlers[action.type]({ state, action })
        : state

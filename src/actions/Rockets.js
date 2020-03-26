import RocketService from '../services/RocketService'

export const ACTIONS = {
    REQUEST_ROCKET: 'REQUEST_ROCKET',
    RECEIVE_ROCKET: 'RECEIVE_ROCKET',
}

export const requestRocket = () => ({
    type: ACTIONS.REQUEST_ROCKET,
})

const receiveRocket = response => ({
    type: ACTIONS.RECEIVE_ROCKET,
    payload: {
        rocket: response.data,
    },
})

export const fetchRocket = (id, dispatch) => {
    dispatch(requestRocket())
    return RocketService.get(id).then(response => {
		console.log(response)
		dispatch(receiveRocket(response))
	}
    )
}

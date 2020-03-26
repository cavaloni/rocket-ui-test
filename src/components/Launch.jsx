import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRocket } from '../actions/Rockets'

const Launch = ({
    launch,
    curOpenLaunch,
    rocketLaunching,
    toggleRocket,
    rockets,
    dispatch,
}) => {
    const {
        rocket: { rocket_id: rocketId },
        flight_number: flightNumber,
    } = launch
    const isOpen = curOpenLaunch === flightNumber

    const rocket = rockets[rocketId]

    useEffect(() => {
        if (!rocket && isOpen) {
            fetchRocket(rocketId, dispatch)
        }
    }, [isOpen])

    return (
        <li className="launch-item" onClick={() => toggleRocket(flightNumber)}>
            <h2> {launch.mission_name} </h2>
            <div> Flight Number: {launch.flight_number} </div>
            {isOpen && (
                <div className="rocket-details">
                    {!rocketLaunching && rocket ? (
                        <Fragment>
                            <div>Rocket Id: {rocket.rocket_id}</div>
                            <div>Cost per Launch: {rocket.cost_per_launch}</div>
                            <div>Rocket Description: {rocket.description}</div>
                        </Fragment>
                    ) : (
                        <div>Loading Rocket...</div>
                    )}
                </div>
            )}
        </li>
    )
}

const mapStateToProps = state => ({
    rocketLaunching: state.rocketCollection.fetching,
    rockets: state.rocketCollection.rockets,
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators({ fetchRocket }),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Launch)

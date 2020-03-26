import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import ConnectedView from './ConnectedView'
import { fetchLaunches } from '../actions/Launches'
import Launch from '../components/Launch'

const LaunchesView = ({ fetching, launches, dispatch }) => {
    useEffect(() => {
        fetchLaunches(dispatch)
    }, [])

    const [curOpenLaunch, updateOpenLaunch] = useState()

    const toggleRocket = id => {
        if (curOpenLaunch === id) updateOpenLaunch()
        else updateOpenLaunch(id)
    }

    const getContent = () => {
        if (fetching) {
            return <div> LOADING </div>
        }

        if (!launches.length) {
            return <div> NO DATA </div>
        }

        const launchesToDisplay = launches.map(launch => (
            <Launch
                key={launch.launch_id}
                launch={launch}
                curOpenLaunch={curOpenLaunch}
                toggleRocket={toggleRocket}
            />
        ))

        return <ul>{launchesToDisplay}</ul>
    }

    return (
        <div>
            <h2> SpaceX launches </h2>
            {getContent()}
        </div>
    )
}

const mapStateToProps = state => ({
    launches: state.launchCollection.launches,
    fetching: state.launchCollection.fetching,
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators({ fetchLaunches }),
})

export default ConnectedView(
    LaunchesView,
    'launches',
    mapStateToProps,
    mapDispatchToProps
)

import React from 'react'
import { connect } from 'react-redux'

import Layout from './Layout'
import Navigation from '../components/Navigation'

const menu = Navigation()

function MasterLayoutHOC(
    WrappedComponent,
    pageName,
    mapStateToProps,
    mapDispatchToProps
) {
    const MasterLayoutImpl = props => {
        return (
            <Layout menu={menu} pageName={pageName}>
                <WrappedComponent {...props} />
            </Layout>
        )
    }
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(MasterLayoutImpl)
}

export default MasterLayoutHOC

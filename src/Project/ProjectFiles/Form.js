import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { ContainerFluid } from '../Container/Container'


import { connect } from 'react-redux'
import FormInput from './FormInput'
import FormList from './FormList'
class Form extends Component {
    render() {
        return (
            <div>
                <ThemeProvider theme={this.props.propTheme}>
                    <ContainerFluid>
                        <FormInput />
                        <FormList />
                    </ContainerFluid>
                </ThemeProvider>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        propTheme: state.FormReducer.theme,
    }
}

export default connect(mapStateToProps)(Form)
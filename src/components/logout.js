import { connect } from 'react-redux'

import { signOut } from '../actions/authActions'

const logout = (props) => {
  
    return {
            props.signOut() ; 
            props.navigation.navigate ('Login', {});
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(logout)
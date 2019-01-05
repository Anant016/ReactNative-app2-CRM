import firebase from 'firebase'

export const selectPerson=(peopleId)=>{
    return{
        type:'SELECTED_PERSON',
        payload:peopleId
    }
}

export const noneSelected=()=>{
    return{
        type:'NONE_SELECTED',
    }
}

export const formUpdate=({prop,value})=>{
    return{
        type:'FORM_UPDATE',
        payload:{prop,value}
    }
}

export const createNewContact=({first_name,last_name,phone,email,company,notes,project})=>{
 const {currentUser}=firebase.auth();
 
 return(dispatch)=>{
     firebase.database().ref(`/users/${currentUser.uid}/people`)
           .push({first_name,last_name,phone,email,company,notes,project})
           .then(()=>{
               dispatch({type:'NEW_CONTACT'})
           })

 }
}

export const loadInitialContacts=()=>{
    const {currentUser}=firebase.auth();

    return(dispatch)=>{
        firebase.database().ref(`/users/${currentUser.uid}/people`)
             .on('value',snapshot=>{
                 dispatch({type:'INITIAL_FETCH',
                           payload: snapshot.val()         
                })
             })
    }
}


export const deleteContact=(uid)=>{
    const {currentUser}=firebase.auth();

    return(dispatch)=>{
        firebase.database().ref(`/users/${currentUser.uid}/people/${uid}`)
             .remove()
             .then(()=>{
                 dispatch({type:'DELETE_CONTACT'})
             })
    }
}

export const updateContact = (personSelected) => {
    return {
        type: 'UPDATE_CONTACT',
        payload: personSelected,
    };
};

export const saveContact = ({ first_name, last_name, phone, email, company, project, notes, uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/people/${uid}`)
        .set({ first_name, last_name, phone, email, company, project, notes, uid })
        .then(() => {
            dispatch({ type: 'SAVE_CONTACT'});
        });
    };
}

export const logout = () => {
    return {
        type: 'LOGOUT',
    };
};


export const login = () => {
    return {
        type: 'LOGIN',
    };
};
import { useDispatch, useSelector } from 'react-redux'
import { calendarApi } from '../api';
import { onLogoutCalendar } from '../store';
import { clearErrorMessage, OnChecking, onLogin, onLogout } from '../store/auth/authSlice';


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {

        dispatch( OnChecking() );

        try {
            
            const { data } = await calendarApi.post('/auth/', { email, password } );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            dispatch( onLogout( 'Incorrect credentials' ) );

            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);          
        }
    }

    const startRegister = async( name, email, password ) => {
        dispatch( OnChecking() );

        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password } );
            
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {

            dispatch( onLogout( error.response.data?.msg || 
                                error.response.data.errors.name?.msg ||  
                                error.response.data.errors.email?.msg ||  
                                error.response.data.errors.password?.msg ||  
                                error.code ) );

            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);     
            
        }

    }

    const checkAuthToken = async() => {

        const token = localStorage.getItem('token');

        if ( !token ) {
            return dispatch( onLogout() );
        }

        try {
            const { data } = calendarApi.get('/auth/renew');
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }


    }

    const startLogout = ( ) => {
        localStorage.clear();

        dispatch( onLogoutCalendar() );
        dispatch( onLogout() );
    }
    
    


    return {
        // Propiedades
        errorMessage,
        status, 
        user, 

        // Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }

}
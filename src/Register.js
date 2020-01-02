import React, { useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import api from '../utils/api'
import RegisterForm from './components/LogReg/RegisterForm'

const Register = (props) => {
    const [Register, setRegister] = useState({
        form: {
            name: '',
            lastname: '',
            email: '',
            mobile: '',
            password: '',
            codrefe: ''
        }
    })

    changeText = (inputKey, inputValue) => {
        setRegister({
            form: {
                ...Register.form,
                [inputKey]: inputValue
            }
        })
    }

    handleRegister = async () => {
        if (!Register.form.name.trim() || !Register.form.lastname.trim() || !Register.form.email.trim() || !Register.form.mobile.trim() || !Register.form.password.trim()) {
            Alert.alert(
                'Rellenar todos los capos'
            )
        } else {
            const answer = await api.userRegister(Register.form)
            Alert.alert(answer.msg)
        }
    }

    return (
        <LinearGradient style={styles.Container} colors={['#691919', '#262121']}>
            <RegisterForm changeText={changeText} state={Register.form} handleRegister={handleRegister} navigation={props.navigation} />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default Register

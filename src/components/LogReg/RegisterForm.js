import React from 'react'
import { View, Text, TextInput ,Button, StyleSheet } from 'react-native'
import LogRegLayout from './LogRegLayout'

const RegisterForm = props => {
    return (
        <View style={styles.Register}>
            <Text style={styles.Title}>REGISTRARSE</Text>

            <Text style={styles.Text}>Nombre</Text>
            <TextInput style={styles.Input} onChangeText={name => props.changeText('name', name)} value={props.state.name} />

                <Text style={styles.Text}>Apellido</Text>
                <TextInput style={styles.Input} onChangeText={lastname => props.changeText('lastname', lastname)} value={props.state.lastname} />

                <Text style={styles.Text}>Correo</Text>
                <TextInput style={styles.Input} onChangeText={email => props.changeText('email', email)} value={props.state.email} />

                <Text style={styles.Text}>Celular</Text>
                <TextInput style={styles.Input} onChangeText={mobile => props.changeText('mobile', mobile)} keyboardType='phone-pad' placeholder='0971234567' value={props.state.mobile} />

                <Text style={styles.Text}>Clave</Text>
                <TextInput style={styles.Input} onChangeText={password => props.changeText('password', password)} secureTextEntry value={props.state.password} />

                <Text style={styles.Text}>Codigo Referido</Text>
                <TextInput style={styles.Input} onChangeText={codrefe => props.changeText('codrefe', codrefe)} placeholder='Código de quién te refirió' keyboardType='numeric' value={props.state.codrefe} />

                <LogRegLayout />

                <View style={styles.Button}>
                    <Button color="#d14141" title='Registrarse' onPress={props.handleRegister} />
                </View>
                <View style={styles.Button}>
                    <Button color="#d14141" title='Atras' onPress={() => props.navigation.navigate('Login')} />
                </View>
            </View>

    )
}

const styles = StyleSheet.create({
    Register: {
        height: "70%",
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: "10%"
    },
    Title: {
        fontSize: 36,
        color: 'white',
        fontWeight: 'bold'
    },
    Text: {
        color: 'white'
    },
    Input: {
        height: 34,
        width: "80%",
        borderColor: 'white',
        borderWidth: 1,
        color: 'black',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        opacity: .85,
        fontSize: 16
    },
    Button: {
        width: "88%",
        marginTop: 13
    }
})

export default RegisterForm

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const LogRegLayout = () => {
    return (
        <View style={styles.Separator}></View>
    )
}

const styles = StyleSheet.create({
    Separator: {
        width: "85%",
        borderWidth: .40,
        borderRadius: 5,
        overflow: 'hidden',
        borderColor: 'gray',
        marginTop: 15
    }
})

export default LogRegLayout

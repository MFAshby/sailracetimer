import React, { PureComponent } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native'
import { Camera, Permissions } from 'expo'
import { inject } from 'mobx-react'
import { Ionicons } from '@expo/vector-icons'

@inject("peopleStore")
export default class AddPersonScreen extends PureComponent {
    static navigationOptions = ({navigation}) => {
        let { params = {} } = navigation.state
        let { onPressSave = () => {} } = params 
        return {
            headerTitle: "Add Person",
            headerRight: (
                <Button
                    onPress={onPressSave}
                    title="Save"/>
            ),
        }
    }

    constructor(props) {
        super(props)
        props.navigation.setParams({ onPressSave: this.onPressSave })
        this.state = {
            name: "",
            imageUri: null,

            cameraPermission: false,
            cameraType: Camera.Constants.Type.back
        }
    }

    async componentDidMount() {
        let resp = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            cameraPermission: resp.status === 'granted'
        })
    }

    onPressSave = () => {
        this.props.peopleStore.newPerson({
            name: this.state.name,
            imageUri: this.state.imageUri
        })
        this.props.navigation.goBack()
    }

    snap = async () => {
        let resp = await this.camera.takePictureAsync()
        this.setState({
            imageUri: resp.uri
        })
    }

    switchCamera = () => {
        let isFront = this.state.cameraType === Camera.Constants.Type.front
        let newType =  isFront ? Camera.Constants.Type.back : Camera.Constants.Type.front
        alert(`Switching camera type from ${this.state.cameraType} to ${newType}`)
        this.setState({
            cameraType: newType
        })
    }

    clearPic = () => {
        this.setState({
            imageUri: null
        })
    }

    render() {
        var imageComp
        if (this.state.imageUri) {
            imageComp = <Image
                source={{uri: this.state.imageUri, width:300, height:300}}/>
        } else if (this.state.cameraPermission) {
            imageComp = <View>
                <Camera     
                    ref={ ref => this.camera = ref }
                    style={ {width: 300, height: 300} }
                    type={ this.state.cameraType }/>
                <Ionicons.Button 
                    name="md-camera"
                    onPress={ this.snap }/>
                <Ionicons.Button 
                    name="md-reverse-camera"
                    onPress={ this.switchCamera }/>
            </View>
        } else {
            imageComp = <Text>You have not allowed permission to use the camera</Text>
        }
        return <View styles={ styles.container }>
            <TextInput 
                autoFocus
                style={ styles.textInput }
                value={ this.state.name }
                onChangeText={ text => this.setState({name: text}) }
                placeholder="Name"/>
            {imageComp}
            <Button
                title="Snap"
                onPress={ this.snap } />
            <Button
                title="Clear"
                onPress={ this.clearPic } />
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
    }, 
    textInput: {
        margin: 8,
        height: 50,
    }
})
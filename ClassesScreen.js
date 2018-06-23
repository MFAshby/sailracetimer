import React, { Component } from 'react'
import { StyleSheet, View, FlatList, Button, Alert, TouchableOpacity } from 'react-native'
import ClassListItem from './ClassListItem'
import { observer, inject } from 'mobx-react'

@inject("bClassStore")
@observer
class ClassesList extends Component {
    _renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                onLongPress={() => this.props.onLongPressItem(item)}
                onPress={() => this.props.onPressItem(item)}>
                <ClassListItem boatClass={item}/>
            </TouchableOpacity>)
    }

    render() {
        let boatClasses = this.props.bClassStore.boatClasses.slice()
        return <FlatList 
                data={boatClasses}
                keyExtractor={item => item.id}
                renderItem={this._renderItem}/>
    }
}

export default class ClassesScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Boat Classes',
            headerRight: <Button
                style={styles.button}
                onPress={() => navigation.navigate('AddBoatClassScreen')}
                title="Add"/>
        }
    }

    confirmDeleteBoatClass = (boatClass) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this boat class?',
            [
                { text: 'No' },
                { text: 'Yes', onPress: () => boatClass.delete() }
            ]
        )
    }

    render() {
        return (
            <View
                style={styles.container}>
                <ClassesList
                    onPressItem={ item => {} }
                    onLongPressItem={ this.confirmDeleteBoatClass }/>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',
    },
    button: {
        
    }
})
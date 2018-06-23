import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Button, Alert } from 'react-native'
import { observer, inject } from 'mobx-react'
import PeopleListItem from './PeopleListItem';


@inject("peopleStore")
@observer
class PeopleList extends Component {
    _renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                onLongPress={() => this.props.onLongPressItem(item)}
                onPress={() => this.props.onPressItem(item)}>
                <PeopleListItem
                    person={item}/>
            </TouchableOpacity>)
    }

    render() {
        // Need to dereference the observable for mobx to realize we are observing it
        let people = this.props.peopleStore.people.slice()
        return <FlatList 
                data={ people }
                keyExtractor={ person => person.id }
                renderItem={ this._renderItem }/>
    }
}

export default class PeopleScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "People",
            headerRight: (
                <Button
                    title="Add"
                    onPress={() => navigation.navigate('AddPersonScreen')}/>
            )
        }
    }

    confirmDeletePerson = person => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this person?',
            [
                { text: 'No' },
                { text: 'Yes', onPress: () => person.delete() }
            ]
        )
    }

    render() {
        return (<View style={styles.container}>
                <PeopleList       
                    onPressItem={ item => console.log("Pressed person", item) }
                    onLongPressItem={ this.confirmDeletePerson }/>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red'
    }
})

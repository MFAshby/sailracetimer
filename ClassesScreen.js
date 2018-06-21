import React, { Component, PureComponent } from 'react'
import { StyleSheet, Text, View, FlatList, Button, Image, TouchableOpacity } from 'react-native'
import ClassListItem from './ClassListItem'
import { BoatClass } from './DataObjects.js'
import { connect } from 'react-redux'
import Icon from './Icon.js'
import {  boatClassesListSelector } from './Selectors'

// props: boatClasses, onLongPressItem, onPressItem
class ClassesList extends PureComponent {
    _keyExtractor = (item, index) => {
        return item.id
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                onLongPress={() => this.props.onLongPressItem(item)}
                onPress={() => this.props.onPressItem(item)}>
                <ClassListItem boatClass={item}/>
            </TouchableOpacity>)
    }

    render() {
        return <FlatList 
                data={this.props.boatClasses}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}/>
    }
}

class ClassesScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Boat Classes',
            headerRight: <Button
                style={styles.button}
                onPress={() => navigation.navigate('AddBoatClassScreen')}
                title="Add"/>
        }
    }

    _selectItem = (item) => {
        console.log("Item selected " + item)
    }

    render() {
        return (
            <View
                style={styles.container}>
                <ClassesList
                    boatClasses={this.props.boatClasses}
                    onPressItem={this._selectItem}/>
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


// Now for the meat
function mapStateToProps(state) { 
    return {
        boatClasses: boatClassesListSelector(state)
    }
}

export default connect(mapStateToProps)(ClassesScreen)
import React, { Component, PureComponent } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native'
import { connect } from 'react-redux'
import { peopleListSelector }  from './Selectors'

class PeopleList extends PureComponent {
    _keyExtractor = (person, index) => {
        return person.id
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                onLongPress={() => this.props.onLongPressItem(item)}
                onPress={() => this.props.onPressItem(item)}>
                <View style={styles.listItem}>
                    <Text>{item.name}</Text>
                </View>
            </TouchableOpacity>)
    }

    render() {
        return <FlatList 
                data={this.props.people}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}/>
    }
}

class PeopleScreen extends Component {
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

    render() {
        return (<View style={styles.container}>
                <PeopleList       
                    {...this.props}/>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red'
    },
    listItem: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
})

function mapStateToProps(state) {
    return {
        people: peopleListSelector(state)
    }
}

export default connect(mapStateToProps)(PeopleScreen)
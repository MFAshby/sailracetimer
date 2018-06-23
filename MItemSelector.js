import React, { Component, } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'
import MButton from './MButton'

// search ((string) => list object)
// selectedItem object
// setSelectedItem fn(object)
// itemToString fn(object) > string
// renderItem fn(object) > React Component
export default class MItemSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            focussed: false,
            searchText: ""
        }
    }

    render() {
        let searchBoxText = this.props.selectedItem ? 
            this.props.itemToString(this.props.selectedItem) : 
            this.state.searchText

        let suggestions = this.props.selectedItem || !this.state.focussed ?
            [] :
            this.props.search(this.state.searchText)

        let containerStyle = this.props.style ? 
            [styles.containerView, this.props.style] : 
            [styles.containerView]

        let defaultRender = item => <Text>{this.props.itemToString(item)}</Text>
        let renderItem = this.props.renderItem || defaultRender

        return (<View style={containerStyle}>
                <Autocomplete
                    style={styles.autoComplete}
                    editable={!this.props.selectedItem}
                    placeholder={this.props.placeholder}
                    data={suggestions}
                    defaultValue={searchBoxText}
                    onChangeText={ text => this.setState({searchText: text}) }
                    onFocus={ () => this.setState({ focussed: true }) }
                    onEndEditing={ () => this.setState({ focussed: false }) }
                    renderItem={item => 
                        <TouchableOpacity
                            onPress={() => this.props.setSelectedItem(item)}>
                            {renderItem(item)}
                        </TouchableOpacity>}/>
                {
                    this.props.selectedItem && 
                    <MButton
                        style={styles.removeButton}
                        title="X"
                        onPress={() => this.props.setSelectedItem(null)}/>
                }
                
        </View>)
    }
}

const styles = StyleSheet.create({
    containerView: {
        flexDirection: 'row'
    },
    autoComplete: {
        flex: 1,
        alignSelf: 'stretch',
        height: 50,
    },
    removeButton: {
        flex: 0,
        width: 32,
        height: 32,
        margin: 4,
    }
})
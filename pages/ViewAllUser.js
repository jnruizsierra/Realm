import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Realm from 'realm';
let realm;
 
export default class ViewAllUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    realm = new Realm({ path: 'UserDatabase.realm' });
    var user_details = realm.objects('user_details');
    this.state = {
      FlatListItems: user_details,
    };
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
    );
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: 'white', padding: 20 }}>
              <Text>Id: {item.user_id}</Text>
              <Text>First Name: {item.first_name}</Text>
              <Text>Last Name: {item.last_name}</Text>
              <Text>Age: {item.age}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}
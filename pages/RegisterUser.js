import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Realm from 'realm';
let realm;
 
export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      age: '',
    };
    realm = new Realm({ path: 'UserDatabase.realm' });
  }
 
  register_user = () => {
    var that = this;
    const { first_name } = this.state;
    const { last_name } = this.state;
    const { age } = this.state;
    if (first_name) {
      if (last_name) {
        if (age) {
          realm.write(() => {
            var ID =
              realm.objects('user_details').sorted('user_id', true).length > 0
                ? realm.objects('user_details').sorted('user_id', true)[0]
                    .user_id + 1
                : 1;
            realm.create('user_details', {
              user_id: ID,
              first_name: that.state.first_name,
              last_name: that.state.last_name,
              age: that.state.age,
            });
            Alert.alert(
              'Success',
              'You are registered successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          });
        } else {
          alert('Please fill Age');
        }
      } else {
        alert('Please fill Last Name');
      }
    } else {
      alert('Please fill First Name');
    }
  };
 
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter First Name"
              onChangeText={first_name => this.setState({ first_name })}
            />
            <Mytextinput
              placeholder="Enter Last Name"
              onChangeText={last_name => this.setState({ last_name })}
            />
            <Mytextinput
              placeholder="Enter Age"
              onChangeText={age => this.setState({ age })}
              maxLength={2}
              keyboardType="numeric"
            />
            <Mybutton
              title="Submit"
              customClick={this.register_user.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
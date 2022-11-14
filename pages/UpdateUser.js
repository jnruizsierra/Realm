import React from 'react';
import {
  View,
  YellowBox,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Realm from 'realm';
let realm;
 
export default class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    realm = new Realm({ path: 'UserDatabase.realm' });
    this.state = {
      input_user_id: '',
      first_name: '',
      last_name: '',
      age: '',
    };
  }
  searchUser = () => {
    const { input_user_id } = this.state;
    console.log(this.state.input_user_id);
    var user_details = realm
      .objects('user_details')
      .filtered('user_id =' + input_user_id);
    console.log(user_details);
    if (user_details.length > 0) {
      this.setState({
        first_name: user_details[0].first_name,
      });
      this.setState({
        last_name: user_details[0].last_name,
      });
      this.setState({
        age: user_details[0].age,
      });
    } else {
      alert('No user found');
      this.setState({
        first_name: '',
      });
      this.setState({
        last_name: '',
      });
      this.setState({
        age: '',
      });
    }
  };
  updateUser = () => {
    var that = this;
    const { input_user_id } = this.state;
    const { first_name } = this.state;
    const { last_name } = this.state;
    const { age } = this.state;
    if (input_user_id) {
      if (first_name) {
        if (last_name) {
          if (age) {
            realm.write(() => {
              var ID = this.state.input_user_id;
              console.log('ID', ID);
              var obj = realm
                .objects('user_details')
                .filtered('user_id =' + this.state.input_user_id);
              console.log('obj', obj);
              if (obj.length > 0) {
                obj[0].first_name = this.state.first_name;
                obj[0].last_name = this.state.last_name;
                obj[0].age = this.state.age;
                Alert.alert(
                  'Success',
                  'User updated successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () =>
                        that.props.navigation.navigate('HomeScreen'),
                    },
                  ],
                  { cancelable: false }
                );
              } else {
                alert('User Updation Failed');
              }
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
    } else {
      alert('Please fill User Id');
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
              placeholder="Enter User Id"
              onChangeText={input_user_id => this.setState({ input_user_id })}
            />
            <Mybutton
              title="Search User"
              customClick={this.searchUser.bind(this)}
            />
            <Mytextinput
              placeholder="Enter First Name"
              value={this.state.first_name}
              onChangeText={first_name => this.setState({ first_name })}
            />
            <Mytextinput
              placeholder="Enter Last Name"
              value={'' + this.state.last_name}
              onChangeText={last_name => this.setState({ last_name })}
            />
            <Mytextinput
              value={this.state.age}
              placeholder="Enter Age"
              onChangeText={age => this.setState({ age })}
              maxLength={2}
              keyboardType="numeric"
            />
            <Mybutton
              title="Update User"
              customClick={this.updateUser.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';
import Realm from 'realm';
const realmConfig = {
  deleteRealmIfMigrationNeeded: true,
  schema: [
    {
      name: 'dog',
      primaryKey: 'name',
      properties: {
        name: 'string',
        cuteness: 'int',
      },
    },
  ],
};
const realm = new Realm(realmConfig);

realm.write(() => {
  realm.create(
    'dog',
    {
      name: 'vociferator',
      cuteness: 0,
    },
    true,
  );
});

export default () => {
  useEffect(() => {
    const dog = realm.objectForPrimaryKey('dog', 'vociferator');
    dog.addListener(() => {
      console.log('dog listener called');
    });
    return dog.removeListener;
  }, []);

  const updateDog = () => {
    realm.write(() => {
      realm.objectForPrimaryKey('dog', 'vociferator').cuteness++;
    });
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={updateDog}>
        <Text>update Dog</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={(e) => {
          JitsiMeet.call('https://meet.jit.si/testThingBugBlah');
        }}>
        <Text>startJitsiMeeting</Text>
      </TouchableOpacity>
      <JitsiMeetView style={{flex: 1}} />
    </View>
  );
};

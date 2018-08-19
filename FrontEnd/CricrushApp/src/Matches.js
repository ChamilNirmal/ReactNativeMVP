import React from 'react';
import { FlatList, ActivityIndicator, Text, View} from 'react-native';

export default class Matches extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
      }
    
      componentDidMount(){
 
        return fetch('http://192.168.8.100:4000/ListofMatches')
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              isLoading: false,
              dataSource: responseJson,
              
            }, function(){
          
            });      
          })

          .catch((error) =>{
            console.error(error);
          });
      }
    
      render(){
    
        if(this.state.isLoading){
          return(
            <View>
              <ActivityIndicator/>
            </View>
          )
        }
    
        return(

          <View>
            
            <Text style={{fontSize: 30,textAlign: 'center',color: 'blue'}}>List Of Matches</Text>

            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => <Text style={{fontSize: 15,color: 'black'}}>{item.title}{'\n'}{item.status},{item.statusShortDescription},{item.shortName},{item.moreDetails}{'\n'}</Text>}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );
      }
}
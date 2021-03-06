import React from 'react';
import {
    Text, View, Button, Image, StyleSheet, Alert, ActivityIndicator, FlatList, TouchableWithoutFeedback, Dimensions
} from 'react-native';
import {Block, theme} from "galio-framework";
import {Card} from 'react-native-shadow-cards';
import Constants from "../constants/Constants";
import {argonTheme} from "../constants";
import Input from '../components/Input';
import {MaterialCommunityIcons} from "@expo/vector-icons";
const { height, width } = Dimensions.get('window');

export default class AnomalyDetail extends React.Component {
    arrayholder = [];
constructor(props){
    super(props);
    // console.log(this.props.navigation.state.params.anomaly_description_id);
    this.state = {
        loading: true,
        dataSource: [],
        response_type: '',
    };
}
    componentDidMount() {
        fetch(Constants.API_PATH+'getAnomalyImage.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                anomaly_description_id: this.props.navigation.state.params.anomaly_description_id,

            })

        }).then((response) => response.json())
            .then((responseJson) => {

               // console.log(responseJson);
                if(responseJson === "Images does Not Exist, Please add some images First !!!"){
                   this.setState({
                       response_type:"Images does Not Exist, Please add some images First !!!"
                   })
                }
                else if(responseJson === "Try Again"){
                    Alert.alert("Try Again", message);
                } else{
                    this.setState({
                        loading: false,
                        dataSource: responseJson,
                        response_type:'Anomaly Images'
                    })
                    this.arrayholder=responseJson;
                }





            }).catch((error) => {
            console.error(error);
        });

    }

    searchFilterFunction(text){
        // console.log(text);
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.camera_id.toUpperCase()} `;

            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({ dataSource: newData });
    }
    renderSearch = () => {
        const { navigation } = this.props;
        return (
            <Input
                right
                color="black"
                style={styles.search}
                placeholder="What are you looking for?"
                placeholderTextColor={'#8898AA'}
                onChangeText={text => this.searchFilterFunction(text)}
                // onFocus={() => navigation.navigate('Home')}
                // iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
                iconContent={<MaterialCommunityIcons  name="database-search" size={20}  color={argonTheme.COLORS.WARNING} />}
            />
        );
    }


    FlatListItemSeparator = () => {
        return (
            <View style={{
                height: .5 * 2,
                width: "90%",
                marginLeft: "3%",
                backgroundColor: argonTheme.COLORS.WARNING,
            }}
            />
        );
    }
    renderItem = (data) =>



            <Card style={{padding: 10, margin: 10, height:'auto', width:'auto'}}>
                <Image source={{uri: `data:image;base64,${data.item.image}`}} style={styles.logo}/>
                <Text style={{textAlign:'center',padding: 10}}>Camera Captured:{data.item.camera_id}</Text>
            </Card>


    render() {
        if(this.state.loading){
            return(
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="red"/>
                </View>
            )}
        return(
            <View style={styles.container}>
                {this.renderSearch()}
                <Card style={{padding: 10, margin: 10,  backgroundColor: argonTheme.COLORS.WARNING}}>
                    <Text style={{textAlign:'center',color:'white'}}>{this.state.response_type}</Text>
                </Card>
                <FlatList

                    data= {this.state.dataSource}
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    renderItem= {item=> this.renderItem(item)}
                    keyExtractor= {item=>item.anomaly_id+""}
                />
            </View>

    )
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        paddingVertical: '2%',
        fontSize: 18,
        height: 'auto',
    },
    logo: {
        width: 350,
        height: 150,
        position: 'relative',

    },
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: argonTheme.COLORS.BORDER
    },
});
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Image, FlatList } from 'react-native'
import { CustomCard } from './CustomCard';
import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assets/Font/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../assets/Font/SourceSansPro-Bold.ttf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation, useIsFocused } from '@react-navigation/native';
function Start() {
    const [eventList, setEventList] = useState([])
    const [placeName, setPlaceName] = useState(null);
    const [placeNameto, setPlaceNameto] = useState(null);
    const [Detialsofbalance, setDetailsofbalance] = useState(null);
    const [Detialsoftrip, setDetailsoftrip] = useState(null);
    const [Detialsofimage, setDetailsofimage] = useState(null);
    const [Detialsofuser2, setDetailsofuser2] = useState(null);
    const [Profileofclient, setProfileofclient] = useState(null)
    const [Nameofclient, setNameofclient] = useState("");

    const navigation = useNavigation();
    const B = (props) => <Text style={{ fontWeight: 'bold', fontFamily: 'SourceSansProBold' }}>{props.children}</Text>
    const [loaded] = useFonts({
        SourceSansProLight,
        SourceSansProRegular,
        SourceSansProBold,
    });

    const Getdetails2 = async () => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)

        fetch('http://' + ip_add['ip'] + '/api/Customer/' + val['id'], {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setDetailsoftrip(responseJson["trips_as_client"])
                setDetailsofbalance(responseJson["balance"])
                setDetailsofimage(responseJson["Profile"])
                setDetailsofuser2(responseJson["username"])



            })
            .catch((error) => {
                console.error(error);
            });


    }
    const Getdetails1 = async (ip, id) => {
        // console.log('http://192.168.1.13/api/Check/'+route.params.result+'/'+seq)
        fetch('http://' + ip + '/api/Customer/' + id, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setNameofclient(responseJson["username"])
                setProfileofclient(responseJson['Profile'])


            })
            .catch((error) => {
                console.error(error);
            });


    }

    // const Getdetails1 = async (ip, id) => {
    //     try {
    //         const response = await fetch('http://' + ip + '/api/Customer/' + id, {
    //             method: 'GET'
    //         });

    //         if (response.ok) {
    //             const responseJson = await response.json();
    //             const nameofclient = responseJson["username"];
    //             const profileofclient = responseJson['Profile'];

    //             // Do something with the data
    //             console.log(nameofclient);
    //             console.log(profileofclient);

    //             // Return the data if needed
    //             return { nameofclient, profileofclient };
    //         } else {
    //             console.error('Response error:', response.status);
    //         }
    //     } catch (error) {
    //         console.error('Fetch error:', error);
    //     }
    // };




    const fetchPlaceName = async (latitude, longitude) => {
        try {
            // Make a request to the Google Maps Geocoding API
            console.log(latitude, longitude)
            const formattedPlaceName = "";
            const apiKey = 'AIzaSyAIK7Latdow_7V9Arlcy5RtG9gj0hMn0qw'; // Replace with your Google Maps API key
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
            const response = await fetch(url);
            const responseJson = await response.json();
            // Parse the response to extract the place name
            const results = responseJson.results;
            if (results.length > 0) {
                const firstResult = results[0];
                const formattedPlaceName = firstResult.formatted_address;
                setPlaceName(formattedPlaceName);
                console.log(placeName);
            }
        } catch (error) {
            console.error('Error fetching place name:', error);
        }
        return;

    };
    const fetchPlaceNameto = async (latitude, longitude) => {
        try {
            // Make a request to the Google Maps Geocoding API
            console.log(latitude, longitude)
            const formattedPlaceName = "";
            const apiKey = 'AIzaSyAIK7Latdow_7V9Arlcy5RtG9gj0hMn0qw'; // Replace with your Google Maps API key
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
            const response = await fetch(url);
            const responseJson = await response.json();
            // Parse the response to extract the place name
            const results = responseJson.results;
            if (results.length > 0) {
                const firstResult = results[0];
                const formattedPlaceName = firstResult.formatted_address;
                setPlaceNameto(formattedPlaceName);
            }
        } catch (error) {
            console.error('Error fetching place name:', error);
        }
        return;
    };


    const getTimeDifference = (time1) => {

        const date2 = new Date();
        const [hours1, minutes1, second] = time1.split(':');

        const date1 = new Date();
        date1.setHours(hours1);
        date1.setMinutes(minutes1);

        const diffInMilliseconds = date2 - date1;
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours != 0) {
            console.log("Sorry You Can Start Ride Atleast 15 before Your Actual Time ", time1, "Please Wait")
            return;
        }
        else if (diffInHours == 0) {
            if (diffInMinutes <= 15) {
                console.log("Your Ride Is start")
            }
            else {
                console.log("Sorry You Can Start Ride Atleast 15 before Your Actual Time")

            }

        }

    };
    const dateofnext = (givenDate ) => {

        // Convert the given date to a Date object
        var dateObj = new Date(givenDate);

        // Increment the date by 1 day
        dateObj.setDate(dateObj.getDate() + 1);

        // Get the year, month, and day components of the new date
        var year = dateObj.getFullYear();
        var month = dateObj.getMonth() + 1; // Adding 1 because months are zero-based
        var day = dateObj.getDate();

        // Format the new date as "YYYY-MM-DD"
        var formattedDate = year + "-" + month.toString().padStart(2, '0') + "-" + day.toString().padStart(2, '0');
        return formattedDate;
    }
    const Getdetails = async () => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)
        var i = 0
        const dataof = []
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const current = `${year}-${month}-${day}`;

        fetch('http://' + ip_add['ip'] + '/api/FinalCarpool/', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.map(item => {

                    if (item["client_id"] == val['id'] && item['date'] == current) {
 
                        i++;
                        fetchPlaceName(item["lat"], item["long"])
                        fetchPlaceNameto(item["des_lat"], item["des_long"])

                        console.log(ip_add['ip'], item["client_id"])
                        dataof.push({
                            id: item["id"],
                            day: i,
                            time: item['time'],
                            date: dateofnext(item["date"]),
                            from: placeName,
                            to: placeNameto,
                            dist: item['distance'],
                            price: item['price'],
                            seat: item['seat'],
                            did:item["assien_driver"]
                        })


                    }
                    else {

                    }

                });
                console.log(dataof)
                setEventList(dataof)

            })
            .catch((error) => {
                console.error(error);
            });
    }


    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            Getdetails();
            Getdetails();
            Getdetails2();
        }
    }, [isFocused]);
    return (
        <View style={[styles.container, { backgroundColor: "#2921c4" }]}>

            <View style={styles.topview}>
                <View style={styles.welcomecontainer}>
                    <Text style={styles.welcomemessage}>{"Hello," + "<br/>".split("<br/>").join("\n") + Detialsofuser2}</Text>

                    <View>
                    <TouchableOpacity style={{marginBottom:20,marginLeft:15}} onPress={()=>navigation.navigate("Notfication")} >
                            <Ionicons name="notifications" size={24} color="white" />
                        </TouchableOpacity>
                        <Image source={{ uri: Detialsofimage }} style={styles.circle} />
                        
                    </View>
                </View>

            </View>
            <View style={[styles.topview, { backgroundColor: "#2921c4", marginBottom: 20 }]}>

            </View>

            <CustomCard elevated={true} style={{ backgroundColor: "#fff", marginHorizontal: 24, marginTop: -40, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ alignItems: "center", marginLeft: 40 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }} onPress={() => navigation.navigate("Paymentscreen")}>Balance</Text>
                    <Text onPress={() => navigation.navigate("Paymentscreen")} style={{ fontWeight: "bold", fontSize: 18 }}>RM {Detialsofbalance}</Text>
                </View>
                <View style={{ position: "absolute", left: 150, height: 48, borderWidth: 1, top: 10, width: 0, borderColor: "#494746" }}></View>

                <View style={{ alignItems: "center", marginRight: 40 }}>
                    <Text onPress={() => navigation.navigate("PrivateRoom")} style={{ fontWeight: "bold", marginBottom: 10 }}>Total Trips</Text>
                    <Text onPress={() => navigation.navigate("PrivateRoom")} style={{ fontWeight: "bold", fontSize: 18 }}>{Detialsoftrip}</Text>
                </View>
            </CustomCard>
            <View style={styles.bottomview}>

                <CustomCard elevated={true} style={{ backgroundColor: "#fff", marginHorizontal: 24, marginTop: 30, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent: "space-between" }}>

                    <View style={{ width: "100%" }}>
                        {/* <View style={styles.container}> */}

                        {/* </View> */}

                        <FlatList
                            data={eventList}
                            renderItem={({ item }) => (
                                <View style={styles.card}>
                                    <View style={styles.item}>
                                        <View style={styles.itemContent}>

                                            <Text style={styles.userName}><B>Date: </B>{item.date}</Text>
                                            <Text style={styles.userName}><B>Time: </B>{item.time}</Text>

                                            <Text style={styles.description}>
                                                Please Remember The carpool Have A Safe Journey
                                            </Text>
                                            <Text style={styles.userName}>
                                                <B>From: </B>{placeName}

                                            </Text>
                                            <Text>{"\n"}</Text>
                                            <Text style={styles.userName}>
                                                <B>To: </B>{placeNameto}
                                            </Text>
                                            <Text>{"\n"}</Text>
                                            <Text style={styles.userName}>
                                                <B>Distance: </B>{item.dist}KM

                                            </Text>
                                            <Text style={styles.userName}>
                                                <B>Seat: </B>{item.seat}{"  "}</Text>
                                                
                                            <Text style={styles.userName}>
                                                <B>Per Seat:</B> Seat{"("}{item.seat}{")"} X RM {(item.price).toFixed(2)}</Text>
                                            <Text style={styles.userName}>
                                                <B>Total Price: </B>RM {item.price * item.seat}</Text>


                                        </View>
                                    </View>
                                    
                                    <View style={styles.buttons}>
                                        <TouchableOpacity style={styles.loginButton}  onPress={() => navigation.navigate("ClientMap",{"clientid":item.did})}  >
                                            <Text style={styles.loginButtonText}>{"       "}Driver Location{"      "}</Text>

                                        </TouchableOpacity>

                                    </View>
                                    <View style={styles.buttons}>
                                        <TouchableOpacity style={styles.loginButton}  onPress={() => navigation.navigate("CheckEvent",{"id":item.did})}  >
                                            <Text style={styles.loginButtonText}>{"          "}Driver Details{"      "}</Text>

                                        </TouchableOpacity>

                                    </View>


                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>











                </CustomCard>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DCDCDC',
    },
    welcomemessage: {
        color: "#fff",
        fontSize: 35,
        fontWeight: "bold"
    },
    searchbar: {
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        width: "100%",
        height: 40,
        borderRadius: 10,
        marginBottom: 65
    },
    circle: {
        borderRadius: 25,
        height: 50,
        width: 50,
        backgroundColor: "#fff"
    },
    welcomecontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    eventList: {
        marginTop: 10,
    },
    eventBox: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
    },
    bottomview: {
        flex: 2,
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        marginTop: 20,
        borderTopRightRadius: 50,
    },
    container: {
        flex: 1,
        backgroundColor: "#3A9EC2",
    },
    topview: {

        marginTop: 60,
        marginHorizontal: 24,
        backgroundColor: "#2921c4",
        justifyContent: "space-between"

    },
    eventDate: {
        flexDirection: 'column',
    },
    eventDay: {
        fontSize: 50,
        color: '#0099FF',
        fontWeight: '600',
    },
    eventMonth: {
        fontSize: 16,
        color: '#0099FF',
        fontWeight: '600',
    },
    buttonsContainer: {
        flex: 2,
        flexDirection: 'row',
        marginHorizontal: 30,
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 20,
        padding: 10,
        justifyContent: 'space-around'
    },
    button: {
        width: '48%',
        height: 50,
        padding: 10,
        marginLeft: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    Accept: {
        backgroundColor: '#000000'
    },
    Reject: {
        backgroundColor: '#DB4437'
    },
    eventContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
    },
    description: {
        fontSize: 15,
        color: '#646464',
        marginTop: 10,
        marginBottom: 10
    },
    eventTime: {
        fontSize: 18,
        color: '#000000',
        fontFamily: 'SourceSansProRegular',
        marginTop: 10,
        marginBottom: 10
    },
    userName: {
        fontSize: 16,
        color: '#151515',
        fontFamily: 'SourceSansProRegular',
        marginBottom: 10
    },


    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
        color: '#fff',
        marginHorizontal: 20,
    },
    card: {
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        // marginRight: 20,
        marginLeft: 75,
        marginBottom: 10
    },
    itemContent: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
        color: '#999',
    },
    buttons: {
        flexDirection: 'row',
        marginLeft:-15,
        marginTop:10
    },
    buttonq: {
        backgroundColor: '#50AB04',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginLeft: 30
    },
    buttonqw: {
        backgroundColor: '#DB4437',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 4,
        marginLeft: 50
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
export default Start;
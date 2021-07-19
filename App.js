import React, { Component } from 'react';
import { Text, View, Linking, TouchableHighlight, PermissionsAndroid, Platform, StyleSheet,Image} from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import {Dimensions } from "react-native";
export default class App extends Component {
  constructor() {
    super();
    this.state = {      
      varcodeValue: '',
      opneScanner: false,
    };
  }
  async componentDidMount(){
    this.onOpneScanner() 
  }
  onOpneScanner() {
    var that =this;
    // To Start Scanning    
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'Barcode Scanner App Camera Permission',
              'message': 'Barcode Scanner App needs access to your camera'
            }
          )
          
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted            
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    }else{
      // that.setState({ varcodeValue: '' });
      // that.setState({ opneScanner: true });
    }    
  }
  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    const IMAGENAME = require('./scanner.png');
    const SETTINGIMAGENAME = require('./settings.png');
    const CHECKIMAGENAME = require('./tick.jpg');
    const UNCHECKIMAGENAME = require('./cross.png');
    let displayModal;
    //If qrvalue is set then return this view
    if (!this.state.opneScanner) {
      return (
        <View style={{flex:1, flexDirection:'column', backgroundColor:'gray'}}>
          <View style={{flex:0.1, flexDirection:'column', backgroundColor:'gray',alignContent:'center',alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'white',fontWeight: "bold",fontSize: 20}} >Barcode Scanner App</Text>
          </View>
          <View style={{flex:0.9, flexDirection:'column', backgroundColor:'gray'}}>
            <View style={{flex:'column',flex:0.9,backgroundColor:'white',alignContent:'center',alignItems:'center', justifyContent:'center'}}>
              {this.state.varcodeValue.substr(0,3)==='867' ?
            <View style={{flexDirection:'column',backgroundColor:'white',alignContent:'center',alignItems:'center', justifyContent:'center'}}>                
              <Text >Result</Text>  
              <Image source={ CHECKIMAGENAME } style = {{ width:100, height:100}}/>            
              <Text >{this.state.varcodeValue ? 'Mached Bar Code: '+this.state.varcodeValue : ''}</Text>
            </View>
            :
            <View style={{flexDirection:'column',backgroundColor:'white',alignContent:'center',alignItems:'center', justifyContent:'center'}}>                
              <Text >Result</Text> 
              <Image source={ UNCHECKIMAGENAME } style = {{ width:100, height:100}}/>             
              <Text >{this.state.varcodeValue ? 'Un-Mached Bar Code: '+this.state.varcodeValue : ''}</Text>
            </View>                
          }  

            </View>
            <View style={{flex:0.1,flexDirection:'row', backgroundColor:'gray'}}>
              <View style={{flex:3,backgroundColor:'black'}}>
                
                  
                  <TouchableHighlight
                    onPress={() => this.onOpneScanner()}
                    style={{flex: 1,flexDirection:'column', backgroundColor:"#303945",alignItems:"center", alignContent:'center', justifyContent:'center'}}>
                      {/* <View style={{flex:1, flexDirection:'column'}}> */}
                      <Image source={ IMAGENAME } style = {{flex:1,resizeMode: 'contain'}}/>
                      {/* <Text style={{flex:0.3, color: '#FFFFFF', fontSize: 12 }}>
                        Scanner
                      </Text> */}
                  </TouchableHighlight>
              
              </View>
              <View style={{flex:4,backgroundColor:'black'}}></View>
              <View style={{flex:3,backgroundColor:'yellow'}}>
                <TouchableHighlight
                      // onPress={() => this.onOpneScanner()}
                      style={{flex: 1,flexDirection:'column', backgroundColor:"#303945",alignItems:"center", alignContent:'center', justifyContent:'center'}}>
                        <Image source={ SETTINGIMAGENAME } style = {{flex:1,resizeMode: 'contain'}}/>
                  </TouchableHighlight>
              </View>
            </View>
            </View>
        </View>
      );
    }
    return (
      <View style={{flex:1, flexDirection:'column', backgroundColor:'gray'}}>
        <View style={{flex:0.1, flexDirection:'column', backgroundColor:'gray',alignContent:'center',alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'white',fontWeight: "bold",fontSize: 20}} >Barcode Scanner App</Text>
        </View>
        <View style={{flex:0.9, flexDirection:'column', backgroundColor:'gray'}}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            // console.log(barcodes);
            this.setState({opneScanner:false})
            this.setState({varcodeValue:barcodes[0].data})
            
          }}
        >
          <BarcodeMask width={300} height={300}  edgeColor={'#62B1F6'} showAnimatedLine={true}/>
        </RNCamera>
        </View>
      </View>
      // <View style={{ flex: 1 }}>
        
      //   <RNCamera>
      //     <BarcodeMask width={300} height={500}  edgeColor={'#62B1F6'} showAnimatedLine={true}/>
      //   </RNCamera>
      // </View>
    );
    
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
    Viewcontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  button:{
    backgroundColor:"gray",
    padding: 10
  }
});
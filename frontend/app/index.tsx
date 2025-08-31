// app/(tabs)/menu/vouchers.tsx
import { Image } from 'expo-image';
import { TextInput, Pressable, ImageBackground, ActivityIndicator, Modal} from 'react-native';
import React, { useState, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import QRCode from 'react-native-qrcode-svg';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { SafeAreaView } from 'react-native-safe-area-context';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import  Footer  from '@/components/Footer';
import ContainerStyles from '@/components/ContainerStyles';
import ButtonAndInputStyles from '@/components/ButtonAndInputStyles';

import { giftVoucher } from '@/components/giftVoucher';
import { orderVoucher } from '@/components/backendService';
import { validateVoucherForm } from '@/components/validateVoucherForm';
import { createVoucherDownload } from '@/components/createVoucherDownload';
import { emptyVoucher } from '@/constants/emptyVoucher';


export default function VouchersScreen() {

const [title, setTitle] = useState('');
const [firstName, setFirstName] = useState('');  
const [lastName, setLastName] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [email, setEmail] = useState('');
const [value, setValue] = useState(0);
const [giftVoucher, setGiftVoucher] = useState<giftVoucher>(emptyVoucher);
const [stage, setStage] = React.useState("orderVoucher");

const qrRef = useRef<any>(null);
const [purchaseButtonInUse, setPurchaseButtonInUse] = useState(false);
const [downloadButtonInUse, setDownloadButtonInUse] = useState(false);
const [isLoading, setIsLoading] = useState(false);

//Options for the value picker
const options = [];
  options.push(0)
  for (let i = 20; i <= 150; i += 5) {
    options.push(i);
  }

  // when the return Button is pressed Reset all values
  const handleReset = async () => {
    setTitle ('');
    setFirstName ('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setValue(0);
    setGiftVoucher(emptyVoucher);
    setStage("orderVoucher");
  }

  // function to handle the submit of a voucher purchase request
  const handleSubmit = async () => {

      //check and verfy all fields are filled in correctly
        const error = validateVoucherForm({
          title,
          firstName,
          lastName,
          phoneNumber,
          email,
          value,
      });

      if (error) {
        alert(error);
        return;
        }
      else {
        setPurchaseButtonInUse(true);
        // show  loading screen
        setIsLoading(true);
        try{
        //submit entered data and set gift voucher g with returned values then set stage to display voucher
        const g = await orderVoucher (title, firstName, lastName, phoneNumber, email, value);
        setGiftVoucher(g);
        setStage ("displayVoucher");
        }
        catch (err) {
          //If there was an error at the backend handle it and go back to ordering stage
          alert ("An error has occured please try again");
          setStage ("orderVoucher");
        }
      }

      //stop showing loading screen
      setIsLoading(false);
      setPurchaseButtonInUse(false);

  }
//Function that generates a QRCodeDataUrl
  const getQRCodeDataUrl = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!qrRef.current) {
      reject("QR code not ready");
      return;
    }

    qrRef.current.toDataURL((data: string) => {
      resolve(`data:image/png;base64,${data}`);
    });
  });
};


  //function that handles voucher downloads to local storage or to send on
  const handleDownloadVoucher = async () => {
  setDownloadButtonInUse(true);
  try {
    const voucher = giftVoucher;
    const qrCodeUrl = await getQRCodeDataUrl();
    const html = createVoucherDownload(voucher, qrCodeUrl);

    const { uri } = await Print.printToFileAsync({ html });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      alert(`PDF ready: ${uri}`);
    }
  } catch (error) {
    console.error('PDF creation failed:', error);
    alert("Error: Could not generate PDF");
  } finally {
    setDownloadButtonInUse(false); // always reset state
  }
};

  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: '#560324'}}>
      <ParallaxScrollView>
       
          <Image
            source={require('@/assets/images/Vouchers.jpg')}
            style={ContainerStyles.titleImage}
            />
        

      { stage == "orderVoucher" && //stage to order the voucher
    
      <ThemedView>

      <ThemedView style={ContainerStyles.titleContainer}>
        <ThemedText type="title">Gift Vouchers</ThemedText>
      </ThemedView>

      <ThemedText type="subtitle">Title:</ThemedText>
      <ThemedView style={ButtonAndInputStyles.pickerWrapper}>
        <Picker
          selectedValue={title}
          onValueChange={(itemValue) => setTitle(itemValue)}
          style={ButtonAndInputStyles.picker}
          >
          <Picker.Item label="Choose title" value="" />
          <Picker.Item label="Mr." value="Mr." />
          <Picker.Item label="Mrs." value="Mrs." />
          <Picker.Item label="Miss" value="Miss" />
          <Picker.Item label="Ms." value="Ms." />
          <Picker.Item label="Mx." value="Mx." />
        </Picker>
      </ThemedView>
      
      <ThemedText type = "subtitle">Name:</ThemedText>
      <TextInput
        style={ButtonAndInputStyles.input}
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={ButtonAndInputStyles.input}
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
      />

      <ThemedText type = "subtitle">Phone Number: </ThemedText>
      <TextInput
        style={ButtonAndInputStyles.input}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

     <ThemedText type = "subtitle">Email:</ThemedText>
      <TextInput
        style={ButtonAndInputStyles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

       <ThemedText type = "subtitle">Select a value:</ThemedText>
       <ThemedView style={ButtonAndInputStyles.pickerWrapper}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => setValue(itemValue)}
          style={ButtonAndInputStyles.picker}
        >
          {options.map((val) => (
            <Picker.Item key={val} label={val.toString()} value={val} />
          ))}
        </Picker>
        </ThemedView>

        <ThemedView>
          <Pressable  style={[!purchaseButtonInUse && ButtonAndInputStyles.button, purchaseButtonInUse && ButtonAndInputStyles.buttonInUse]} 
                      onPress={handleSubmit}>
              <ThemedText type= 'subtitle'>Purchase</ThemedText>
          </Pressable>
        </ThemedView>

        </ThemedView>

      }

      { stage == "displayVoucher" && //stage to display the voucher
        <ThemedView>
        <ImageBackground
          source={require('@/assets/images/voucher_background.png')} 
          style={ContainerStyles.voucherBackground}
          imageStyle={{ borderRadius: 10 }} 
        >
          <ThemedView style={{ marginBottom:40, backgroundColor: 'transparent' }}>
            <ThemedView style={{ backgroundColor: 'transparent' }}>
              <ThemedText type="voucherTitle">Gift Voucher</ThemedText>
              <ThemedText type="voucherValue">Value: £{giftVoucher.value}</ThemedText>
              <ThemedText type="voucher"> QR code: </ThemedText>
                  <ThemedView style={ContainerStyles.qrContainer}>
                    <QRCode
                        value={giftVoucher.voucherNumber}
                        size={128}
                        getRef={(ref) => (qrRef.current = ref)}
                    />
                  </ThemedView>
              <ThemedText type="voucher">Voucher Number: {giftVoucher.voucherNumber}</ThemedText>
              <ThemedText type="voucher">Date of issue: {giftVoucher.date}</ThemedText>
              <ThemedText type="voucherFineprint">Vouchers are valid for 1 year from date of issue.</ThemedText>
              <ThemedText type="voucherFineprint">We accept no responsibility for lost or misplaced vouchers.
                                         Under no circumstanes can these be replaced or redeemed.</ThemedText>
            </ThemedView>
          
          </ThemedView>

        </ImageBackground>

        <ThemedView>
            <Pressable style={[!downloadButtonInUse && ButtonAndInputStyles.button, downloadButtonInUse && ButtonAndInputStyles.buttonInUse]} onPress={handleDownloadVoucher}>
              <ThemedText type="subtitle">Download Voucher</ThemedText>
            </Pressable>
          </ThemedView>

          <ThemedView >
           <Pressable style={ButtonAndInputStyles.button} onPress={handleReset}>
              <ThemedText type= 'subtitle'>Return</ThemedText>
           </Pressable>
          </ThemedView>

        </ThemedView>
      }
          {/* Modal showing the loading screen while voucher is beeing processed*/}
          <Modal
            transparent={true}
            animationType="fade"
            visible={isLoading}
          >
            <ThemedView style={ContainerStyles.loadingOverlay}>
              <ActivityIndicator size="large" color="#560324" />
            </ThemedView>
          </Modal>

      <Footer />

      </ParallaxScrollView>
    </SafeAreaView>
  );
}





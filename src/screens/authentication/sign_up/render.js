/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* LIBRARY */
import React from 'react';
import {
  View, TouchableWithoutFeedback, Keyboard, TouchableOpacity
} from 'react-native';
import {
  Form, Item, Input, Label, Button, Spinner, Container,
  Content
} from "native-base";
import Icon from 'react-native-fontawesome-pro';
import { useColorScheme } from 'react-native-appearance';
import CountryPicker, {
  Flag,
  DARK_THEME,
  DEFAULT_THEME
} from 'react-native-country-picker-modal';
/* COMPONENTS */
import CItemInput from "~/components/CItemInput";
import CViewRow from "~/components/CViewRow";
import CText from '~/components/CText';
/* COMMON */
import { Colors } from '~/utils/colors';
import { cStyles } from '~/utils/styles';
import { Configs, Devices, Languages } from '~/config';
/* STYLES */
import styles from './style';


const inputFields = {
  username: "username",
  firstname: "firstname",
  lastname: "lastname",
  email: "email",
  phone: "phone",
  password: "password",
  confirmpassword: "confirmpassword"
}

export const ViewSignUp = ({
  state = null,
  props = null,
  inputs = {},
  onFunction = {
    onFocusNextField: () => { },
    onPressSignUp: () => { },
    onPressBack: () => { },
    onSendOtp: () => { },
    onTogglePicker: () => { },
    onSelectCountry: () => { },
    onPressSignIn: () => { },
    onChangeText: () => { }
  }
}) => {
  let colorScheme = useColorScheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style={cStyles.container_auth}>
        <Content style={cStyles.flex_full} contentContainerStyle={styles.con_header}>
          <Form style={styles.con_form_sign_in}>
            <Button style={styles.con_btn_back} transparent rounded onPress={onFunction.onPressBack} >
              <Icon containerStyle={styles.con_icon_back}
                name={"times-circle"}
                size={Devices.fS(25)}
                color={Colors.BLACK_COLOR}
                type={"regular"} />
            </Button>

            <View style={styles.con_name}>
              {/** FIRST NAME INPUT */}
              <Item style={[styles.con_input, cStyles.flex_full, cStyles.mr_5]} floatingLabel last error={state._errorFirstName !== ""}>
                <Label style={styles.con_label}><CText style={styles.txt_label} i18nKey={'first_name'} /></Label>
                <Input style={[styles.txt_input, Configs.supportRTL && cStyles.txt_RTL]}
                  getRef={ref => inputs[inputFields.firstname] = ref}
                  disabled={state._loading}
                  removeClippedSubviews={Devices.OS === 'android'}
                  placeholderTextColor={Colors.PLACEHOLDER_COLOR}
                  value={state._valueFirstName}
                  blurOnSubmit={false}
                  autoFocus={true}
                  returnKeyType={'next'}
                  selectionColor={Colors.BLACK_COLOR}
                  onChangeText={value => onFunction.onChangeText(value, "firstname")}
                  onSubmitEditing={() => inputs[inputFields.lastname]._root.focus()}
                />
              </Item>

              {/** LAST NAME INPUT */}
              <Item style={[styles.con_input, cStyles.flex_full, cStyles.ml_5]} floatingLabel last error={state._errorLastName !== ""}>
                <Label style={styles.con_label}><CText style={styles.txt_label} i18nKey={'last_name'} /></Label>
                <Input style={[styles.txt_input, Configs.supportRTL && cStyles.txt_RTL]}
                  getRef={ref => inputs[inputFields.lastname] = ref}
                  disabled={state._loading}
                  removeClippedSubviews={Devices.OS === 'android'}
                  placeholderTextColor={Colors.PLACEHOLDER_COLOR}
                  value={state._valueLastName}
                  blurOnSubmit={false}
                  returnKeyType={'next'}
                  selectionColor={Colors.BLACK_COLOR}
                  onChangeText={value => onFunction.onChangeText(value, "lastname")}
                  onSubmitEditing={() => inputs[inputFields.username]._root.focus()}
                />
              </Item>
            </View>

            {/** USER NAME INPUT */}
            <Item style={styles.con_input} floatingLabel last error={state._errorUserName !== ""}>
              <Label style={styles.con_label}><CText style={styles.txt_label} i18nKey={'user_name'} />*</Label>
              <Input style={[styles.txt_input, Configs.supportRTL && cStyles.txt_RTL]}
                getRef={ref => inputs[inputFields.username] = ref}
                disabled={state._loading}
                removeClippedSubviews={Devices.OS === 'android'}
                placeholderTextColor={Colors.PLACEHOLDER_COLOR}
                value={state._valueUserName}
                blurOnSubmit={false}
                returnKeyType={'next'}
                selectionColor={Colors.BLACK_COLOR}
                onChangeText={value => onFunction.onChangeText(value, "username")}
                onSubmitEditing={() => inputs[inputFields.email]._root.focus()}
              />
            </Item>
            {state._errorUserName !== "" && <CText style={styles.txt_error} i18nKey={state._errorUserName} />}

            {/** EMAIL INPUT */}
            <Item style={styles.con_input} floatingLabel last error={state._errorEmail !== ""}>
              <Label style={styles.con_label}><CText style={styles.txt_label} i18nKey={'email'} />*</Label>
              <Input style={[styles.txt_input, Configs.supportRTL && cStyles.txt_RTL]}
                keyboardType={'email-address'}
                getRef={ref => inputs[inputFields.email] = ref}
                disabled={state._loading}
                removeClippedSubviews={Devices.OS === 'android'}
                value={state._valueEmail}
                blurOnSubmit={false}
                returnKeyType={'next'}
                selectionColor={Colors.BLACK_COLOR}
                onChangeText={value => onFunction.onChangeText(value, "email")}
                onSubmitEditing={() => inputs[inputFields.phone]._root.focus()}
              />
            </Item>
            {state._errorEmail !== "" && <CText style={styles.txt_error} i18nKey={state._errorEmail} />}

            {/** PHONE INPUT */}
            <CItemInput style={cStyles.pt_15}
              leftComp={
                <TouchableOpacity onPress={onFunction.onTogglePicker}>
                  <CViewRow style={[cStyles.row_align_center, Configs.supportRTL && { marginRight: -15 }]}
                    leftComp={
                      <View>
                        <Flag countryCode={state._flag} flagSize={Devices.fS(25)} withFlagButton={true} />
                      </View>
                    }
                    rightComp={
                      <View style={cStyles.row_align_center}>
                        <CText style={[styles.txt_input, { marginLeft: 0 }]}>{state._callingCode}</CText>
                        <Icon containerStyle={{ marginTop: -10 }} name={"sort-down"} color={Colors.BLACK_COLOR} size={Devices.fS(20)} type={"solid"} />
                      </View>
                    }
                  />
                </TouchableOpacity>
              }
              rightComp={
                <Input style={[
                  styles.txt_input,
                  Configs.supportRTL && cStyles.txt_RTL,
                  Configs.supportRTL ? cStyles.mr_5 : cStyles.ml_5
                ]}
                  keyboardType={"phone-pad"}
                  ref={ref => inputs[inputFields.phone] = ref}
                  disabled={state._loading}
                  removeClippedSubviews={Devices.OS === 'android'}
                  value={state._valuePhone}
                  blurOnSubmit={false}
                  returnKeyType={'next'}
                  placeholder={Languages[props.language].phone_number}
                  placeholderTextColor={Colors.PLACEHOLDER_COLOR}
                  selectionColor={Colors.BLACK_COLOR}
                  onChangeText={value => onFunction.onChangeText(value, "phone")}
                  onSubmitEditing={() => inputs[inputFields.password]._root.focus()} />
              }
            />

            {/** PASSWORD INPUT */}
            <Item style={styles.con_input} floatingLabel last error={state._errorPassword !== ""}>
              <Label style={styles.con_label}><CText style={styles.txt_label} i18nKey={'password'} />*</Label>
              <Input style={[styles.txt_input, Configs.supportRTL && cStyles.txt_RTL]}
                secureTextEntry
                getRef={ref => inputs[inputFields.password] = ref}
                disabled={state._loading}
                removeClippedSubviews={Devices.OS === 'android'}
                placeholderTextColor={Colors.PLACEHOLDER_COLOR}
                value={state._valuePassword}
                blurOnSubmit={false}
                returnKeyType={'next'}
                selectionColor={Colors.BLACK_COLOR}
                onChangeText={value => onFunction.onChangeText(value, "password")}
                onSubmitEditing={() => inputs[inputFields.confirmpassword]._root.focus()}
              />
            </Item>
            {state._errorPassword !== "" && <CText style={styles.txt_error} i18nKey={state._errorPassword} />}

            {/** CONFIRM PASSWORD INPUT */}
            <Item style={styles.con_input} floatingLabel last error={state._errorConfirmPassword !== ""}>
              <Label style={styles.con_label}><CText style={styles.txt_label} i18nKey={'password_verification'} />*</Label>
              <Input style={[styles.txt_input, Configs.supportRTL && cStyles.txt_RTL]}
                secureTextEntry
                getRef={ref => inputs[inputFields.confirmpassword] = ref}
                disabled={state._loading}
                removeClippedSubviews={Devices.OS === 'android'}
                placeholderTextColor={Colors.PLACEHOLDER_COLOR}
                value={state._valueConfirmPassword}
                blurOnSubmit={false}
                returnKeyType={'done'}
                selectionColor={Colors.BLACK_COLOR}
                onChangeText={value => onFunction.onChangeText(value, "confirmpassword")}
                onSubmitEditing={onFunction.onPressSignUp}
              />
            </Item>
            {state._errorConfirmPassword !== "" && <CText style={styles.txt_error} i18nKey={state._errorConfirmPassword} />}

            {state._successFetch !== "" &&
              <View style={styles.con_fetch_status}>
                <Icon name={'check-circle'} color={Colors.GREEN_COLOR} size={Devices.fS(20)} type={'solid'} />
                <CText style={styles.txt_fetch_success} i18nKey={state._successFetch} />
              </View>
            }

            {state._errorFetch !== "" &&
              <View style={styles.con_fetch_status}>
                <Icon name={'times-circle'} color={Colors.RED_COLOR} size={Devices.fS(20)} type={'solid'} />
                <CText style={styles.txt_fetch_failed} numberOfLines={3}>{state._errorFetch}</CText>
              </View>
            }

            <Button style={[styles.con_btn, { backgroundColor: Colors.PRIMARY_COLOR }]}
              iconLeft_1 block
              disabled={state._loading}
              onPress={onFunction.onPressSignUp}>
              {state._loading && <Spinner style={styles.spi_loading} color={Colors.WHITE_COLOR} size={'small'} />}
              <CText style={styles.txt_btn} i18nKey={'sign_up'} />
            </Button>

            <TouchableWithoutFeedback onPress={onFunction.onPressSignIn}>
              <View style={[cStyles.row_align_center, cStyles.row_justify_center]}>
                <CText style={styles.txt_already_account} i18nKey={"already_have_account"} />
                <CText> </CText>
                <CText style={styles.txt_sign_in} i18nKey={"sign_in"} />
              </View>
            </TouchableWithoutFeedback>
          </Form>
        </Content>

        <CountryPicker
          containerButtonStyle={{ opacity: 0 }}
          withFilter
          withFlag
          withCountryNameButton
          withAlphaFilter
          withCallingCode
          withFlagButton
          theme={colorScheme === "dark" ? DARK_THEME : DEFAULT_THEME}
          modalProps={{
            visible: state._visible
          }}
          onSelect={(country) => onFunction.onSelectCountry(country)}
          onClose={onFunction.onTogglePicker}
        />
      </Container>
    </TouchableWithoutFeedback>
  )
}
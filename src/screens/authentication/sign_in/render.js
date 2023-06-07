/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* LIBRARY */
import React from 'react';
import {
  View, TouchableOpacity, TouchableWithoutFeedback, Keyboard,
  Text
} from 'react-native';
import {
  Container, Content, Form, Item, Input, Label, Button,
  Spinner
} from "native-base";
import appleAuth from '@invertase/react-native-apple-authentication';
import Icon from 'react-native-fontawesome-pro';
/* COMPONENTS */
import CText from '~/components/CText';
/* COMMON */
import { Devices, Configs, Languages } from '~/config';
import { Colors } from '~/utils/colors';
import { cStyles } from '~/utils/styles';
/* STYLES */
import styles from './style';

const inputFields = {
  email: "email",
  password: "password"
}

export const ViewSignIn = ({
  state = null,
  props = null,
  inputs = {},
  onFunction = {
    onPressBack: () => { },
    onChangeValue: () => { },
    onFocusNextField: () => { },
    onPressForgotPassword: () => { },
    onPressSignUp: () => { },
    onPressLogin: () => { },
    onPressLoginFB: () => { },
    onPressLoginGG: () => { },
    onPressLoginAP: () => { }
  }
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style={cStyles.container_auth}>
        <Content style={cStyles.flex_full} contentContainerStyle={[cStyles.ph_20, styles.con_header]}>
          <Button style={styles.con_btn_back} transparent rounded onPress={onFunction.onPressBack} >
            <Icon containerStyle={styles.con_icon_back}
              name={"times-circle"}
              size={Devices.fS(25)}
              color={Colors.BLACK_COLOR}
              type={"regular"} />
          </Button>

          <Form style={styles.con_form_sign_in}>
            <CText style={styles.txt_title} i18nKey={"hello_guest_signin"} />
            <CText style={styles.txt_title} numberOfLines={3} i18nKey={"hello_guest_signin_2"} />

            {/** EMAIL INPUT */}
            <Item style={styles.con_input} floatingLabel last error={state._errorEmail !== ""}>
              <Label style={styles.con_label}>
                <CText style={styles.txt_label} i18nKey={'email_or_username'} />
              </Label>
              <Input style={[styles.txt_input, Configs.supportRTL && cStyles.txt_RTL]}
                keyboardType={'email-address'}
                getRef={ref => inputs[inputFields.email] = ref}
                disabled={state._loading}
                removeClippedSubviews={Devices.OS === 'android'}
                placeholderTextColor={Colors.PLACEHOLDER_COLOR}
                blurOnSubmit={false}
                returnKeyType={'next'}
                selectionColor={Colors.BLACK_COLOR}
                autoFocus={true}
                value={state._valEmail}
                onChangeText={(value) => onFunction.onChangeValue(value, "email")}
                onSubmitEditing={() => onFunction.onFocusNextField(inputFields.password)}
              />
            </Item>
            {state._errorEmail !== "" && <CText style={styles.txt_error} i18nKey={state._errorEmail} />}

            {/** PASSWORD INPUT */}
            <Item style={styles.con_input} floatingLabel last error={state._errorPassword !== ""}>
              <Label style={styles.con_label}>
                <CText style={styles.txt_label} i18nKey={'password'} />
              </Label>
              <Input style={[styles.txt_input, Configs.supportRTL && cStyles.txt_RTL]}
                secureTextEntry
                getRef={ref => inputs[inputFields.password] = ref}
                disabled={state._loading}
                removeClippedSubviews={Devices.OS === 'android'}
                placeholderTextColor={Colors.PLACEHOLDER_COLOR}
                blurOnSubmit={false}
                returnKeyType={'done'}
                selectionColor={Colors.BLACK_COLOR}
                value={state._valPassword}
                onChangeText={(value) => onFunction.onChangeValue(value, "password")}
                onSubmitEditing={onFunction.onPressLogin}
              />
            </Item>
            {state._errorPassword !== "" && <CText style={styles.txt_error} i18nKey={state._errorPassword} />}

            <Button block
              style={[styles.con_btn, { backgroundColor: Colors.PRIMARY_COLOR }]}
              disabled={state._loading}
              onPress={onFunction.onPressLogin}>
              {state._loading && <Spinner style={styles.spi_loading} color={Colors.WHITE_COLOR} size={'small'} />}
              {!state._loading && <CText style={styles.txt_btn} i18nKey={'sign_in'} />}
            </Button>

            <View style={styles.con_forgot_password}>
              <TouchableOpacity activeOpacity={.5} onPress={onFunction.onPressForgotPassword}>
                <CText style={styles.txt_forgot_password} i18nKey={'forgot_password'} />
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />

            {Devices.OS === 'ios' && appleAuth.isSupported && props.setting.general.is_allow_apple_login &&
              <Button block style={[styles.con_btn_social, styles.con_btn_apple]}
                disabled={state._loading}
                onPress={onFunction.onPressLoginAP}>
                <Icon containerStyle={styles.con_icon_socials}
                  name={'apple'}
                  color={Colors.WHITE_COLOR}
                  size={Devices.fS(25)}
                  type={'brands'} />
                <Text style={styles.txt_login_social}>{Languages[props.language].sign_in_with_apple}</Text>
              </Button>
            }
            {props.setting.general.is_allow_facebook_login &&
              <Button block style={[styles.con_btn_social, styles.con_btn_facebook]}
                disabled={state._loading}
                onPress={onFunction.onPressLoginFB}>
                <Icon containerStyle={styles.con_icon_socials}
                  name={'facebook'}
                  color={Colors.WHITE_COLOR}
                  size={Devices.fS(25)}
                  type={'brands'} />
                <Text style={styles.txt_login_social}>{Languages[props.language].sign_in_with_facebook}</Text>
              </Button>
            }

            {props.setting.general.is_allow_google_login &&
              <Button block style={[styles.con_btn_social, styles.con_btn_google]}
                disabled={state._loading}
                onPress={onFunction.onPressLoginGG}>
                <Icon containerStyle={styles.con_icon_socials}
                  name={'google'}
                  color={Colors.WHITE_COLOR}
                  size={Devices.fS(25)}
                  type={'brands'} />
                <Text style={styles.txt_login_social}>{Languages[props.language].sign_in_with_google}</Text>
              </Button>
            }

            <Button style={styles.con_btn_sign_up}
              block bordered transparent
              disabled={state._loading}
              onPress={onFunction.onPressSignUp}>
              <CText style={[styles.txt_btn, { color: Colors.BACKGROUND_PRIMARY_COLOR }]} i18nKey={'sign_up'} />
            </Button>
          </Form>
        </Content>
      </Container>
    </TouchableWithoutFeedback>

  )
}
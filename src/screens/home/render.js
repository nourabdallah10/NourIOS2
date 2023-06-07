/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/**
 ** Name:
 ** Author:
 ** CreateAt:
 ** Description:
 **/
/* LIBRARY */
import React from 'react';
import { View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Container, Content } from 'native-base';
import moment from 'moment';
/* COMPONENTS */
import CHeader from '~/components/CHeader';
import CText from '~/components/CText';
import CCarousel from '~/components/CCarousel';
import CImage from '~/components/CImage';
import Horizontal from '~/components/CLayout/Horizontal';
import CLoading from '~/components/CLoading';
import Column from '~/components/CLayout/Column';
import CardView from '~/components/CLayout/CardView';
import CRate from '~/components/CRate';
import CViewRow from '~/components/CViewRow';
import CLoadingPlaceholder from '~/components/CLoadingPlaceholder';
/* COMMON */
import { Colors } from '~/utils/colors';
import { Assets, Configs, Devices, Keys } from '~/config';
import { cStyles } from '~/utils/styles';
import { layoutWidth } from '~/utils/layout_width';
import Currency from '~/utils/currency';
import Helpers from '~/utils/helpers';
/* STYLES */
import styles from './style';

const renderCouponItem = (index, data, dataLength, onPressPostDetail) => {
  let slugDiscountType = Configs.discountType.find(
    (f) => f.id === data.discount_type,
  );
  let dateExpires = moment(data.date_expires, 'YYYY-MM-DDTHH:mmss').format(
    Configs.formatDate,
  );
  let amount = Helpers.formatNumber(
    Number(data.amount),
    data.discount_type === 'percent' ? 0 : 2,
  );
  let symbol = Helpers.symbolCurrency();

  return (
    <TouchableOpacity onPress={() => onPressPostDetail(data)}>
      <View
        style={[
          styles.con_item_coupon,
          !Configs.supportRTL
            ? { marginLeft: Devices.pH(layoutWidth.width) }
            : { marginRight: Devices.pH(layoutWidth.width) },
        ]}>
        <View
          style={[
            styles.con_coupons_item,
            { backgroundColor: Colors.BACKGROUND_PRIMARY_COLOR },
          ]}>
          <CImage style={styles.img_coupon} source={Assets.image_bg_coupons}>
            <View style={styles.con_bg_blur} />
            {
              <View
                style={[
                  styles.con_info_coupon,
                  Configs.supportRTL && cStyles.column_align_end,
                  !Configs.supportRTL && cStyles.pl_10,
                  Configs.supportRTL && cStyles.pr_10,
                ]}>
                <View
                  style={[
                    styles.con_col_info,
                    Configs.supportRTL && cStyles.column_align_end,
                  ]}>
                  <CImage
                    style={styles.img_icon_coupon}
                    source={Assets.icon_coupon}
                    resizeMode={'contain'}
                  />

                  {data.discount_type === Configs.discountType[2].id && (
                    <CText
                      style={[
                        styles.txt_row_right_bottom,
                        { fontSize: cStyles.txt_base_item.fontSize * 1.5 },
                      ]}>
                      {amount + slugDiscountType.slug}
                    </CText>
                  )}

                  {data.discount_type !== Configs.discountType[2].id && (
                    <CText
                      style={[
                        styles.txt_row_right_bottom,
                        { fontSize: cStyles.txt_base_item.fontSize * 1.5 },
                      ]}>
                      {(Configs.currencyPosition === Currency.left
                        ? symbol
                        : '') +
                        amount +
                        (Configs.currencyPosition === Currency.right
                          ? symbol
                          : '')}
                    </CText>
                  )}
                </View>

                <View
                  style={[
                    styles.con_col_info,
                    Configs.supportRTL && cStyles.column_align_end,
                  ]}>
                  <CText
                    style={styles.txt_row_right_top}
                    i18nKey={'date_expired'}
                  />
                  <CText
                    style={[styles.txt_row_right_bottom, { fontWeight: '800' }]}>
                    {dateExpires}
                  </CText>
                </View>
              </View>
            }
          </CImage>
        </View>
        <CText style={styles.txt_item_coupon_content} numberOfLines={2}>
          {data.description}
        </CText>
      </View>
    </TouchableOpacity>
  );
};

const renderHeaderList = (slug, onPress) => {
  return (
    <CViewRow
      style={styles.con_header_group}
      leftComp={
        <View style={styles.con_title_category}>
          <CText style={styles.txt_coupon_title} i18nKey={slug} />
        </View>
      }
      rightComp={
        onPress ? (
          <TouchableOpacity onPress={onPress}>
            <CText style={styles.txt_coupon_show_all} i18nKey={'show_all'} />
          </TouchableOpacity>
        ) : (
          <View />
        )
      }
    />
  );
};

const _onRenderEmpty = () => {
  return (
    <View style={[cStyles.full_center, cStyles.pv_20, { width: Devices.width }]}>
      <CText style={cStyles.txt_no_data} i18nKey={'no_data'} />
    </View>
  );
};

export const ViewHome = ({
  state = null,
  props = null,
  settings = {
    banners: null,
    order: [],
    logo: '',
    appName: '',
  },
  onFunction = {
    onPressCart: () => { },
    onPressCoupon: () => { },
    onPressStickyPost: () => { },
    onFocusSearch: () => { },
    onPressServiceItem: () => { },
    onPressCategory: () => { },
    onPressSeeAllCate: () => { },
    onPressSeeAllVendors: () => { },
    onPressSeeAllViewedProducts: () => { },
    onRefresh: () => { },
    onPressListCoupon: () => { },
    onOpenDrawer: () => { },
    onPressNewsItem: () => { },
    onToggleModalRating: () => { },
    onPressStartRating: () => { },
    onPressAddCart: () => { },
    onPressVendor: () => { }
  },
}) => {

  return (
    <Container>
      <CHeader
        props={props}
        titleComponent={
          <View style={[cStyles.row_justify_center, cStyles.flex_full]}>
            <View
              style={[
                cStyles.column_align_center,
                cStyles.column_justify_center,
                { width: '100%' },
              ]}>
              <CImage
                style={styles.img_header_logo}
                source={settings.logo}
                resizeMode={'contain'}
              />
            </View>
          </View>
        }
        iconLeft_1={'bars'}
        iconRight_1={'shopping-cart'}
        iconRight_2={'search'}
        onPressLeft_1={onFunction.onOpenDrawer}
        onPressRight_1={onFunction.onPressCart}
        onPressRight_2={onFunction.onFocusSearch}
      />

      <Content
        style={styles.con_content}
        refreshControl={
          <RefreshControl
            refreshing={state._refreshing}
            onRefresh={onFunction.onRefresh}
          />
        }>
        {!state._loading ?
          settings.order.map((item, index) => {
            /** SLIDER BANNER */
            if (item.acf_fc_layout === Keys.KEY_HOME_BANNERS) {
              return (
                <View
                  key={'home_' + Keys.KEY_HOME_BANNERS + moment().valueOf()}>
                  <CCarousel
                    data={item.data}
                    onPressItem={onFunction.onPressStickyPost}
                  />
                </View>
              );
            }

            // /** CATEGORIES */
            if (item.acf_fc_layout === Keys.KEY_HOME_CATEGORIES) {
              return (
                <View
                  key={'home_' + Keys.KEY_HOME_CATEGORIES + index.toString()}>
                  {renderHeaderList('categories', onFunction.onPressSeeAllCate)}
                  {item.thumb_style === Configs.customThumbCategory.SQUARE && (
                    <CardView
                      data={item.data}
                      onFunction={{
                        onPressItem: onFunction.onPressCategory,
                      }}
                      isCategory
                    />
                  )}

                  {item.thumb_style === Configs.customThumbCategory.CIRCLE && (
                    <Column
                      data={item.data}
                      onFunction={{
                        onPressItem: onFunction.onPressCategory,
                      }}
                      isCategory
                      numberOfColumns={2}
                    />
                  )}
                </View>
              );
            }

            /** VENDORS */
            if (item.acf_fc_layout === Keys.KEY_HOME_VENDORS && item.data.length > 0) {
              return (
                <View
                  key={'home_' + Keys.KEY_HOME_VENDORS + index.toString()}>
                  {renderHeaderList('vendors', onFunction.onPressSeeAllVendors)}
                  <CardView
                    data={item.data}
                    onFunction={{
                      onPressItem: onFunction.onPressVendor,
                    }}
                    isVendors
                  />
                </View>
              )
            }


            /** COUPONS */
            if (
              item.acf_fc_layout === Keys.KEY_HOME_COUPONS &&
              item.data &&
              item.data.length > 0
            ) {
              return (
                <View key={'home_' + Keys.KEY_HOME_COUPONS + index.toString()}>
                  {renderHeaderList(
                    'special_coupons',
                    onFunction.onPressListCoupon,
                  )}
                  <FlatList
                    data={item.data}
                    renderItem={(props) =>
                      renderCouponItem(
                        props.index,
                        props.item,
                        item.data.length,
                        onFunction.onPressCoupon,
                      )
                    }
                    inverted={Configs.supportRTL}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={_onRenderEmpty}
                  />
                </View>
              );
            }

            /** FEATURED POSTS */
            if (item.acf_fc_layout === Keys.KEY_HOME_FEATURED_POSTS) {
              return (
                <View
                  key={
                    'home_' + Keys.KEY_HOME_FEATURED_POSTS + index.toString()
                  }>
                  {renderHeaderList('featured_posts', null)}
                  <Horizontal
                    contentStyle={{
                      paddingHorizontal: Devices.pH(layoutWidth.width),
                    }}
                    data={item.data}
                    render={{}}
                    onFunction={{
                      onPressItem: onFunction.onPressNewsItem,
                    }}
                    isNews
                    leftThumb
                  />
                </View>
              );
            }

            /** LATEST POSTS */
            if (item.acf_fc_layout === Keys.KEY_HOME_LATEST_POSTS) {
              if (
                item.layout_style === Configs.customLayout.LEFT_THUMB ||
                item.layout_style === Configs.customLayout.RIGHT_THUMB
              ) {
                return (
                  <View
                    key={
                      'home_' +
                      Keys.KEY_HOME_LATEST_POSTS +
                      Configs.customLayout.LEFT_THUMB +
                      index.toString()
                    }>
                    {renderHeaderList('latest_posts', null)}
                    <Horizontal
                      contentStyle={{
                        paddingHorizontal: Devices.pH(layoutWidth.width),
                      }}
                      data={item.data}
                      onFunction={{
                        onPressItem: onFunction.onPressNewsItem,
                      }}
                      isNews
                      leftThumb={
                        item.layout_style === Configs.customLayout.LEFT_THUMB
                      }
                    />
                  </View>
                );
              }

              if (item.layout_style === Configs.customLayout.CARD_THUMB) {
                return (
                  <View
                    key={
                      'home_' +
                      Keys.KEY_HOME_LATEST_POSTS +
                      Configs.customLayout.CARD_THUMB +
                      index.toString()
                    }>
                    {renderHeaderList('latest_posts', null)}
                    <CardView
                      contentStyle={{
                        paddingHorizontal: Devices.pH(layoutWidth.width),
                      }}
                      data={item.data}
                      onFunction={{
                        onPressItem: onFunction.onPressNewsItem,
                      }}
                      isNews
                    />
                  </View>
                );
              }

              if (item.layout_style === Configs.customLayout.GRID_THUMB) {
                return (
                  <View
                    key={
                      'home_' +
                      Keys.KEY_HOME_LATEST_POSTS +
                      Configs.customLayout.GRID_THUMB +
                      index.toString()
                    }>
                    {renderHeaderList('latest_posts', null)}
                    <Column
                      data={item.data}
                      onFunction={{
                        onPressItem: onFunction.onPressNewsItem,
                      }}
                      isNews
                      numberOfColumns={2}
                    />
                  </View>
                );
              }
            }

            /** LATEST PRODUCTS */
            if (item.acf_fc_layout === Keys.KEY_HOME_LATEST_PRODUCT) {
              if (
                item.layout_style === Configs.customLayout.LEFT_THUMB ||
                item.layout_style === Configs.customLayout.RIGHT_THUMB
              ) {
                return (
                  <View
                    key={
                      'home_' +
                      Keys.KEY_HOME_LATEST_PRODUCT +
                      Configs.customLayout.LEFT_THUMB +
                      index.toString()
                    }>
                    {renderHeaderList('latest_services', null)}
                    <Horizontal
                      contentStyle={{
                        paddingHorizontal: Devices.pH(layoutWidth.width),
                      }}
                      data={item.data}
                      onFunction={{
                        onPressItem: onFunction.onPressServiceItem,
                        onPressAddCart: onFunction.onPressAddCart,
                      }}
                      isService
                      leftThumb={
                        item.layout_style === Configs.customLayout.LEFT_THUMB
                      }
                    />
                  </View>
                );
              }

              if (item.layout_style === Configs.customLayout.CARD_THUMB) {
                return (
                  <View
                    key={
                      'home_' +
                      Keys.KEY_HOME_LATEST_PRODUCT +
                      Configs.customLayout.CARD_THUMB +
                      index.toString()
                    }>
                    {renderHeaderList('latest_services', null)}
                    <CardView
                      contentStyle={{
                        paddingHorizontal: Devices.pH(layoutWidth.width),
                      }}
                      data={item.data}
                      onFunction={{
                        onPressItem: onFunction.onPressServiceItem,
                        onPressAddCart: onFunction.onPressAddCart,
                      }}
                      isService
                    />
                  </View>
                );
              }

              if (item.layout_style === Configs.customLayout.GRID_THUMB) {
                return (
                  <View
                    key={
                      'home_' +
                      Keys.KEY_HOME_LATEST_PRODUCT +
                      Configs.customLayout.GRID_THUMB +
                      index.toString()
                    }>
                    {renderHeaderList('latest_services', null)}
                    <Column
                      data={item.data}
                      onFunction={{
                        onPressItem: onFunction.onPressServiceItem,
                        onPressAddCart: onFunction.onPressAddCart,
                      }}
                      isService
                    />
                  </View>
                );
              }
            }

            /** FEATURED PRODUCTS */
            if (item.acf_fc_layout === Keys.KEY_HOME_FEATURED_PRODUCT) {
              return (
                <View
                  key={
                    'home_' + Keys.KEY_HOME_FEATURED_PRODUCT + index.toString()
                  }>
                  {renderHeaderList('featured_products', null)}
                  <Column
                    data={item.data}
                    onFunction={{
                      onPressItem: onFunction.onPressServiceItem,
                      onPressAddCart: onFunction.onPressAddCart,
                    }}
                    isService
                  />
                </View>
              );
            }

            /** VIEWED PRODUCTS */
            if (item.acf_fc_layout === Keys.KEY_HOME_VIEWED_PRODUCT) {
              return (
                <View
                  key={
                    'home_' + Keys.KEY_HOME_VIEWED_PRODUCT + index.toString()
                  }>
                  {renderHeaderList(
                    'viewed_products',
                    onFunction.onPressSeeAllViewedProducts,
                  )}
                  <Column
                    data={item.data}
                    onFunction={{
                      onPressItem: onFunction.onPressServiceItem,
                      onPressAddCart: onFunction.onPressAddCart,
                    }}
                    isService
                  />
                </View>
              );
            }
          })
        :
        <CLoadingPlaceholder />
        }
      </Content>

      <CRate
        visible={state._rating}
        onRequestClose={onFunction.onToggleModalRating}
        appName={settings.appName}
        onOK={onFunction.onPressStartRating}
      />

      {/* <CLoading visible={state._loading} /> */}
    </Container>
  );
};
